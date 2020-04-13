import Profile from "./components/profile";
import MainNavigation from "./components/main-navigation";
import FilmCard from "./components/film-card";
import ShowMore from "./components/show-more";
// import {createExtraFilmsTemplate} from "./components/extra-film";
// import {createFilmDetailsTemplate} from "./components/film-details";
import Films from "./components/films";

import {render} from "./utils/render";
import {Movies} from "./mock/film";

const CardCount = {
  start: 5,
  step: 5
};

let showingCard = CardCount.start;
const profile = new Profile();
const mainNavigation = new MainNavigation();
const films = new Films();
const filmCard = new FilmCard();

const siteHeaderElement = document.querySelector(`header`);
const siteMainElement = document.querySelector(`main`);
render(siteHeaderElement, profile);

render(siteMainElement, mainNavigation);
render(siteMainElement, films);

const filmsListElement = siteMainElement.querySelector(`.films-list`);
const filmsContainerElement = siteMainElement.querySelector(`.films-list__container`);

const filmsTemplate = Movies.slice(0, CardCount.start).map((movie) => filmCard(movie)).join(``);
render(filmsContainerElement, filmsTemplate);

render(filmsListElement, new ShowMore());

const showMore = filmsListElement.querySelector(`.films-list__show-more`);
showMore.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  const prevFilmCount = showingCard;
  showingCard += CardCount.step;

  const filmsTemp = Movies.slice(prevFilmCount, showingCard).map((movie) => filmCard(movie)).join(``);
  render(filmsContainerElement, filmsTemp);

  if (showingCard >= Movies.length) {
    showMore.remove();
  }

});
