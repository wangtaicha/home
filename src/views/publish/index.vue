<template>
  <div class="container-publish">
    <el-card>
      <!-- 头部 面包屑 -->
      <div slot="header">
        <my-bread>{{$route.query.id?'修改':'发布'}}文章</my-bread>
      </div>
      <!-- 表单 -->
      <el-form label-width="120px">
        <el-form-item label="标题: ">
          <el-input v-model="articleForm.title" style="width:400px" placeholder="请输入文章标题"></el-input>
        </el-form-item>
        <el-form-item label="内容: ">
          <!-- 富文本组件 -->
          <quill-editor v-model="articleForm.content" :options="editorOptions"></quill-editor>
        </el-form-item>
        <el-form-item label="封面: ">
          <!-- 单选按钮 -->
          <el-radio-group @change="articleForm.cover.images = []" v-model="articleForm.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!-- 组件位置 -->
          <div v-if="articleForm.cover.type === 1">
            <my-image v-model="articleForm.cover.images[0]"></my-image>
          </div>
          <div v-if="articleForm.cover.type === 3">
            <my-image :key="i" v-for="i in 3" v-model="articleForm.cover.images[i-1]"></my-image>
          </div>
        </el-form-item>
        <el-form-item label="频道: ">
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <el-form-item v-if="$route.query.id">
          <el-button type="success" @click="update">修改文章</el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button @click="submit(false)" type="primary">发布文章</el-button>
          <el-button @click="submit(true)" type="info">存入草稿</el-button>
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
        content: null, // 文章内容
        cover: {
          type: 1,
          images: []
        }
      },
      // 富文本配置对象
      editorOptions: {
        // 不需要占位符
        placeholder: '', // 默认不需要占位符,所以给个空''
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
  },
  watch: {
    // 监听地址栏id的变化
    '$route.query.id': function () {
      this.toggleFormInfo()
    }
  },
  created () {
    if (this.$route.query.id) {
      this.getArticleInfo()
    }
  },
  methods: {
    // 修改文章
    async update () {
      try {
        // 修改只有发布,没有草稿
        // 路径传参,需要id
        // 键值对传参 需要draft
        // 请求体传参 articleForm
        await this.$http.put(`articles/${this.articleForm.id}?draft=false`, this.articleForm)
        this.$message.success('修改成功')
        this.$router.push('/article')
      } catch (e) {
        this.$message.error('操作失败')
      }
    },
    // 切换表单内容
    toggleFormInfo () {
      if (this.$route.query.id) {
        // 修改
        this.getArticleInfo()
      } else {
        // 发布
        // 文章数据
        // this.articleForm = {} // 不能这样清空表单
        // 保证模板依赖的字段都有数据, 保证模板编译不出错
        this.articleForm = {
          title: null, // 标题
          channel_id: null, // 文章所属频道id
          content: null, // 文章内容
          cover: {
            type: 1,
            images: []
          }
        }
      }
    },
    // 获取文章信息
    async getArticleInfo () {
      const res = await this.$http.get(`articles/${this.$route.query.id}`)
      // console.log(res)
      this.articleForm = res.data.data
    },
    // 提交
    async submit (draft) {
      try {
        // 理想情况下
        await this.$http.post(`articles?draft=${draft}`, this.articleForm)
        // 提示信息
        this.$message.success(draft ? '发布文章失败' : '发布文章成功')
        // 跳转页面
        this.$router.push('/article')
      } catch (e) {
        // console.log(e)
        this.$message.error('操作失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
