import PageController from './controllers/page-controller';
import FilterController from './controllers/filter-controller';
import SortController from './controllers/sort-controller';
import StatisticController from './controllers/statistic-controller';
import MoviesModel from './models/movies';
import API from './api';


const TOKEN = `Basic er883jdlkvzbddsaqw`;
const API_URL = `https://11.ecmascript.pages.academy/cinemaddict`;

const siteMainElement = document.querySelector(`main`);
const api = new API(API_URL, TOKEN);
const moviesModel = new MoviesModel();

const pageController = new PageController(siteMainElement, moviesModel, api);
const filterController = new FilterController(siteMainElement, moviesModel);
const sortController = new SortController(siteMainElement, moviesModel);
const statisticController = new StatisticController(siteMainElement, moviesModel);

const renderPage = () => {
  filterController.render();
  sortController.render();
  pageController.render();
  statisticController.render();

  const filterComponent = filterController.getFilterComponent();

  filterComponent.setFilterChangeHandler((filter) => {
    if (!filter) {
      pageController.hide();
      sortController.hide();
      statisticController.show();
    } else {
      pageController.show();
      sortController.show();
      statisticController.hide();
    }
  });
};

api.getMovies()
  .then((movies) => {
    moviesModel.setCards(movies);
    renderPage();
  });

// починить RAW в адаптерах
// сделать компонент(контроллер?) комментариев
// а нужен ли _onViewChange?
// починить releaseDate в MovieAdapter
