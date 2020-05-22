<template>
  <el-select @change="changeChannel" :value="value" placeholder="请选择" clearable>
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  // 接收父组件传过来的值
  // 通过props传过来的值是可读的,不可修改的,而v-model既能赋值也能改值,所以不能使用v-model
  // 只能使用:value 给el-select赋值
  props: ['value'],
  data () {
    return {
      // 默认选中的下拉选项
      // value: null,
      // 所有的下拉选项
      channelOptions: []
    }
  },
  created () {
    this.getChannelOption()
  },
  methods: {
    // select@change事件有个默认值value
    changeChannel (value) {
    //   if (this.value === '') this.value = null
      if (value === '') value = null
      this.$emit('input', value)
    },
    // 获取频道列表
    async getChannelOption () {
      const res = await this.$http.get('channels')
      // console.log(res)
      this.channelOptions = res.data.data.channels
    }
  }
}
</script>

<style lang="less" scoped>
</style>
