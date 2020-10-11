<template>
  <form method="post" action="/" class="postForm" @submit.prevent="onSubmit">
    <BaseTextarea class="postForm__field" placeholder="О чем вы думаете" v-model="text" name="message"/>
    <BaseButton class="postForm__submit" type="submit">Поделиться</BaseButton>
  </form>
</template>

<script>
import BaseButton from './ui/BaseButton';
import BaseTextarea from './ui/BaseTextarea';

export default {
  name: 'PostForm',
  components: {
    BaseButton,
    BaseTextarea,
  },
  data() {
    return {
      text: '',
    };
  },
  methods: {
    onSubmit() {
      if (!this.text) return;
      this.$emit('submit', this.text);
      this.text = '';
    },
  },
}
</script>

<style lang="scss">
@import '../assets/styles/options.scss';

.postForm {
  display: flex;
  width: 100%;

  @media screen and (max-width: $mobile) {
    display: block;
  }

  &__submit {
    width: 180px;
    flex-shrink: 0;
    margin-left: 20px;
    align-self: flex-end;

    @media screen and (max-width: $mobile) {
      margin-left: 0;
      width: 100%;
      margin-top: 10px;
    }
  }

  &__field {
    width: calc(100% - 200px);

    @media screen and (max-width: $mobile) {
      width: 100%;
    }
  }
}
</style>
