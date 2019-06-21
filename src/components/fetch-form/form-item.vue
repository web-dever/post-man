<template>
  <div class="flex-wrapper">
    <div class="field-name">
      <el-input v-model="field.name"
                placeholder="请输入参数的键名"></el-input>
    </div>
    <div class="field-value">
      <el-input v-model="field.value"
                placeholder="请输入参数的值"></el-input>
    </div>
    <el-button type="danger"
               icon="el-icon-delete"
               circle
               @click.prevent="$emit('delete-filed', field)"></el-button>
  </div>
</template>

<script>
export default {
  props: {
    field: {
      type: Object,
      default() {
        return {
          name: '',
          value: '',
        }
      }
    }
  },
  mounted() {
  },
}
</script>

<style lang="less">
.flex-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: normal;
  .el-input {
    line-height: normal;
  }
  .field-name {
    width: 180px;
    margin-right: 15px;
  }
  .field-value {
    flex: 1 1 0;
    margin-right: 15px;
  }
}
</style>
