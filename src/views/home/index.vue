<template>
  <el-container class="container-home">
    <el-aside width="200px" class="my-aside">Aside</el-aside>
      <el-container>
        <el-header class="my-header">Header</el-header>
        <el-main>Main</el-main>
      </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'app-home'
}
</script>

<style lang="less" scoped>
.container-home{
  width: 100%;
  height:100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: blue;
  .my-aside{
    background-color: #002233;
  }
  .my-header{
    border-bottom: 1px solid #ddd;
  }
}
</style>
