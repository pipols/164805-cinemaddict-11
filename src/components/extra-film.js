import {createElement} from "../utils/render";

const createExtraFilmsTemplate = () => {
  return (`<section class="films-list--extra">
    <h2 class="films-list__title">Most commented</h2>

    <div class="films-list__container">

    </div>
  </section>`);
};

export default class ExtraFilm {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createExtraFilmsTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }
}
