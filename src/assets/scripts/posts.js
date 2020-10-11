import uid from 'uid';
import getRandomInt from './getRandomInt';

const POST_PREFIX = 'my-post_';
const COMMENT_PREFIX = 'my-comment_';
const USER_AVATAR = '/images/avatar1.png';

const USERS = [
  {
    firstName: 'Николай',
    lastName: 'Вахитов',
    avatar: '/images/avatar2.png',
  },
  {
    firstName: 'Анастасия',
    lastName: 'Макарова',
    avatar: '/images/avatar3.png',
  },
  {
    firstName: 'Денис',
    lastName: 'Быстров',
    avatar: '/images/avatar4.png',
  },
  {
    firstName: 'Олег',
    lastName: 'Потапов',
    avatar: '/images/avatar5.png',
  }
];

const COMMENTS = [
  'Посмотрите на работу крупных компаний изнутри, познакомитесь с сотрудниками и руководителями. Сможете перенять опыт ведения крупных проектов.',
  'Совместно с консультантом вы определите цели профессионального развития, создадите эффективное резюме и узнаете, как проходить собеседования.',
  'Узнаете основные паттерны поведения пользователей и принципы проектирования интерфейсов на основе этих паттернов.',
  'Круто! Так держать.',
  'Можно узнать подробнее?',
  'Очень интересно',
  'Хотелось бы знать подробности. Можно где-то об этом прочитать? Может быть есть какой-то сайт об этом?',
  'Класс. Всегда интересовала эта тема.',
  'Очень здорово, что поднимаются такие темы.',
  'Хорошие мысли. Как можно с вами связаться, чтобы уточнить подробности данной темы?',
  'Супер. Однозначно, полезная тема.',
  'На самом деле, спорное утверждение.',
  'Вопрос интересный, но информации недостаточно.',
  'Хорошая тема.',
  'Соглашусь с автором.',
  'Да, тема имеет место быть. Не хватает дополнительной информации. Думаю, читатели были бы рады прикрепленной ссылке',
  'Класс. Меня заинтересовало.',
];

export async function loadPosts() {
  const keys = Object.keys(window.localStorage);

  const posts = {};
  const comments = [];

  // Получаем комментарии и посты с localstorage
  keys.forEach((key) => {
    if (key.indexOf(POST_PREFIX) === 0) {
      const item = JSON.parse(localStorage.getItem(key));
      posts[item.id] = { comments: [], ...item };
    } else if (key.indexOf(COMMENT_PREFIX) === 0){
      const item = JSON.parse(localStorage.getItem(key));
      comments.push({ ...item });
    }
  });

  // Мержем коменты к постам
  comments.forEach((item) => {
    if (posts[item.postId]) {
      posts[item.postId].comments.push(item);
    }
  });

  // Формируем посты
  const arr = [];
  Object.keys(posts).forEach((key) => {
    arr.push({
      ...posts[key],
    })
  });

  return arr;
}

export async function addPost(content) {
  const id = uid();
  const item = {
    id,
    avatar: USER_AVATAR,
    timestamp: Date.now(),
    content,
    firstName: 'Юрий',
    lastName: 'Долгов',
    comments: [],
  };

  localStorage.setItem(`${POST_PREFIX}${id}`, JSON.stringify(item));
  return item;
}

export async function addComment(postId) {
  const id = uid();
  const user = USERS[getRandomInt(0, USERS.length - 1)];

  const item = {
    id,
    postId,
    timestamp: Date.now(),
    content: COMMENTS[getRandomInt(0, COMMENTS.length - 1)],
    ...user,
  };

  localStorage.setItem(`${COMMENT_PREFIX}${id}`, JSON.stringify(item));
  return item;
}
