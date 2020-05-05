import AbstractComponent from './abstract-component';
import {getFormattedTime, TimeToken} from '../utils/common';

const Emotion = {
  smile: `./images/emoji/smile.png`,
  sleeping: `./images/emoji/sleeping.png`,
  puke: `./images/emoji/puke.png`,
  angry: `./images/emoji/angry.png`
};

const createCommentElement = (comment) => {
  const {emotion, commentText, author, date} = comment;

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="${Emotion[emotion]}" width="55" height="55" alt="emoji">
      </span>
      <div>
      <p class="film-details__comment-text">${commentText}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${getFormattedTime(date, TimeToken.COMMENT)}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
      </div>
    </li>`);
};

export default class Comment extends AbstractComponent {
  constructor(comment) {
    super();
    this._comment = comment;
  }

  getTemplate() {
    return createCommentElement(this._comment);
  }

  setDeleteCommentButtonHandler(handler) {
    this.getElement()
      .querySelector(`.film-details__comment-delete`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        handler(this._comment.id);
      });
  }
}
