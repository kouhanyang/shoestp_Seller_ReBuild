/**
 * Created by jiachenpan on 16/11/18.
 */
export function validatorNumbers(rule, value, callback) {
  if (value) {
    if (!/^\d+(?=\.{0,1}\d+$|$)/.test(value)) {
      callback('请输入有效数字')
      return
    }
    value = parseInt(value)
    if (value > 999999999) {
      callback('输入数字过长')
      return
    }
  }
  callback()
}

export function validatorNumber(rule, value, callback) {
  if (value != null && value.length > 0) {
    if (!/^[0-9]*$/gi.test(value)) {
      callback('请输入有效数字')
    }
    value = parseInt(value)
    if (value > 999999999) {
      callback('输入数字过长')
    }
  }
  callback()
}

export const validatePidSzie = function(file) {
  // 校验文件大小
  const self = this
  const isSize = new Promise(function(resolve, reject) {
    var _URL = window.URL || window.webkitURL
    var img = new Image()
    img.onload = function() {
      var valid = img.width / img.height === 1 && img.width % img.height === 0
      valid ? resolve() : reject()
    }
    img.src = _URL.createObjectURL(file)
  }).then(() => {
    return file
  }, () => {
    self.$notify({
      title: '提示',
      message: '上传图片宽高比列建议为 1:1'
    })
    return file
  })

  var isLt2M = file.size / 1024 / 1024 < 5
  /*eslint no-constant-condition: ["error", { "checkLoops": false }]*/
  do {
    if (file.type === 'image/jpeg') {
      break
    }
    if (file.type === 'image/png') {
      break
    }
    if (file.type === 'image/gif') {
      break
    }
    if (file.type === 'image/jpg') {
      break
    }
    self.$message.error('上传图片不是个图片文件')
    return false
  } while (false)
  if (!isLt2M) {
    self.$message.error('上传头像图片大小不能超过 5MB!')
  }
  return isLt2M && isSize
}

export function validatePdtName(rule, value, callback) {
  if (value == null) {
    callback('请输入产品名称')
  }
  if (value['en'] == null) {
    callback('请输入产品名称,英文必填')
    return
  }
  if (value['en'].length < 1) {
    callback('请输入产品名称,英文必填')
    return
  }
  callback()
}
export const validatorSpecPrice = function(rule, value, callback) {
  if (typeof value === 'undefined' || value === null) {
    callback()
    return
  } else {
    if (value.length < 1) {
      callback()
      return
    }
    if (value > 99999999) {
      callback('请输入数字,长度在1-8之间')
      return
    }
    const price = this.status.price
    if (price != null) {
      if (parseInt(price) <= value) {
        callback()
      } else {
        callback('规格价格必须大于等于商城价格')
      }
    } else {
      callback('请先输入商城价,在输入该价格')
    }
  }
}
export function validatePic(rule, value, callback) {
  if (value == null) {
    callback('请上传图片')
  }
  let length = 0
  for (const ever in value) {
    ever
    length++
  }
  if (length > 0) {
    callback()
    return
  }
  callback('请上传图片')
}
export const validateSpecPic = function(rule, value, callback) {
  var colorId = value.color
  var specItem = this.$data.status.spec
  var length = 0
  for (var i = 0; i < specItem.length; i++) {
    if (specItem[i].color === colorId) {
      if (specItem[i].pic != null) {
        for (const key in specItem[i].pic) {
          length++
          key
        }
      }
    }
  }
  if (length > 0) {
    callback()
  } else {
    var self = this
    for (let i = 0; i < this.temp.specColor.length; i++) {
      if (this.temp.specColor[i].id === colorId && this.temp.message[colorId] == null) {
        this.$notify({
          title: '提示',
          message: '产品规格 颜色:[' + this.temp.specColor[i].name + ']必须上传一张图片',
          duration: 0,
          onClose: function(vue) {
            delete self.$data.temp.message[colorId]
          }
        })
        this.temp.message[colorId] = colorId
      }
    }

    callback('请上传图片')
  }
}
