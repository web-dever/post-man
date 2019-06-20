<template>
  <el-container class="container">
    <el-aside width="1000px">
        <el-form :label-position="labelPosition"
                 label-width="120px">
          <el-form-item label="请求地址">
            <el-input placeholder="请输入请求地址"
                      v-model="formContent.url"
                      clearable></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="10">
              <el-form-item label="请求方法">
                <el-select v-model="methodValue"
                           placeholder="请选择请求方法">
                  <el-option v-for="item in methodOptions"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="Content-Type">
                <el-select v-model="contentTyeValue"
                           placeholder="请选择请求方法">
                  <el-option v-for="item in contentTyepOptions"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="地址栏参数">
            <el-row class="params">
              <el-col>
                <el-button class="primary"
                           size="mini"
                           type="primary"
                           @click="paramsAdd()"
                           icon="el-icon-plus"></el-button>
              </el-col>
              <el-col :span="24">
                <el-row :gutter="20"
                        v-for="(item,index) of paramsArr"
                        :key="index">
                  <el-col :span="10">
                    <el-input placeholder="请输入name"
                              v-model="item.name"
                              clearable></el-input>
                  </el-col>
                  <el-col :span="10">
                    <el-input placeholder="请输入value"
                              v-model="item.value"
                              clearable></el-input>
                  </el-col>
                  <el-col :span="2">
                    <el-button size="mini"
                               @click="paramsReduce(index)"
                               icon="el-icon-delete"></el-button>
                  </el-col>
                </el-row>
              </el-col>

            </el-row>
          </el-form-item>
          <el-form-item label="data参数">
            <el-row class="params">
              <el-col>
                <el-button class="primary"
                           size="mini"
                           type="primary"
                           @click="dataAdd()"
                           icon="el-icon-plus"></el-button>
              </el-col>
              <el-col :span="24">
                <el-row :gutter="20"
                        v-for="(item,index) of dataArr"
                        :key="index">
                  <el-col :span="10">
                    <el-input placeholder="请输入name"
                              v-model="item.name"
                              clearable></el-input>
                  </el-col>
                  <el-col :span="10">
                    <el-input placeholder="请输入value"
                              v-model="item.value"
                              clearable></el-input>
                  </el-col>
                  <el-col :span="2">
                    <el-button size="mini"
                               @click="dataReduce(index)"
                               icon="el-icon-delete"></el-button>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="上传文件">
            <el-row class="params">
              <el-col>
                <el-upload class="upload-demo"
                           action="https://jsonplaceholder.typicode.com/posts/"
                           :on-preview="handlePreview"
                           :on-remove="handleRemove"
                           multiple
                           :limit="3"
                           :on-exceed="handleExceed"
                           :file-list="fileList">
                  <el-button size="small"
                             type="primary">点击上传</el-button>
                  <div slot="tip"
                       class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">确定</el-button>
          </el-form-item>
        </el-form>
    </el-aside>
    <el-main class="main">Main</el-main>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      labelPosition: 'right',
      formContent: {
        url: '',
        methods: '',
        type: '',
      },
      methodOptions: [
        {
          value: '1',
          label: 'GET',
        },
        {
          value: '2',
          label: 'POST',
        },
        {
          value: '3',
          label: 'PUT',
        },
        {
          value: '4',
          label: 'DELETE',
        },
      ],
      contentTyepOptions: [
        {
          value: '1',
          label: 'application/x-www-form-urlencoded',
        },
        {
          value: '2',
          label: 'application/json',
        },
        {
          value: '3',
          label: 'multipart/form-data',
        },
        {
          value: '4',
          label: 'text/xml',
        },
      ],
      methodValue: '',
      contentTyeValue: '',
      paramsArr: [{ name: '', value: '' }, { name: '', value: '' }],
      dataArr: [{ name: '', value: '' }, { name: '', value: '' }],
      fileList: [
        {
          name: 'food.jpeg',
          url:
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        },
        {
          name: 'food2.jpeg',
          url:
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        },
      ],
    };
  },
  methods: {
    paramsAdd() {
      this.paramsArr.push({ name: '', value: '' });
    },
    paramsReduce(index) {
      this.paramsArr.splice(index, 1);
    },
    dataAdd() {
      this.dataArr.push({ name: '', value: '' });
    },
    dataReduce(index) {
      this.dataArr.splice(index, 1);
    },
    handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
       handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      
    getparams() {},
  },
};
</script>
<style>

.params {
  width: 100%;
  min-height: 200px;
  text-align: center;
  border: 1px solid #dcdfe6;
  padding: 5px 5px;
}
.el-row {
  margin-bottom: 20px;
}
.main {
  width: 100%;
  margin-left: 10px;
  min-height: 500px;
  border: 1px dashed #dcdfe6;
}
</style>


