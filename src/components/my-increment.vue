<template>
    <div class='container'>
        自增1: {{value}} <button @click="increment()">+1</button>
    </div>
</template>

<script>
export default {
  props: ['value'],
  name: 'my-increment',
  data () {
    return {
    //   count: 0
    }
  },
  methods: {
    increment () {
    //   this.count++
      this.$emit('input', this.value + 1)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
