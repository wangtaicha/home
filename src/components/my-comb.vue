<template>
    <div class='container-comb'>
        B组件给A组件传的值: <button @click="fn">传值</button>
    </div>
</template>

<script>
// 导入eventBus
import eventBus from '@/eventBus'
export default {
  data () {
    return {
      str: '给A组件传的值'
    }
  },
  methods: {
    fn () {
      eventBus.$emit('b2a', this.str)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
