<template>
  <div class="container-image">
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <!-- 按钮 -->
      <div class="btn-box">
        <el-radio-group v-model="resParams.collect" size="small" @change="changeCollect()">
          <!-- collect 值为true收藏 false全部的图片 -->
          <!-- :label 加上冒号指定的值才是布尔类型 -->
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button type="success" style="float:right" size="small">添加素材</el-button>
      </div>
      <!-- 列表 -->
      <div class="img-list">
        <div class="img-item" v-for="item in images" :key="item.id">
          <img :src="item.url" alt />
          <div class="option" v-if="!resParams.collect">
            <span class="el-icon-star-off" :class="{red:item.is_collected}"></span>
            <span class="el-icon-delete" @click="delImage(item.id)"></span>
          </div>
        </div>
      </div>
      <!-- 分页 -->
      <el-pagination
        style="margin-top:20px"
        background
        layout="prev, pager, next"
        :current-page="resParams.page"
        :page-size="resParams.per_page"
        @current-change="pager"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'app-image',
  data () {
    return {
      // 查询条件
      resParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      // 素材列表
      images: [],
      // 总条数
      total: 0
    }
  },
  created () {
    // 获取素材列表
    this.getImages()
  },
  methods: {
    // 删除图片功能
    delImage (id) {
      this.$confirm('亲,确认要删除此素材吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // console.log('删除成功')
          try {
            // 理想情况
            await this.$http.delete(`/user/images/${id}`)
            this.$message.success('恭喜:你成功把我丢掉了')
            this.getImages()
          } catch (e) {
            this.$message.error('呦呵,你没把我丢掉')
          }
        })
        .catch(() => {})
    },
    // 切换全部与收藏
    changeCollect () {
      this.resParams.page = 1
      this.getImages()
    },
    // 切换分页
    pager (newVal) {
      console.log(newVal)
      this.resParams.page = newVal
      this.getImages()
    },
    // 获取素材
    async getImages () {
      try {
        const res = await this.$http.get('user/images', { params: this.resParams })
        this.images = res.data.data.results
        this.total = res.data.data.total_count
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.img-list {
  .img-item {
    width: 180px;
    height: 180px;
    border: 1px solid #ddd;
    position: relative;
    margin-top: 20px;
    display: inline-block;
    margin-right: 30px;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .option {
      width: 100%;
      height: 30px;
      line-height: 30px;
      background: rgba(0, 0, 0, 0.3);
      position: absolute;
      left: 0;
      bottom: 0;
      text-align: center;
      span {
        color: #fff;
        margin: 0 30px;
      }
      .red {
        color: red;
      }
    }
  }
}
</style>
