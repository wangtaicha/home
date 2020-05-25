<template>
  <div class="container-fans">
    <el-card>
      <div slot="header">
        <my-bread>粉丝管理</my-bread>
      </div>
      <!-- tab组件 -->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="粉丝列表" name="list">
          <div class="fans-list">
            <div class="fans-item" v-for="item in fansItem" :key="item.id.toString()">
              <el-avatar
                :size="80"
                :src="photo"
              ></el-avatar>
              <p>{{item.name}}</p>
              <el-button type="primary" plain size="small">+关注</el-button>
            </div>
          </div>
          <!-- 分页 -->
          <el-pagination
          background
          @current-change = "paper"
          :current-page = "resParams.page"
          :page-size = "resParams.per_page"
          layout="prev, pager, next"
          :total="total"></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="pictrue">
            <div ref="dom" style="width:700px;height:400px;"></div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
// 导入echarts
import echarts from 'echarts'
export default {
  name: 'app-fans',
  data () {
    return {
      // tabs当前选项
      activeName: 'list',
      // 粉丝列表
      fansItem: [],
      // 参数
      resParams: {
        page: 1,
        per_page: 24
      },
      // 总条数
      total: 0
    }
  },
  mounted () {
    const myEcharts = echarts.init(this.$refs.dom)
    const option = {
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '直接访问',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    }
    myEcharts.setOption(option)
  },
  created () {
    // 粉丝列表
    this.getFansList()
  },
  methods: {
    // 分页
    paper (newPage) {
      this.resParams.page = newPage
      this.getFansList()
    },
    // 获取粉丝列表
    async getFansList () {
      const res = await this.$http.get('followers', { params: this.resParams })
      //   console.log(res)
      this.fansItem = res.data.data.results
      this.total = res.data.datatotal_count
    }
  }
}
</script>

<style lang="less" scoped>
.fans-list {
  .fans-item {
    margin-top: 10px;
    display: inline-block;
    width: 100px;
    height: 170px;
    border: 1px dashed #ddd;
    text-align: center;
    margin-bottom: 20px;
    margin-right: 20px;
    p {
      padding: 0;
      font-size: 12px;
    }
  }
}
</style>
