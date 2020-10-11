<template>
  <main id="app" class="page">
    <div class="container">
      <ThemeSwitch class="page__themeSwitch" :items="themes"/>
    </div>
    <div class="page__grid container">
      <div class="page__content">
        <PostForm class="page__form" @submit="onSubmit"/>
        <template v-if="posts.length">
          <BasePost
            v-for="item in sortPosts"
            :key="item.id"
            :avatar="item.avatar"
            :content="item.content"
            :timestamp="item.timestamp"
            :comments="item.comments"
            :firstName="item.firstName"
            :lastName="item.lastName"
          />
        </template>
        <template v-else>Посты не найдены</template>
      </div>

      <div class="page__aside">
        <PopularPosts :posts="posts" />
      </div>
    </div>
  </main>
</template>

<script>
import './assets/styles/style.scss';
import getRandomInt from './assets/scripts/getRandomInt';
import { loadPosts, addPost, addComment } from './assets/scripts/posts';

import PostForm from './components/PostForm.vue';
import ThemeSwitch from './components/ThemeSwitch.vue';
import BasePost from './components/ui/BasePost.vue';
import PopularPosts from './components/PopularPosts.vue';

export default {
  name: 'App',
  components: {
    PostForm,
    ThemeSwitch,
    BasePost,
    PopularPosts,
  },
  data() {
    return {
      isLoading: false,
      themes: [
        {
          title: 'Светлая тема',
          code: 'light',
        },
        {
          title: 'Темная тема',
          code: 'dark',
        },
      ],
      posts: [],
    }
  },
  computed: {
    sortPosts() {
      return [...this.posts].sort((a, b) => b.timestamp - a.timestamp);
    },
  },
  async mounted() {
    try {
      this.posts = await loadPosts();
    } catch {
      this.posts = [];
      console.error('Ошибка получения постов');
    }
  },
  methods: {
    async onSubmit(content) {
      const post = await addPost(content);
      this.posts.push(post);
      this.startGenerateComments(post.id, this.posts.length - 1);
    },
    startGenerateComments(postId, postIndex) {
      let timeout = getRandomInt(5, 30);
      setInterval(async() => {
        console.log(timeout);
        const comment = await addComment(postId);
        this.posts[postIndex].comments.push({ ...comment });
        timeout = getRandomInt(5, 30);
      }, timeout * 1000);
    }
  },
}
</script>

<style lang="scss">
@import './assets/styles/options.scss';

.page {
  padding-top: 85px;
  padding-bottom: 85px;

  @media screen and (max-width: $mobile) {
    padding-top: 40px;
    padding-bottom: 40px;
  }

  &__themeSwitch {
    margin-bottom: 50px;

    @media screen and (max-width: $mobile) {
      margin-bottom: 30px;
    }
  }

  &__form {
    margin-bottom: 60px;

    @media screen and (max-width: $mobile) {
      margin-bottom: 40px;
    }
  }

  &__grid {
    display: flex;

    @media screen and (max-width: $mobile) {
      display: block;
    }
  }

  &__content {
    width: calc(100% - 400px);
    padding-right: 60px;
    border-right: 1px solid $light-secondary;
    margin-right: 60px;

    @media screen and (max-width: $mobile) {
      width: 100%;
      margin-right: 0;
      border-bottom: 1px solid $light-secondary;
      border-right: none;
      padding-bottom: 30px;
      padding-right: 0;
    }
  }

  &__aside {
    width: 400px;
    flex-shrink: 0;

    @media screen and (max-width: $mobile) {
      width: 100%;
      margin-top: 30px;
    }
  }
}

.theme-dark {
  .page {
    &__content {
      border-color: $dark-secondary;
    }
  }
}
</style>
