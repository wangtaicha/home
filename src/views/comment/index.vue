<template>
  <div class="container-comment">
    <el-card>
      <div slot="header">
        <my-bread>评论管理</my-bread>
      </div>
      <!-- 表格 -->
      <el-table :data="comments">
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
        <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
        <el-table-column label="评论状态">
          <template slot-scope="scope">
              {{scope.row.comment_status?'正常':'关闭'}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="toggleStatus(scope.row)" size="small" v-if="scope.row.comment_status" type="primary">打开</el-button>
            <el-button @click="toggleStatus(scope.row)" size="small" v-else type="danger">关闭</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
      style="margin-top:20px"
      background
      @current-change="pager"
      :current-page = "resParams.page"
      :page-size = "resParams.per_page"
      layout="prev, pager, next"
      :total="total"></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'app-comment',
  data () {
    return {
      // 参数对象
      resParams: {
        response_type: 'comment',
        page: 1,
        per_page: 20
      },
      // 评论列表(文章列表,此时用来维护评论功能)
      comments: [],
      // 总条数
      total: 0
    }
  },
  created () {
    // 获取评论列表
    this.getComments()
  },
  methods: {
    // 切换状态
    toggleStatus (row) {
      // 请求put comments/status
      // 键值对传参 ?article_id=xxx 文章ID
      // 请求体传参 allow_comment = 想修改的状态
      const test1 = '您是否要关闭评论功能。'
      const test2 = '您是否要打开评论功能。'
      this.$confirm(row.comment_status ? test1 : test2, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          // 发送请求 res.data.data.allow_comment代表修改后的状态
          const res = await this.$http.put(`comments/status?article_id = ${row.id}`, {
            allow_comment: !row.allow_comment
          })
          this.$message.success(res.data.data.allow_comment ? '打开成功' : '关闭失败')
          // 修改当前行的文章评论的状态
          row.allow_comment = res.data.data.allow_comment
        } catch (e) {
          this.$message.error('操作失败')
        }
      }).catch(() => {})
    },
    // 分页
    pager (newPage) {
      this.resParams.page = newPage
      this.getComments()
    },
    // 获取评论列表
    async getComments () {
      const res = await this.$http.get('articles', { params: this.resParams })
      // console.log(res)
      this.comments = res.data.data.results
      this.total = res.data.data.total_count
    }
  }
}
</script>

<style lang="less" scoped>
</style>
