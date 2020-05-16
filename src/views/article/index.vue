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
          <el-select v-model="filterData.channel_id" placeholder="请选择">
            <el-option
              v-for="item in channelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期: ">
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 筛选结果 -->
    <el-card style="margin-top:20px">
      <div slot="header">根据筛选条件共查询到 0 条结果:</div>
      <el-table :data="articles">
        <el-table-column label="封面"></el-table-column>
        <el-table-column label="标题"></el-table-column>
        <el-table-column label="状态"></el-table-column>
        <el-table-column label="发布时间"></el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>
      <el-pagination style="margin-top:20px" background layout="prev, pager, next" :total="1000"></el-pagination>
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
      // 声明筛选条件的数据,筛选的数据交给后台,数据的字段名称,由后台来决定的
      // 筛选数据由多个表单元素组成,需要手机所有数据,用该使用对象来进行绑定
      filterData: {
        // 当字段的值null,axios请求不会提交
        status: null,
        channel_id: null, // 频道数据
        begin_pubdate: null, // 起始时间
        end_pubdate: null // 截止时间
      },
      // 频道下拉选项数据
      channelOptions: [
        { label: '前端', value: 1 },
        { label: '后端', value: 2 },
        { label: 'Java', value: 3 },
        { label: 'python', value: 4 }
      ],
      // 日期范围数据[起始日期,结束日期]
      // 但是选择完成日期后,可以根据这数据给begin_pubdate和end_pubdate进行赋值
      dateArr: []
    }
  }
}
</script>

<style lang="less" scoped>
</style>
