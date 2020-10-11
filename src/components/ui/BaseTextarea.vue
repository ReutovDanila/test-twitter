<template>
  <div class="baseTextarea">
    <textarea :aria-label="this.$attrs.placeholder" :style="{height}" v-bind="{...this.$attrs}" :value="value" @input="onInput" class="baseTextarea__field" />
  </div>
</template>

<script>
export default {
  name: 'BaseTeaxtarea',
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      height: undefined,
    };
  },
  inheritAttrs: false,
  watch: {
    value(newValue) {
      if (newValue === '') {
        this.height = undefined;
      }
    },
  },
  methods: {
    onInput(e) {
      this.height = undefined;
       this.$emit('input', e.target.value);
       this.$nextTick(() => {
         this.height = `${e.target.scrollHeight}px`;
       });
    },
  },
}
</script>

<style lang="scss">
@import '../../assets/styles/options.scss';

.baseTextarea {
  display: block;

  &__field {
    display: block;
    width: 100%;
    height: 55px;
    font: 400 18px/1.3em "Roboto";
    appearance: none;
    background: $light-bg;
    border: 1px solid $light-secondary;
    resize: none;
    outline: none;
    color: $light-text;
    font-size: 18px;
    line-height: 1.3em;
    padding: 16px 20px;
    border-radius: 4px;
    overflow: hidden;

    &::placeholder {
      opacity: 1;
      color: $light-secondary;
    }
  }
}

.theme-dark {
  .baseTextarea__field {
    background: $dark-bg;
    border-color: $dark-secondary;
    color: $dark-text;

    &::placeholder {
      color: $dark-secondary;
    }
  }
}
</style>
