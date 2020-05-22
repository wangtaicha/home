<template>
  <div class="my-image">
    <!-- 图片按钮 -->
    <div class="img_btn" @click="openDoalog()">
      <img src="../assets/default.png" alt />
    </div>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="750px">
        <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="素材库" name="list">素材库</el-tab-pane>
            <el-tab-pane label="上传图片" name="upload">上传图片</el-tab-pane>
        </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'my-image',
  data () {
    return {
      dialogVisible: false, // 对话框显示隐藏
      activeName: 'list'
    }
  },
  methods: {
    openDoalog () {
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
.my-image {
  display: inline-block;
  margin-left: 20px;
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
