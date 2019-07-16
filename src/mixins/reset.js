export default {
  beforeMount() {
    try {
      Object.defineProperty(this, '__initData__', {
        value: JSON.stringify(this.$data)
      });
    } catch (error) {
      Object.defineProperty(this, '__initData__', {
        value: '{}'
      });
      console.error(error);
    }
  },
  methods: {
    onResetData(excludeKeys = ['']) {
      var data = JSON.parse(this.__initData__);
      var keys = Object.keys(data);


      if (!Array.isArray(excludeKeys)) {
        excludeKeys = [''];
      }

      keys.forEach(key => {
        var isExclude = excludeKeys.some(item => item === key);

        if (isExclude) {
          return;
        }

        this[key] = data[key];
      });
    },
  },
};
