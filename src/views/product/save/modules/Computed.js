import store from '@/store'
export default {
  createSpec: function() {
    return this.temp.specSize + this.temp.specColor
  }, _AllStock: function() {
    let temp = 0
    for (const value of this.status.spec) {
      if (value.stock) { temp += parseInt(value.stock) }
    }
    return temp
  }, _filelist: function() {
    var filelist = []
    for (var key in this.status.pdtPics) {
      filelist.push({
        name: this.status.pdtPics[key],
        url: store.getters.ImageBaseUrl + this.status.pdtPics[key]
      })
    }
    return filelist
  }
}
