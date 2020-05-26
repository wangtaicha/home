<template>
    <div class='container'>
        接收B组件传的值: <i>{{msg}}</i>
    </div>
</template>

<script>
import eventBus from '@/eventBus'
export default {
  data () {
    return {
      msg: ''
    }
  },
  created () {
    eventBus.$on('b2a', (data) => {
      this.msg = data
    })
  }
}
</script>

<style lang="less" scoped>
</style>
