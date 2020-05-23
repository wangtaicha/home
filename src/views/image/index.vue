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
        <el-button @click="openDialog()" type="success" style="float:right" size="small">添加素材</el-button>
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
    <!-- 对话框 -->
      <el-dialog
      title="添加素材"
      :visible.sync="dialogVisible"
      width="300px">
        <el-upload
          class="avatar-uploader"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
          name="image"
          :headers="uploadHeaders"
          :show-file-list="false"
          :on-success="uploadSuccess">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import auth from '@/utils/auth'
export default {
  name: 'app-image',
  data () {
    return {
      // 控制对话框
      dialogVisible: false,
      // 查询条件
      resParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      // 素材列表
      images: [],
      // 总条数
      total: 0,
      // 预览图片地址
      imageUrl: '',
      // 上传携带的请求头
      uploadHeaders: {
        Authorization: `Bearer ${auth.getUser().token}`
      }
    }
  },
  created () {
    // 获取素材列表
    this.getImages()
  },
  methods: {
    // 上传成功
    uploadSuccess (res) {
      // 提示+预览
      this.$message.success('上传成功')
      // console.log(res)
      this.imageUrl = res.data.url
      // 关闭对话框 + 更新当前列表
      window.setTimeout(() => {
        this.dialogVisible = false
        this.getImages()
      }, 3000)
    },
    // 打开对话框
    openDialog () {
      // 1. 准备一个对话框
      // 2. 再来打开对话框
      this.dialogVisible = true
    },
    // 删除图片功能
    delImage (id) {
      this.$confirm('亲,确认要删除此素材吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
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
    pager (newPage) {
      this.resParams.page = newPage
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
// 样式列表
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
