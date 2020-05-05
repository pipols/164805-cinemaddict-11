import CardComponent from '../components/film-card';
import FilmDetailsComponent from '../components/film-details';
import CommentComponent from '../components/comment';
import MovieAdapter from '../adapters/movie';
import {render, replace, remove} from '../utils/render';
import {extend} from '../utils/common';
import {KeyCode} from '../const';

const siteBodyElement = document.querySelector(`body`);

export default class MovieController {
  constructor(container, onDataChange, onViewChange, api) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._api = api;

    this._card = [];
    this._card.comments = [];
    this._cardComponent = null;
    this._filmDetailsComponent = null;

    this._closeButtonClickHandler = this._closeButtonClickHandler.bind(this);
    this._escKeydownHandler = this._escKeydownHandler.bind(this);
    this._cardClickHandler = this._cardClickHandler.bind(this);
    this._deleteCommentButtonHandler = this._deleteCommentButtonHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
  }

  render(card) {
    const oldCardComponent = this._cardComponent;
    const oldFilmDetailsComponent = this._filmDetailsComponent;

    this._card = card;
    this._cardComponent = new CardComponent(card);
    this._filmDetailsComponent = new FilmDetailsComponent(card);

    this._isCommentsRender = false;

    this._cardComponent.setCardPosterClickHandler(this._cardClickHandler);
    this._cardComponent.setCardTitleClickHandler(this._cardClickHandler);
    this._cardComponent.setCardCommentsClickHandler(this._cardClickHandler);

    this._cardComponent.setWatchlistButtonClickHandler(() => {
      const newCard = MovieAdapter.clone(this._card);
      newCard.isWatchlist = !newCard.isWatchlist;

      this._onDataChange(this, this._card, newCard);
    });

    this._cardComponent.setWatchedButtonClickHandler((evt) => {
      evt.preventDefault();
      const newCard = MovieAdapter.clone(this._card);
      newCard.isWatched = !newCard.isWatched;

      this._onDataChange(this, this._card, newCard);
    });

    this._cardComponent.setFavoriteButtonClick((evt) => {
      evt.preventDefault();
      const newCard = MovieAdapter.clone(this._card);
      newCard.isFavorite = !newCard.isFavorite;

      this._onDataChange(this, this._card, newCard);
    });

    this._filmDetailsComponent.setWatchlistChangeHandler(() => {
      const newCard = MovieAdapter.clone(this._card);
      newCard.isWatchlist = !newCard.isWatchlist;

      this._onDataChange(this, this._card, newCard);
    });

    this._filmDetailsComponent.setWatchedChangeHandler((evt) => {
      evt.preventDefault();
      const newCard = MovieAdapter.clone(this._card);
      newCard.isWatched = !newCard.isWatched;

      this._onDataChange(this, this._card, newCard);
    });

    this._filmDetailsComponent.setFavoriteChangeHandler((evt) => {
      evt.preventDefault();
      const newCard = MovieAdapter.clone(this._card);
      newCard.isFavorite = !newCard.isFavorite;

      this._onDataChange(this, this._card, newCard);
    });

    this._filmDetailsComponent.setCloseButtonClickHandler(this._closeButtonClickHandler);
    this._filmDetailsComponent.setEmojiChangeHandler();

    this._filmDetailsComponent.setFormSubmitHandler(this._formSubmitHandler);

    if (oldFilmDetailsComponent && oldCardComponent) {
      replace(this._cardComponent, oldCardComponent);
      replace(this._filmDetailsComponent, oldFilmDetailsComponent);
    } else {
      render(this._container, this._cardComponent);
    }

    this._loadComments();
  }

  destroy() {
    remove(this._cardComponent);
    this._removePopup();
  }

  _removePopup() {
    remove(this._filmDetailsComponent);
    document.removeEventListener(`keydown`, this._escKeydownHandler);
    this._isCommentsRender = false;
  }

  _closeButtonClickHandler() {
    this._removePopup();
  }

  _escKeydownHandler(evt) {
    if (evt.keyCode === KeyCode.ESC) {
      this._removePopup();
    }
  }

  _renderPopup() {
    render(siteBodyElement, this._filmDetailsComponent);
    document.addEventListener(`keydown`, this._escKeydownHandler);
    this._filmDetailsComponent.recoveryListeners();
    if (!this._isCommentsRender) {
      this._renderComments(this._card.comments);
    }
  }

  _loadComments() {
    this._api.getComment(this._card.id)
      .then((comments) => {
        this._card.comments = comments;
        this._isCommentsRender = true;
        this._renderComments(this._card.comments);
      });
  }

  _cardClickHandler() {
    this._renderPopup();
  }

  _deleteCommentButtonHandler(commentId) {
    this._api.deleteComment(commentId)
      .then(() => {
        this._card.comments = this._card.comments.filter((comment) => comment.id !== commentId);
        this._onDataChange(this, this._card, this._card);
      });
  }

  _formSubmitHandler(evt) {
    if ((evt.ctrlKey || evt.metaKey) && evt.key === KeyCode.ENTER) {
      const data = new FormData(evt.target.form);

      const comment = data.get(`comment`);
      const emoji = data.get(`comment-emoji`);

      const newComment = {
        emotion: emoji,
        commentText: comment,
        author: `John Doe`,
        date: new Date()
      };

      this._onDataChange(this, this._card, extend(this._card, this._card.comments.unshift(newComment))); //
    }
  }

  _renderComments(comments) {
    const container = this._filmDetailsComponent.getElement().querySelector(`.film-details__comments-list`);
    comments.map((comment) => {
      const commentComponent = new CommentComponent(comment);
      commentComponent.setDeleteCommentButtonHandler(this._deleteCommentButtonHandler);
      render(container, commentComponent);
    });
  }

}
