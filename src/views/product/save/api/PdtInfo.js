/**
 * Created by IntelliJ IDEA.
 * User: lijie@shoestp.cn
 * Date: 2018/10/31
 * Time: 15:56
 **/
import request from '@/utils/request'
import store from '@/store'
import goodsInfoData from '../modules/GoodsInfoData'
import customcolorsizedata from '../modules/CustomColorSizeData'
import rules from '../utils/rules'

const getTreeDeepArr = function(key, treeData) {
  var arr = [] // 在递归时操作的数组
  var returnArr = [] // 存放结果的数组
  var depth = 0 // 定义全局层级
  // 定义递归函数
  function childrenEach(childrenData, depthN) {
    for (var j = 0; j < childrenData.length; j++) {
      depth = depthN // 将执行的层级赋值 到 全局层级

      arr[depthN] = (childrenData[j].value)

      if (childrenData[j].value === key) {
        // returnArr = arr; // 原写法不行, 因 此赋值存在指针关系
        returnArr = arr.slice(0, depthN + 1) // 将目前匹配的数组，截断并保存到结果数组，
        break
      } else {
        if (childrenData[j].children) {
          depth++
          childrenEach(childrenData[j].children, depth)
        }
      }
    }
    return returnArr
  }

  return childrenEach(treeData, depth)
}
const getTreeDeepArrs = function(key, treeData, id, chilren) {
  var arr = [] // 在递归时操作的数组
  var returnArr = [] // 存放结果的数组
  var depth = 0 // 定义全局层级
  // 定义递归函数
  function childrenEach(childrenData, depthN, id, chilren) {
    for (var j = 0; j < childrenData.length; j++) {
      depth = depthN // 将执行的层级赋值 到 全局层级
      arr[depthN] = (childrenData[j][id])
      if (childrenData[j][id] == key) {
        // returnArr = arr; // 原写法不行, 因 此赋值存在指针关系
        returnArr = arr.slice(0, depthN + 1) // 将目前匹配的数组，截断并保存到结果数组，
        break
      } else {
        if (childrenData[j][chilren]) {
          depth++
          childrenEach(childrenData[j][chilren], depth, id, chilren)
        }
      }
    }
    return returnArr
  }

  return childrenEach(treeData, depth, id, chilren)
}
export const load = function(id) {
  const self = this
  // 数据反填充
  if (self.$route.query.id) {
    let url
    if (self.$route.query.Copy && self.$route.query.Copy > 0) {
      url = '/seller/pdt_PdtProduct_copyProduct'
    } else {
      url = '/seller/pdt_PdtProduct_viewProduct'
    }
    request({
      url: url,
      params: { id: self.$route.query.id }
    }).then(ress => {
      request({
        url: '/seller/pdt_PdtSize_listAll',
        params: { productcategory: ress.data.result.productCat }
      }).then(res => {
        const size = []
        const tempsize = []
        const stastus_size = ress.data.result.specSize
        for (let i = 0; i < res.data.items.length; i++) {
          const t = res.data.items[i]
          const tt = { id: t.pkey, name: t.name, createBy: t.createBy, rowVersion: t.rowVersion }
          size.push(tt)
          for (var j = 0; j < stastus_size.length; j++) {
            if (t.pkey === stastus_size[j]) {
              tempsize.push(tt)
            }
          }
        }
        self.size = size
        self.temp.specSize = tempsize
        const tempcolor = []
        const stastus_color = ress.data.result.specColor
        const color = self.color
        for (let i = 0; i < stastus_color.length; i++) {
          for (const key in color) {
            if (color[key].id === stastus_color[i]) {
              tempcolor.push(color[key])
            }
          }
        }
        self.temp.specColor = tempcolor
        var pics = ress.data.result.pdtPics
        for (const key in pics) {
          self.temp.filelist.push({ name: pics[key], url: pics[key] })
        }
        self.temp.productCat = getTreeDeepArr(ress.data.result.productCat, self.productCats)
        self.temp.supplierCat = getTreeDeepArr(ress.data.result.supplierCat, self.supplierCat)

        const temp = {}
        for (const key in ress.data.result.attr) {
          temp[getTreeDeepArrs(ress.data.result.attr[key], self.attr, 'id', 'items')[0]] = ress.data.result.attr[key]
        }
        self.$set(self.temp, 'attr', temp)
        self.status = ress.data.result
        if (self.temp.activeTabName && self.temp.activeTabName.length > 0) {
          console.log(ress.data.result.description[self.language[self.temp.activeTabName].shortName])
          window.tinymce.get('description').setContent(ress.data.result.description[self.$data.language[self.temp.activeTabName].shortName])
        } else {
          window.tinymce.get('description').setContent(ress.data.result.description[self.language[0].shortName])
        }
      })
    }).catch(reason => {
      console.log('发生错误')
      console.log(reason)
    })
  }
  sessionStorage['save'] = JSON.stringify(this.$data)
}

export const selectPdtCat = function(id) {
  var self = this
  const data = { productcategory: id[id.length - 1] }
  request({
    url: '/seller/pdt_PdtSize_listAll',
    data
  }).then(res => {
    var size = []
    for (var i = 0; i < res.data.items.length; i++) {
      var t = res.data.items[i]
      size.push({ id: t.pkey, name: t.name, createBy: t.createBy, rowVersion: t.rowVersion })
    }
    self.size = size
  })
}

