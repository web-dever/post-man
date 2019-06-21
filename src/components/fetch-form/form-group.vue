<template>
  <el-card :class="['form-group-wrapper', {empty: fields.length === 0}]">
    <div slot="header"
         class="clearfix">
      <span>{{title}}</span>
    </div>
    <slot></slot>
    <el-form-item :label-width="leftOffset">
      <form-item-input v-for="field in fields"
                       :key="field.id"
                       @delete-filed="onDeleteFiled($event)"
                       :field="field"></form-item-input>
    </el-form-item>
    <el-button :style="{marginLeft: leftOffset}"
               type="success"
               @click.prevent="onAddField()"
               plain>添加一个参数</el-button>
    <el-button type="warning"
               @click.prevent="onHandleReset()"
               plain>重置</el-button>
  </el-card>
</template>

<script>
import FormItem from './form-item';
import { hash } from '../../tool';
import reset from '../../mixins/reset';


export default {
  components: {
    'form-item-input': FormItem
  },
  mixins: [reset],
  props: {
    title: String,
    labelWidth: Number
  },
  computed: {
    leftOffset() {
      return this.labelWidth === void 0 ? this.labelWidth + 'px' : 'auto';
    }
  },
  data() {
    return {
      fields: [
        {
          id: hash(),
          name: '',
          value: ''
        }
      ]
    };
  },
  methods: {
    onHandleReset() {
      this.onResetData();
      this.$emit('reset-data');
    },
    onAddField() {
      this.fields.push({
        name: '',
        value: '',
        id: hash(),
      });
    },
    onDeleteFiled(filed) {
      this.fields = this.fields.filter(item => item.id !== filed.id);
    }
  }
}
</script>
<style lang="less">
.form-group-wrapper {
  .el-form-item__content {
    .flex-wrapper {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  &.empty {
    .el-form-item {
      margin-bottom: 0;
    }
  }
}
</style>

