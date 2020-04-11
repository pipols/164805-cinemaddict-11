import {createProfileTemplate} from "./components/profile";
import {createMainNavigationTemplate} from "./components/main-navigation";
import {createFilmCardTemplate} from "./components/film-card";
import {createShowMoreTemplate} from "./components/show-more";
// import {createExtraFilmsTemplate} from "./components/extra-film";
// import {createFilmDetailsTemplate} from "./components/film-details";
import {createFilmsTemplate} from "./components/films";

import {render} from "./utils/render";
import {Movies} from "./mock/film";

const CardCount = {
  start: 5,
  step: 5
};

let showingCard = CardCount.start;

const siteHeaderElement = document.querySelector(`header`);
const siteMainElement = document.querySelector(`main`);

render(siteHeaderElement, createProfileTemplate());

render(siteMainElement, createMainNavigationTemplate());
render(siteMainElement, createFilmsTemplate());

const filmsListElement = siteMainElement.querySelector(`.films-list`);
const filmsContainerElement = siteMainElement.querySelector(`.films-list__container`);

const filmsTemplate = Movies.slice(0, CardCount.start).map((movie) => createFilmCardTemplate(movie)).join(``);
render(filmsContainerElement, filmsTemplate);

render(filmsListElement, createShowMoreTemplate());

const showMore = filmsListElement.querySelector(`.films-list__show-more`);
showMore.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  const prevFilmCount = showingCard;
  showingCard += CardCount.step;

  const films = Movies.slice(prevFilmCount, showingCard).map((movie) => createFilmCardTemplate(movie)).join(``);
  render(filmsContainerElement, films);

  if (showingCard >= Movies.length) {
    showMore.remove();
  }

});
