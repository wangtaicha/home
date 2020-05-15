<template>
    <div class='container'>
        <slot name="up" age="18"></slot>
        <div>测试插槽</div>
        <slot name="down"></slot>
    </div>
</template>

<script>
export default {
  name: 'my-test'
}
</script>

<style lang="less" scoped>
</style>
