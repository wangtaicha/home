<template>
    <div class='container-publish'>
      <el-card>
        <!-- 头部 面包屑 -->
        <div slot="header">
            <my-bread>发布文章</my-bread>
        </div>
             <!-- 表单 -->
      <el-form label-width="120px">
        <el-form-item label="标题: ">
          <el-input v-model="articleForm.title" style="width:400px" placeholder="请输入文章标题"></el-input>
        </el-form-item>
        <el-form-item label="内容: ">
          富文本
        </el-form-item>
        <el-form-item label="封面: ">
          封面组件
        </el-form-item>
        <el-form-item label="频道: ">
          频道组件
        </el-form-item>
        <el-form-item>
          <el-button type="primary">发布文章</el-button>
          <el-button type="info">存入草稿</el-button>
        </el-form-item>
      </el-form>
      </el-card>
    </div>
</template>

<script>
export default {
  name: 'app-publish',
  data () {
    return {
      // 文章数据
      articleForm: {
        title: null
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
