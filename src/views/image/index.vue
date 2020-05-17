<template>
    <div class='container-image'>
      <el-card>
        <div slot="header">
          <my-bread>素材管理</my-bread>
        </div>
        <!-- 按钮 -->
        <div class="btn-box">
           <el-radio-group v-model="resParams.collect" size="small">
             <!-- collect 值为true收藏 false全部的图片 -->
             <!-- :label 加上冒号指定的值才是布尔类型 -->
              <el-radio-button :label="false">全部</el-radio-button>
              <el-radio-button :label="true">收藏</el-radio-button>
           </el-radio-group>
           <el-button type="success" style="float:right" size="small">添加素材</el-button>
        </div>
        <!-- 列表 -->
        <div class="img-list">
          <div class="img-item" v-for="i in 10" :key="i">
            <img src="../../assets/avatar.jpg" alt="">
            <div class="option">
              <span class="el-icon-star-off"></span>
              <span class="el-icon-delete"></span>
            </div>
            </div>
        </div>
        <!-- 分页 -->
        <el-pagination
          style="margin-top:20px"
          background
          layout="prev, pager, next"
          :total="1000">
        </el-pagination>
      </el-card>
    </div>
</template>

<script>
export default {
  name: 'app-image',
  data () {
    return {
      resParams: {
        collect: false,
        page: 1,
        per_page: 10
      }
    }
  }
}
</script>

<style lang="less" scoped>
.img-list{
  .img-item{
    width: 180px;
    height:180px;
    border: 1px solid #ddd;
    position: relative;
    margin-top: 20px;
    display: inline-block;
    margin-right: 30px;
    img{
      width: 100%;
      height: 100%;
      display: block;
    }
    .option{
      width: 100%;
      height: 30px;
      line-height: 30px;
      background: rgba(0,0,0,0.3);
      position: absolute;
      left: 0;
      bottom: 0;
      text-align: center;
      span{
        color: #fff;
        margin: 0 30px;
      }
    }
  }
}
</style>
