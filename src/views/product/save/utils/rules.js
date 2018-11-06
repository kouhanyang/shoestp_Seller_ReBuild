import { validatorNumbers } from './ValidateUtils'

/**
 * Created by IntelliJ IDEA.
 * User: lijie@shoestp.cn
 * Date: 2018/11/1
 * Time: 10:43
 **/

export default {
  productCat: [
    { required: true, message: '请选择分类', trigger: ['change', 'blur'] }
  ],
  supplierCat:
      [
        { required: true, message: '请选择分类', trigger: ['change', 'blur'] }
      ],
  price:
      [
        { required: true, message: '请输入商城价格', trigger: ['change', 'blur'] },
        {
          validator: validatorNumbers, trigger: ['blur', 'change']
        }
      ],
  mktPrice:
      [
        { required: true, message: '请输入市场价格', trigger: ['change', 'blur'] },
        {
          validator: validatorNumbers, trigger: ['blur', 'change']
        }
      ],
  purPrice:
      [
        { required: true, message: '请输入进货价价格', trigger: ['change', 'blur'] },
        {
          validator: validatorNumbers, trigger: ['blur', 'change']
        }
      ],
  min_oq:
      [
        { required: true, message: '请输入最小起购量', trigger: ['change', 'blur'] },
        {
          validator: validatorNumbers, trigger: ['blur', 'change']
        }
      ],
  max_oq:
      [
        { required: true, message: '请输入最大购买量', trigger: ['change', 'blur'] },
        {
          validator: validatorNumbers, trigger: ['blur', 'change']
        }
      ],
  warnStock:
      [
        { required: true, message: '请输入警告库存', trigger: ['change', 'blur'] },
        {
          validator: validatorNumbers, trigger: ['blur', 'change']
        }
      ],
  stock:
      [
        { required: true, message: '请输入长度', trigger: ['change', 'blur'] },

        { validator: validatorNumbers, trigger: ['blur', 'change'] }
      ],
  weight:
      [
        { validator: validatorNumbers, trigger: ['blur', 'change'] }
      ],
  height:
      [
        { validator: validatorNumbers, trigger: ['blur', 'change'] }
      ],
  length:
      [
        { validator: validatorNumbers, trigger: ['blur', 'change'] }
      ],
  width:
      [
        { validator: validatorNumbers, trigger: ['blur', 'change'] }
      ],
  sku:
      [
        { required: true, message: '请输入sku', trigger: ['blur'] },
        {
          min: 0,
          max: 15,
          message: '长度在1-15位之间',
          trigger: ['blur']
        }
      ]

}
