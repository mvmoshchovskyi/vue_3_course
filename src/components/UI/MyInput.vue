<template>
  <input class="input" type="text" :value='modelValue' @input='updateInput'/>
</template>

<script>
export default {
  name: "my-input",
  props: {
    modelValue: [String, Number],
  },
  methods:{
    updateInput(event){
      this.$emit('update:modelValue', event.target.value)
    }
  }
};
</script>

<style  scoped>
.input {
  margin-top: 15px;
  padding: 5px 10px;
  border: 2px solid teal;
  width: 100%;
}
</style>