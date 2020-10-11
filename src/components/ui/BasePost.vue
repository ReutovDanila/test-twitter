<template>
  <div class="basePost">
    <div class="basePost__card">
      <div class="basePost__cardAvatar" :style="{'background-image': `url(${avatar})`}">
        <div class="basePost__cardName">
          {{ firstName }} {{ lastName }}
        </div>
      </div>
      <div class="basePost__cardContent">
        <div class="basePost__cardText" v-html="computedContent"></div>
        <div class="basePost__cardDate"> {{ getDateCreate(timestamp) }}</div>
      </div>
    </div>

    <div class="basePost__card basePost__card--comment" v-for="comment in lastComments" :key="comment.id">
      <div class="basePost__cardAvatar" :style="{'background-image': `url(${comment.avatar})`}">
        <div class="basePost__cardName">
          {{ comment.firstName }} {{ comment.lastName }}
        </div>
      </div>
      <div class="basePost__cardContent">
        <div class="basePost__cardText" v-html="comment.content"></div>
        <div class="basePost__cardDate"> {{ getDateCreate(comment.timestamp) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import dateFormat from '../../assets/scripts/dateFormat';

export default {
  name: 'BasePost',
  props: {
    avatar: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Number,
      required: true,
    },
    comments: {
      type: Array,
      default: () => [],
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    }
  },
  computed: {
    lastComments() {
      return [...this.comments].sort((a, b) => b.timestamp - a.timestamp).splice(0, 3);
    },
    computedContent() {
      // eslint-disable-next-line no-useless-escape
      return  this.content.replace(/https?:\/\/(.+?)\/(([a-zA-Z0-9_ \-%\.]*)\.(svg|jpg|png|jpeg|gif))/g, (match) => {
        return `<img src="${match}" alt="ALt" />`;
      });
    },
  },
  methods: {
    getDateCreate(timestamp) {
      return dateFormat(timestamp);
    },
  },
}
</script>

<style lang="scss">
@import '../../assets/styles/options.scss';

.basePost {
  $self: &;

  &__cardName {
    position: absolute;
    bottom: calc(100% + 3.5px);
    left: 50%;
    transform: translate(-50%, -5px) ;
    background-color: $light-bg-1;
    box-shadow: 0px 3px 8px rgba(75, 86, 102, 0.21);
    padding: 8px;
    color: $light-text;
    border-radius: 4px;
    text-align: center;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0s ease 0.3s, transform 0.3s ease;

    &::before {
      content: "";
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 7px 7px 0 7px;
      border-color: $light-bg-1 transparent transparent transparent;
    }
  }

  &__cardAvatar {
    position: relative;
    width: 76px;
    height: 76px;
    border-radius: 50%;
    background-color: $light-secondary;
    background-position: center;
    background-size: cover;
    flex-shrink: 0;
    margin-right: 28px;

    @media screen and (max-width: $mobile) {
      width: 50px;
      height: 50px;
      margin-right: 20px;
    }

    &:hover {
      #{$self}__cardName {
        opacity: 1;
        visibility: visible;
        transform: translate(-50%, 0) ;
        transition-delay: 0s;
      }
    }
  }

  &__cardText {
    min-height: 3em;
  }

  &__cardContent {
    font-size: 16px;
    line-height: 1.3em;
    color: $light-text;
    flex: 1;

    @media screen and (max-width: $mobile) {
      font-size: 14px;
    }

    img {
      display: block;
      max-width: 100%;
      margin: 10px 0;
    }
  }

  &__cardDate {
    font-size: 16px;
    font-weight: 500;
    line-height: 1;
    color: $light-secondary;
    margin-top: 10px;

    @media screen and (max-width: $mobile) {
      font-size: 12px;
    }
  }

  &__card {
    background-color: $light-bg-1;
    border: 1.5px solid $light-secondary;
    border-radius: 4px;
    display: flex;
    padding: 30px 32px;
    margin-bottom: 27px;

    @media screen and (max-width: $mobile) {
      padding: 16px 20px;
      margin-bottom: 20px;
    }

    &--comment {
      margin-bottom: 16px;
      margin-left: 60px;
      padding: 16px 20px;
      background-color: $light-bg;
      border-color: transparent;

      @media screen and (max-width: $mobile) {
        margin-left: 10px;
        padding: 10px 14px;
        margin-bottom: 10px;
      }

      #{$self}__cardContent {
        color: $light-text-comment;
      }

      #{$self}__cardAvatar {
        width: 50px;
        height: 50px;
        margin-right: 24px;

        @media screen and (max-width: $mobile) {
          width: 40px;
          height: 40px;
          margin-right: 20px;
        }
      }
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  & + & {
    margin-top: 30px;
  }
}

.theme-dark {
  .basePost {
    $self: &;

    &__cardName {
      background-color: $dark-bg-1;
      color: $dark-text;

      &::before {
        border-color: $dark-bg-1 transparent transparent transparent;
      }
    }

    &__cardAvatar {
      background-color: $dark-secondary;
    }

    &__cardContent {
      color: $dark-text;
    }

    &__cardDate {
      color: $dark-secondary;
    }

    &__card {
      background-color: $dark-bg-1;
      border-color: $dark-secondary;

      &--comment {
        background-color: $dark-bg;

        #{$self}__cardContent {
          color: $dark-text-comment;
        }
      }
    }
  }
}
</style>
