<template>
  <select v-model="modelValue" @change="changeOption">
    <option disabled value="" >оберіть із списку</option>
    <option v-for="option in options" :key="option.value" :value="option.value">{{option.name}}</option>
  </select>
</template>

<script>
export default {
  name: "my-select",
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    modelValue:''
  },
  methods:{
    changeOption(event){
      this.$emit('update:modelValue',event.target.value)
    }
  }
};
</script>

<style lang="scss" scoped>
</style>