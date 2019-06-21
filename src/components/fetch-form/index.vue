<template>
  <el-form class="fetch-form-wrapper"
           label-width="auto">
    <form-group title="请求头配置"
                @reset-data="onResetData()">
      <el-form-item label="请求地址">
        <el-input placeholder="请输入请求地址"
                  v-model="url"
                  clearable></el-input>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="请求方法">
            <el-select v-model="methodType"
                       placeholder="请选择请求方法">
              <el-option v-for="method in methods"
                         v-bind="method"
                         :key="method.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Content-Type"
                        label-width="100px">
            <el-select v-model="contentType"
                       @change="$emit('content-type-change', $event)"
                       placeholder="请选择请求方法">
              <el-option v-for="type in contentTypes"
                         v-bind="type"
                         :key="type.vue">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </form-group>
    <template v-if="methodType === 'GET'"></template>
    </form-group>
    <json-type v-else-if="contentType === 'application/json'"></json-type>
  </el-form>
</template>

<script>
import { mapState } from 'vuex'


import FormGroup from './form-group';
import JsonType from './json';
import reset from '../../mixins/reset';


export default {
  mixins: [reset],
  components: {
    'form-group': FormGroup,
    'json-type': JsonType
  },
  data() {
    return {
      url: '',
      methodType: 'GET',
      contentType: 'application/json',
    };
  },
  computed: {
    ...mapState({
      methods: state => state.methods,
      contentTypes: state => state.contentTypes,
    })
  },
  methods: {
    onSubmit() {
      var params = this.$refs.params.fields;
      var data = this.$refs.data.fields;
      var file = this.$refs.file.fields;

      console.log(params);
      console.log(data);
      console.log(file);
    }
  },
  mounted() {

  }
}
</script>
<style lang="less">
.fetch-form-wrapper {
  width: 698px;
  .el-row {
    margin-bottom: 0;
  }
  .el-card {
    margin-bottom: 25px;
  }
  .el-select {
    display: block;
  }
  .submit {
    text-align: center;
  }
}
</style>
