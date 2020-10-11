import pad from './pad';
const MOUNTHS = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

const dateFormat = (value) => {
  try {
    const date = new Date(value);
    return `${pad(date.getDate())} ${MOUNTHS[date.getMonth()]} ${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  } catch (e) {
    return value;
  }
};

export default dateFormat;
