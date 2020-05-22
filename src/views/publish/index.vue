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
          <quill-editor v-model="articleForm.content" :options="editorOptions"></quill-editor>
        </el-form-item>
        <el-form-item label="封面: ">
          封面组件
        </el-form-item>
        <el-form-item label="频道: ">
          <my-channel v-model="articleForm.channel_id"></my-channel>
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
// 富文本需要的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 挂载富文本
import { quillEditor } from 'vue-quill-editor'
export default {
  components: { quillEditor },
  name: 'app-publish',
  data () {
    return {
      // 文章数据
      articleForm: {
        title: null, // 标题
        channel_id: null, // 文章所属频道id
        content: null // 文章内容
      },
      // 富文本配置对象
      editorOptions: {
        // 不需要占位符
        placeholder: '',
        // 富文本配置
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }, 'image']
          ]
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
