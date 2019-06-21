<template>
  <el-card class="json-type-card">
    <div slot="header"
         class="clearfix">
      <span>请求体参数</span>
    </div>
    <el-input v-model="fetchData"
              type="textarea"
              @input="onFormatJson($event)"
              placeholder="请输入请求体内的参数的值，多数是一个json"></el-input>
    <el-button type="warning"
               @click.prevent="onResetData()"
               plain>重置参数</el-button>
  </el-card>
</template>

<script>
import reset from '../../mixins/reset';


export default {
  mixins: [reset],
  data() {
    return {
      fetchData: ''
    };
  },
  methods: {
    onFormatJson(value) {
      var valStr = value.replace(/\'/g, '"');
      var valObj;

      valStr = valStr.replace(/ /g, '');
      valStr = valStr.replace(/(\w+(?=:))/g, `"$1"`);
      valStr = valStr.replace(/\,(?=\}$)/, '');

      try {
        valObj = JSON.parse(valStr)
        if (typeof valObj === 'object') {
          this.fetchData = JSON.stringify(valObj, null, 4);
        }
      } catch (err) {

      }
    },
  }
}
</script>

<style lang="less">
.json-type-card {
  .el-textarea {
    margin-bottom: 20px;
    textarea {
      height: 200px;
    }
  }
}
</style>
