export default {
  'createSpec': function(n, o) {
    var self = this
    var specs = self.status.spec
    var color = self.temp.specColor
    var size = self.temp.specSize
    var newspec = []
    if (n.length > 0) {
      for (var i = 0; i < color.length; i++) {
        for (var j = 0; j < size.length; j++) {
          var key = size[j].name + '-' + color[i].name
          newspec.push({
            id: -1,
            name: key,
            sku: null,
            pic: {},
            price: null,
            stock: null,
            weight: null,
            color: color[i].id,
            size: size[j].id
          })
        }
      }
      for (var i = 0; i < newspec.length; i++) {
        for (var j = 0; j < specs.length; j++) {
          if (newspec[i].size === specs[j].size && specs[j].color === newspec[i].color) {
            newspec[i] = specs[j]
          }
        }
      }
      self.$set(self.$data.status, 'spec', newspec)
      self.$set(self.$data.status, 'specColor', [])
      self.$set(self.$data.status, 'specSize', [])
      for (var key in color) {
        self.$data.status.specColor.push(color[key].id)
      }
      for (var key in size) {
        if (size[key] && size[key].id) {
          if (size[key] !== 'null') {
            self.status.specSize.push(size[key].id)
          }
        }
      }
    }
  },
  'temp.productCat': function(n, o) {
    if (this.temp.productCat) {
      this.status.productCat = this.temp.productCat[this.temp.productCat.length - 1]
    }
  }, 'temp.supplierCat': function(n, o) {
    if (this.temp.supplierCat) {
      this.status.supplierCat = this.temp.supplierCat[this.temp.supplierCat.length - 1]
    }
  }
}
