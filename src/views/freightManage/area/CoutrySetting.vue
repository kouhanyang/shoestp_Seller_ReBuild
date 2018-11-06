<template>
  <div class="coutry">
    <el-transfer
      :data="data"
      v-model="status.coutry"
      :titles="['选择国家','已添加国家']"
      :filter-method="filterMethod"
      filterable
      @change="changeCoutry"/>
  </div>
</template>
<script>
import request from '@/utils/request'

export default {
  name: 'CoutrySetting',
  props: {
    id: {
      type: Number,
      default: -1
    }, jstype: {
      type: String,
      default: 'No Data'
    }
  },
  data() {
    return {
      data: [],
      status: {
        coutry: []
      },
      filter: [],
      temp: {
        coutry: {}
      }
    }
  }, computed: {}, watch: {
    'id': function(n, o) {
      if (n > 0) {
        this.load()
      }
    }
  }, mounted() {
    this.load()
  }, methods: {
    changeCoutry: function(value, direction, movedKeys) {
      const self = this
      if (direction === 'left') {
        const data = []
        for (const key in movedKeys) {
          data.push(self.temp.coutry[movedKeys[key]])
        }
        request({
          url: '/seller/plt_PltCountryFreight_del',
          method: 'post',
          data: {
            pkeys: movedKeys.join(','),
            section: self.id
          }
        }).then(value => {
          // data.forEach(function(v, i) {
          //   self.status.coutry.splice(self.status.coutry.indexOf(v), 1)
          // })
          // self.load()
          self.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      } else {
        request({
          url: '/seller/plt_PltCountryFreight_ins',
          method: 'post',
          data: {
            section: self.id,
            pkeys: movedKeys.join(',')
          }
        }).then(value => {
          // self.load()
          self.$message({
            type: 'success',
            message: '添加成功!'
          })
        })
      }
    }, filterMethod: function(query, item) {
      return item.label.indexOf(query) > -1
    },
    load: function() {
      const self = this
      const countrys = []
      // 先获取所有已设置的
      request({
        url: '/seller/plt_PltCountryFreight_list',
        method: 'post',
        data: {
          filter: JSON.stringify([{ 'property': 'region', 'value': self.id }])
        }
      }).then(customValue => {
        if (customValue.data.items.length > 0) {
          customValue.data.items.forEach((v, i) => {
            countrys.push(Number(v.country.split('##')[0]))
          })
        }
        self.$set(self.status, 'coutry', countrys)
        const allcountry = []
        request({
          url: '/seller/plt_PltCountry_list',
          method: 'get'
        }).then(allValue => {
          allValue.data.items.forEach((v, i) => {
            allcountry.push({
              key: v.id,
              label: v.name
            })
          })
        })
        self.data = allcountry
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
