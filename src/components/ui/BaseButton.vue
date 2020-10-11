<script>
export default {
  render(ce) {
    const tag = (this.$attrs.href && 'a') || 'button';
    const baseButton = 'baseButton';
    return ce(tag,
      {
        class: { baseButton, ...this.mod },
        ...this.$attrs,
        props: {
          to: this.to,
        },
      },
      [
        this.$slots.default,
      ]);
  },
}
</script>

<style lang="scss">
@import '../../assets/styles/options.scss';

.baseButton {
  background-color: $light-accent;
  appearance: none;
  border-radius: 4px;
  padding: 16px 20px;
  font-size: 18px;
  line-height: 1.3em;
  color: #fff;
  border: none;
  outline: none;
  cursor: pointer;
}
</style>
