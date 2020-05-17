<template>
  <div class="container-article">
    <!-- 筛选区域 -->
    <el-card>
      <!-- 面包屑 -->
      <div slot="header">
        <!-- 自己的面包屑组件 -->
        <my-bread>内容管理</my-bread>
      </div>
      <!-- 表单 -->
      <el-form label-width="80px" size="small">
        <el-form-item label="状态: ">
          <el-radio-group v-model="filterData.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道: ">
          <el-select
            @change="changeChannel"
            v-model="filterData.channel_id"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期: ">
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            @change="changeDate"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 筛选结果 -->
    <el-card style="margin-top:20px">
      <div slot="header">根据筛选条件共查询到 {{total}} 条结果:</div>
      <el-table :data="articles">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]" style="width:150px;height:100px">
              <div slot="error" class="image-slot">
                <img src="../../assets/error.gif" style="width:150px;height:100px" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status === 1">待审核</el-tag>
            <el-tag v-if="scope.row.status === 2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status === 3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status === 4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-button
              @click="toEditArticle(scope.row.id)"
              plain
              type="primary"
              icon="el-icon-edit"
              circle
            ></el-button>
            <el-button @click="delArtiles(scope.row.id)" type="danger" icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="filterData.page"
        :page-size="filterData.per_page"
        @current-change="pager"
        style="margin-top:20px"
        background
        layout="prev, pager, next"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'app-article',
  data () {
    return {
      // 表格数据
      articles: [],
      total: 0,
      // 声明筛选条件的数据,筛选的数据交给后台,数据的字段名称,由后台来决定的
      // 筛选数据由多个表单元素组成,需要手机所有数据,用该使用对象来进行绑定
      filterData: {
        // 当字段的值null,axios请求不会提交
        status: null,
        channel_id: null, // 频道数据
        begin_pubdate: null, // 起始时间
        end_pubdate: null, // 截止时间
        page: 1, // 当前页
        per_page: 20 // 每页的条数
      },
      // 频道下拉选项数据
      channelOptions: [],
      // 日期范围数据[起始日期,结束日期]
      // 但是选择完成日期后,可以根据这数据给begin_pubdate和end_pubdate进行赋值
      dateArr: []
    }
  },
  created () {
    // 获取频道数据
    this.getChannelOption()
    // 获取文章数据
    this.getArticles()
  },
  methods: {
    // 删除文章
    delArtiles (id) {
      this.$confirm('亲,确认要删除此篇文章吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // console.log('删除成功')
          try {
            // 理想情况
            await this.$http.delete(`/articles/${id}`)
            this.$message.success('恭喜:你把我丢了')
            this.getArticles()
          } catch (e) {
            this.$message.error('呦呵,你没把我丢掉')
          }
        })
        .catch(() => {})
    },
    // 跳转编辑
    toEditArticle (id) {
      console.log(id)
      this.$router.push(`/pubilsh?id=${id}`)
    },
    // 频道改变后
    changeChannel () {
      if (this.filterData.channel_id === '') {
        this.filterData.channel_id = null
      }
    },
    // 筛选
    search () {
      this.filterData.page = 1
      this.getArticles()
    },
    // 改变日期范围
    changeDate (dateArr) {
      // console.log(dateArr)
      if (dateArr) {
        this.filterData.begin_pubdate = dateArr[0]
        this.filterData.end_pubdate = dateArr[1]
      } else {
        this.filterData.begin_pubdate = null
        this.filterData.end_pubdate = null
      }
    },
    // 分页切换
    pager (newPage) {
      // console.log(newPage)
      this.filterData.page = newPage
      this.getArticles()
    },
    // 获取频道列表
    async getChannelOption () {
      const res = await this.$http.get('channels')
      // console.log(res)
      this.channelOptions = res.data.data.channels
    },
    // 获取文章数据
    async getArticles () {
      const res = await this.$http.get('articles', { params: this.filterData })
      // console.log(res)
      this.articles = res.data.data.results
      this.total = res.data.data.total_count
    }
  }
}
</script>

<style lang="less" scoped>
</style>
