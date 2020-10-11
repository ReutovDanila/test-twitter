<template>
  <div class="themeSwitch">
    <button
      v-for="item in items"
      :key="item.code"
      class="themeSwitch__item"
      @click="onSelect(item.code)"
      :class="{'themeSwitch__item--active': activeCode === item.code}"
      type="button"
    >
      <span>{{ item.title }}</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'ThemeSwitch',
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      activeCode: this.items.length ? this.items[0].code : '',
    };
  },
  methods: {
    onSelect(code) {
      document.body.classList.remove(`theme-${this.activeCode}`);
      this.activeCode = code;
      document.body.classList.add(`theme-${this.activeCode}`);
    },
  },
  mounted() {
    document.body.classList.add(`theme-${this.activeCode}`);
  },
}
</script>

<style lang="scss">
@import '../assets/styles/options.scss';

.themeSwitch {
  display: inline-flex;
  align-items: center;

  &__item {
    appearance: none;
    padding: 0;
    outline: none;
    background: none;
    color: $light-secondary;
    font-size: 18px;
    outline: none;
    border: none;
    border-bottom: 2px solid transparent;
    transition: color 0.3s ease, border-color 0.3s ease;
    cursor: pointer;

    & + & {
      margin-left: 20px;
    }

    span {
      position: relative;
    }

    &--active {
      color: $light-accent;
      border-color: $light-accent;
    }
  }
}

.theme-dark {
  .themeSwitch__item {
    color: $dark-secondary;

    &--active {
      color: $dark-accent;
      border-color: $dark-accent;
    }
  }
}
</style>
