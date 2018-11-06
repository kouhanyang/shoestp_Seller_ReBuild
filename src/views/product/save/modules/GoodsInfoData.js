/**
 * Created by IntelliJ IDEA.
 * User: lijie@shoestp.cn
 * Date: 2018/11/1
 * Time: 10:51
 **/
export default function() {
  return {
    status: {
      id: -1,
      pdtName: {},
      productCat: null,
      supplierCat: null,
      number_left: 'TOP',
      number_right: null,
      sku: null,
      attr: [],
      pdtPics: {},
      specSize: [],
      specColor: [],
      spec: [],
      price: null,
      min_oq: null,
      max_oq: null,
      warnStock: null,
      state: true,
      soldInStatus: false,
      soldInTime: null,
      weight: null,
      height: null,
      width: null,
      length: null,
      briefDescription: null,
      freeShipping: null,
      from: -1,
      mktPrice: null,
      purPrice: null,
      description: {}
    },
    temp: {
      specColor: [],
      specSize: [],
      filelist: [],
      specList: {},
      productCat: null,
      supplierCat: null,
      message: {},
      activeTabName: '',
      attr: {}
    }, attr: [],
    genrateNumberFirst: false,
    color: [],
    size: [],
    supplierCat: [],
    productCats: [],
    message: [],

    // 新增
    errorMessages: {}
  }
}