export const _specPicList = function(d) {
  var self = this
  for (var key in self.status.spec) {
    if (self.status.spec[key].color === d.id) {
      if (self.status.spec[key].pic) {
        var temp = []
        for (var key2 in self.status.spec[key].pic) {
          if (self.status.spec[key].pic[key2]) {
            if (self.status.spec[key].pic[key2].length > 0) {
              temp.push({
                name: self.status.spec[key].pic[key2],
                url: store.getters.ImageBaseUrl + self.status.spec[key].pic[key2]
              })
            }
          }
        }
        return temp
      }
    }
  }
}
export const tabChange = function(activeName, oldActiveName) {
  if (activeName != null && oldActiveName != null) {
    this.temp.activeTabName = activeName
    this.status.description[this.language[oldActiveName].shortName] = window.tinymce.get('description').getContent()
    if (this.status.description[this.language[activeName].shortName]) {
      window.tinymce.get('description').setContent(this.status.description[this.language[activeName].shortName])
    } else {
      window.tinymce.get('description').setContent('')
    }
  }
}
export const syncs = function(fld, d, type) {
  var self = this
  var spec = self.status.spec
  if (!d) {
    if (fld === 'sku') {
      for (var i = 1; i < spec.length; i++) {
        self.$set(spec[i], fld, spec[0][fld])
      }
    } else {
      this.validatorNumbers(null, spec[0][fld], function(value) {
        if (!value || value < 1) {
          for (var i = 1; i < spec.length; i++) {
            self.$set(spec[i], fld, spec[0][fld])
          }
        }
      })
    }
  } else {
    this.validatorNumbers(null, d[fld], function(value) {
      if (!value || value < 1) {
        for (var i = 0; i < spec.length; i++) {
          if (spec[i][type] === d[type]) {
            self.$set(spec[i], fld, d[fld])
          }
        }
      }
    })
  }
}
export const genrateNumber = function() {
  var self = this
  request({
    url: '/seller/pdt_PdtProduct_getSeqnumInt',
    method: 'post'
  }).then(res => {
    self.status.number_right = res.data.CODE
    self.genrateNumberFirst = true
  })
}
export const submitForm = function(formName) {
  var self = this
  if (self.temp.activeTabName && self.temp.activeTabName.length > -1) {
    self.status.description[self.language[self.temp.activeTabName].shortName] = window.tinymce.get('description').getContent()
  } else {
    self.status.description[self.language[0].shortName] = window.tinymce.get('description').getContent()
  }
  // 将临时的属性放入提交属性中
  const tempAttr = []
  for (const key in self.temp.attr) {
    tempAttr.push(self.temp.attr[key])
  }
  self.status.attr = tempAttr
  this.$refs[formName].validate((valid) => {
    if (valid) {
      self.loading = true
      const data = { 'data': JSON.stringify(self.status) }
      request({
        url: '/seller/pdt_PdtProduct_saveProduct',
        method: 'post',
        data
      }).then(res => {
        if (res.data.ret === 1) {
          self.$alert('添加成功', '消息', {
            confirmButtonText: '确定'
          })
          // self.load()
          self.$router.push(self.$route.fullPath)
        } else {
          self.$alert(res.data.msg, '消息', {
            confirmButtonText: '确定'
          })
        }
        self.loading = false
      }).catch(() => {
        self.loading = false
      })
    } else {
      this.$alert('请完善商品信息', '消息', {
        confirmButtonText: '确定'
      })
      return false
    }
  })
}
export const resetForm = function(formName) {
  var self = this
  var obj = JSON.parse(sessionStorage['save'])
  var text
  if (self.temp.activeTabName && self.temp.activeTabName.length > 0) {
    text = obj['status'].description[self.$data.language[self.temp.activeTabName].shortName]
  } else {
    text = obj['status'].description[self.$data.language[0].shortName]
  }
  if (text) {
    window.tinymce.get('description').setContent(text)
  } else {
    window.tinymce.get('description').setContent('')
  }
  self.$set(self, 'status', obj['status'])
  self.$set(self, 'temp', obj['temp'])
  self.$set(self, 'genrateNumberFirst', false)
}
export const handleRemove = function(file, d) {
  if (file.status === 'success') {
    if (d == null) {
      delete this.status.pdtPics[file.name]
    } else {
      for (var key in this.status.spec) {
        if (this.status.spec[key].color === d.id) {
          delete this.status.spec[key].pic[file.name]
        }
      }
    }
  }
}
export const handlesuccess = function(response, file, d) {
  if (response.result === null || typeof response.result === 'undefined') {
    this.$notify({
      title: '提示',
      message: '网络错误建议重新上传'
    })
    return
  }
  if (response.result.state === 'SUCCESS') {
    if (!d) {
      var pdtimg = this.status.pdtPics
      if (pdtimg == null) {
        pdtimg = {}
      }
      pdtimg[response.result.originalName] = response.result.url
      this.status.pdtPics = pdtimg
    } else {
      for (var key in this.status.spec) {
        if (this.status.spec[key].color === d.id) {
          this.status.spec[key].pic[response.result.originalName] = response.result.url
          break
        }
      }
    }
  }
}
