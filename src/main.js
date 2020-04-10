import {createProfileTemplate} from "./components/profile";
import {createMainNavigationTemplate} from "./components/main-navigation";
import {createFilmCardTemplate} from "./components/film-card";
import {createShowMoreTemplate} from "./components/show-more";
// import {createExtraFilmsTemplate} from "./components/extra-film";
// import {createFilmDetailsTemplate} from "./components/film-details";
import {createFilmsTemplate} from "./components/films";

import {render} from "./utils/render";

const siteHeaderElement = document.querySelector(`header`);
const siteMainElement = document.querySelector(`main`);

render(siteHeaderElement, createProfileTemplate());

render(siteMainElement, createMainNavigationTemplate());
render(siteMainElement, createFilmsTemplate());

const filmsListElement = siteMainElement.querySelector(`.films-list`);
const filmsContainerElement = siteMainElement.querySelector(`.films-list__container`);
render(filmsContainerElement, createFilmCardTemplate());
render(filmsListElement, createShowMoreTemplate());
