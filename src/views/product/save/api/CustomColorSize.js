import request from '@/utils/request'

export const delColor = function(id) {
  const self = this
  self.$confirm('此操作将删除此颜色, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    request({
      url: '/seller/pdt_PdtColor_delColorBySup',
      method: 'post',
      data: {
        'pkey': id
      }
    }).then(res => {
      if (res.data.success == false) {
        self.$message({
          type: 'error',
          message: res.data.msg == undefined ? '未知错误' : res.data.msg
        })
        return
      }
      var color = self.color
      for (var i in color) {
        if (color[i].id == res.data.items) {
          self.color.splice(i, 1)
          break
        }
      }
      self.$message({
        type: 'success',
        message: '删除成功!'
      })
    }).catch(reason => {
      self.$message({
        type: 'info',
        message: '发生错误' + reason
      })
    })
  }).catch(() => {
    self.$message({
      type: 'info',
      message: '已取消删除'
    })
  })
}

export const editColor = function(color) {
  const self = this
  if (self.editColorData == '') {
    self.$message({
      type: 'error',
      message: '请输入名称!'
    })
    return
  }
  self.loading = true
  self.loadingTitle = '提交中,请等待翻译结束'
  request({
    url: '/seller/pdt_PdtColor_updColorBySup',
    method: 'post',
    params: {
      'bean.pkey': color.id, 'bean.name': self.editColorData, 'bean.rowVersion': color.rowVersion
    }
  }).then(res => {
    if (res.data.success == false) {
      self.loading = false
      self.$message({
        type: 'error',
        message: res.data.msg == undefined ? '未知错误' : res.data.msg
      })
      return
    }
    var color = self.color
    for (var i in color) {
      if (color[i].id == res.data.pkey) {
        self.color.splice(i, 1)
        break
      }
    }
    self.color.push({
      id: res.data.pkey,
      name: res.data.name,
      createBy: res.data.createBy,
      rowVersion: res.data.rowVersion
    })
    self.$message({
      type: 'success',
      message: '修改成功!'
    })
    self.loading = false
    self.editColorData = ''
  }).catch(reason => {
    self.loading = false
    console.log(reason)
  })
}

export const toAddNewColor = function() {
  const self = this
  if (this.newColor == '' && this.addNewColor == false) {
    // 当点击添加颜色按钮且输入框未激活未输入时
    this.addNewColor = true
    //
  } else if (this.newColor == '' && this.addNewColor == true) {
    // 	当点击添加颜色按钮且输入框激活未输入时
    this.addNewColor = false
  } else if (this.newColor != '') {
    // 当输入框输入后
    self.loading = true
    self.loadingTitle = '提交中,请等待翻译结束'
    request({
      url: '/seller/pdt_PdtColor_insColorBySup',
      method: 'post',
      data: {
        'bean.name': self.newColor
      }
    }).then(res => {
      if (res.data.success == false) {
        self.loading = false
        self.$message({
          type: 'error',
          message: res.data.msg == undefined ? '未知错误' : res.data.msg
        })
        return
      }
      self.color.push({
        id: res.data.pkey,
        name: res.data.name,
        createBy: res.data.create_by,
        rowVersion: res.data.rowVersion
      })
      self.newColor = ''
      self.addNewColor = false
      self.loading = false
    }).catch(reason => {
      console.log(reason)
      self.loading = false
    })
  }
}

export const editSize = function(size) {
  const self = this
  if (self.editSizeData == '') {
    self.$message({
      type: 'error',
      message: '请输入名称!'
    })
    return
  }
  self.loading = true
  self.loadingTitle = '提交中,请等待翻译结束'
  request({
    url: '/seller/pdt_PdtSize_updSizeBySup',
    method: 'post',
    data: {
      'bean.pkey': size.id, 'bean.name': self.editSizeData, 'bean.rowVersion': size.rowVersion
    }
  }).then(res => {
    if (res.data.success == false) {
      self.loading = false
      self.$message({
        type: 'error',
        message: res.data.msg == undefined ? '未知错误' : res.data.msg
      })

      return
    }
    var size = self.size
    for (var i in size) {
      if (size[i].id == res.data.pkey) {
        self.size.splice(i, 1)
        break
      }
    }
    self.size.push({
      id: res.data.pkey,
      name: res.data.name,
      createBy: res.data.createBy,
      rowVersion: res.data.rowVersion
    })
    self.$alert('修改成功', '消息', {
      confirmButtonText: '确定'
    })
    self.editSizeData = ''
    self.loading = false
  }).catch(err => {
    self.loading = false
    console.log(err)
  })
}

export const delSize = function(id) {
  var self = this
  this.$confirm('此操作将删除此尺寸, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    request({
      url: '/seller/pdt_PdtSize_delSizeBySup',
      method: 'post',
      data: { 'pkey': id }
    }).then(res => {
      if (res.data.success == false) {
        self.$message({
          type: 'error',
          message: res.data.msg == undefined ? '未知错误' : res.data.msg
        })

        return
      }
      var size = self.size
      for (var i in size) {
        if (size[i].id == res.data.items) {
          self.size.splice(i, 1)
          break
        }
      }
      self.$message({
        type: 'success',
        message: '删除成功!'
      })
    })
  }).catch(() => {
    this.$message({
      type: 'info',
      message: '已取消删除'
    })
  })
}

export const toAddNewSize = function() {
  var self = this
  if (this.newSize == '' && this.addNewSize == false) {
    // 当点击添加颜色按钮且输入框未激活未输入时
    this.addNewSize = true
  } else if (this.newSize == '' && this.addNewSize == true) {
    // 当点击添加颜色按钮且输入框激活未输入时
    this.addNewSize = false
  } else if (this.newSize != '') {
    // 当输入框输入后
    self.loading = true
    self.loadingTitle = '提交中,请等待翻译结束'
    request({
      url: '/seller/pdt_PdtSize_insSizeBySup',
      method: 'post',
      data: {
        'bean.name': self.newSize
      }
    }).then(res => {
      if (res.data.success == false) {
        self.loading = false
        self.$message({
          type: 'error',
          message: res.data.msg == undefined ? '未知错误' : res.data.msg
        })

        return
      }
      self.size.push({
        id: res.data.pkey,
        name: res.data.name,
        createBy: res.data.create_by,
        rowVersion: res.data.rowVersion
      })
      self.newSize = ''
      self.addNewSize = false
      self.loading = false
    }).catch(reason => {
      console.log(reason)
      self.loading = false
    })
  }
}

export const isCustom = (dd) => {
  if (dd.createBy) return true
  return false
}
