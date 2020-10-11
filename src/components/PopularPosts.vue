<template>
  <section class="popularPosts">
    <h2 class="popularPosts__title">Самые часто обсуждаемые посты</h2>
    <template v-if="items.length">
      <div class="popularPosts__item" v-for="item in items" :key="item.id">
        <div class="popularPosts__itemCount">
          {{ item.count }}
        </div>
        <div class="popularPosts__itemContent" v-html="item.content"></div>
      </div>
    </template>
    <template v-else>Посты не найдены</template>
  </section>
</template>

<script>
export default {
  name: 'PopularPosts',
  props: {
    posts: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    items() {
      return [...this.posts].sort((a, b) => b.comments.length - a.comments.length).splice(0, 5).map((element) => {
        // eslint-disable-next-line no-useless-escape
        const content = element.content.replace(/https?:\/\/(.+?)\/(([a-zA-Z0-9_ \-%\.]*)\.(svg|jpg|png|jpeg|gif))/g, '');

        return {
          id: element.id,
          content: content.length > 65 ? `${content.substring(0, 65)}...` : content,
          count: element.comments.length,
        };
      });
    },
  },
}
</script>

<style lang="scss">
@import '../assets/styles/options.scss';

.popularPosts {
  width: 100%;

  &__title {
    font-size: 24px;
    line-height: 1.3em;
    color: $light-text;
    margin-bottom: 60px;
    display: flex;
    align-items: center;
    min-height: 55px;

    @media screen and (max-width: $mobile) {
      font-size: 20px;
      min-height: 0;
      margin-bottom: 30px;
    }
  }

  &__item {
    display: flex;

    & + & {
      margin-top: 20px;
    }
  }

  &__itemCount {
    width: 58px;
    height: 58px;
    background-color: $light-bg;
    flex-shrink: 0;
    margin-right: 15px;
    font-size: 24px;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: $light-accent;

    @media screen and (max-width: $mobile) {
      width: 50px;
      height: 50px;
      font-size: 20px;
    }
  }

  &__itemContent {
    align-self: center;
    font-size: 16px;
    line-height: 1.3em;
    flex: 1;
    color: $light-text;

    @media screen and (max-width: $mobile) {
      font-size: 14px;
    }
  }
}

.theme-dark {
  .popularPosts {
    &__title {
      color: $dark-text;
    }

    &__itemCount {
      background-color: $dark-bg;
      color: $dark-accent;
    }

    &__itemContent {
      color: $dark-text;
    }
  }
}
</style>
