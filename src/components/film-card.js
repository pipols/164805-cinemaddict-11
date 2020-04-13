import {reformatDate} from "../utils/date";
import {reformatRuntime} from "../utils/film";
import {createElement} from "../utils/render";

const createFilmCardTemplate = ({filmInfo, comments}) => {
  const {title, totalRating, release, runtime, genre, poster, description} = filmInfo;

  return (`<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${totalRating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${reformatDate(release.date)}</span>
      <span class="film-card__duration">${reformatRuntime(runtime)}</span>
      <span class="film-card__genre">${genre.join(` `)}</span>
    </p>
    <img src=${poster} alt=${title} class="film-card__poster">
    <p class="film-card__description">${description}</p>
    <a class="film-card__comments">${comments.length} comments</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist film-card__controls-item--active">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
    </form>
  </article>`);
};

export default class FilmCard {
  constructor(movie) {
    this._element = null;
    this._movie = movie;
  }

  getTemplate() {
    return createFilmCardTemplate(this._movie);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }
}
