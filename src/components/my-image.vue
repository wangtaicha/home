<template>
  <div class="my-image">
    <!-- 图片按钮 -->
    <div class="img_btn" @click="openDialog()">
      <img :src="value || imageBtnUrl" alt />
    </div>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="750px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="list">
          <div v-loading="loading">
            <!-- 按钮 -->
            <el-radio-group v-model="resParams.collect" size="small" @change="changeCollect()">
              <el-radio-button :label="false">全部</el-radio-button>
              <el-radio-button :label="true">收藏</el-radio-button>
            </el-radio-group>
            <!-- 列表 -->
            <div class="img-list">
              <div
                @click="selectedImage(item.url)"
                :class="{selected:selectedImageUrl === item.url}"
                class="img-item"
                v-for="item in images"
                :key="item.id"
              >
                <img :src="item.url" alt />
              </div>
            </div>
            <!-- 分页 -->
            <el-pagination
              background
              layout="prev, pager, next"
              @current-change="pager"
              :current-page="resParams.page"
              :page-size="resParams.per_page"
              hide-on-single-page
              :total="total"
            ></el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <el-upload
                class="avatar-uploader"
                action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
                name="image"
                :headers="uploadHeaders"
                :show-file-list="false"
                :on-success="uploadSuccess">
                <img v-if="upLoadImageUrl" :src="upLoadImageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import auth from '@/utils/auth'
// 主动导入,打包这张图片到服务器,defaultImage就是图片数据
import defaultImage from '@/assets/default.png'
export default {
  name: 'my-image',
  props: ['value'],
  data () {
    return {
      // 素材列表
      images: [],
      loading: false, // 加载中
      total: 0, // 素材总条数
      dialogVisible: false, // 对话框显示隐藏
      activeName: 'list', // 激活tab的名称
      selectedImageUrl: null, // 选中图片的地址
      uploadHeaders: { // 请求头配置
        Authorization: `Bearer ${auth.getUser().token}`
      },
      imageBtnUrl: defaultImage, // btn按钮的图片地址
      upLoadImageUrl: null, // 选择的图片默认为空
      // 获取素材列表参数对象
      resParams: {
        collect: false,
        page: 1,
        per_page: 8
      }
    }
  },
  methods: {
    // 确认图片
    confirmImage () {
      if (this.activeName === 'list') {
        if (!this.selectedImageUrl) return this.$message.warning('请选择一张图片')
        // 不是给imageBtnUrl了
        // this.imageBtnUrl = this.selectedImageUrl
        // 提交给父组件
        this.$emit('input', this.selectedImageUrl)
      } else {
        if (!this.upLoadImageUrl) return this.$message.warning('请选择一张图片')
        // this.imageBtnUrl = this.upLoadImageUrl
        // 提交给父组件
        this.$emit('input', this.upLoadImageUrl)
      }
      this.dialogVisible = false
    },
    // 上传图片
    uploadSuccess (res) {
      // 上传成功
      this.$message.success('恭喜小可爱,上传成功')
      // console.log(res.data.url)
      this.upLoadImageUrl = res.data.url
    },
    // 获取图片地址
    selectedImage (url) {
      // 点击的图片地址赋值给选中图片的地址
      this.selectedImageUrl = url
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
    // 打开对话框
    openDialog () {
      this.dialogVisible = true
      // 要在点开对话框的时候获取素材
      this.getImages()
      // 默认激活第一个选项卡
      this.activeName = 'list'
      // 清除选中默认图片
      this.selectedImageUrl = ''
      // 清除上传图片的地址
      this.upLoadImageUrl = ''
    },
    // 获取素材列表
    async getImages () {
      // 加载中
      this.loading = true
      const res = await this.$http.get('user/images', {
        params: this.resParams
      })
      // 加载完成
      this.loading = false
      this.images = res.data.data.results
      this.total = res.data.data.total_count
      // console.log(this.total)
    }
  }
}
</script>

<style lang="less" scoped>
// 素材列表
.img-list {
  padding-top: 20px;
  .img-item {
    width: 150px;
    height: 150px;
    border: 1px dashed #ddd;
    display: inline-block;
    margin-right: 20px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
      &.selected::after {
        // .img-item 的后伪元素
        // &符号 less语法，连接符，连接 上一级选择和当前的选择器。
        // 此时不加&：.img-item ::after{}  解析后：后代选择器
        // 加上&符后：.img-item::after{}   解析后：交集选择器
        // .img-item.selected::after{} 满足这个选择器样式生效
        // 当你想选中效果：给.img-item加上selected类即可。
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3) url(../assets/selected.png) no-repeat
          center/ 50px auto;
      }
  }
}
//封面组件
.my-image {
  display: inline-block;
  margin-right: 20px;
}
.img_btn {
  width: 150px;
  height: 150px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
</style>
