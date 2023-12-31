import View from './View';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const gotTopage = +btn.dataset.goto;

      handler(gotTopage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      const markup = this._generateMarkupBtn(curPage, numPages);
      return markup;
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupBtn(curPage, numPages);
    }

    // Other page
    if (curPage < numPages) {
      return this._generateMarkupBtn(curPage, numPages);
    }

    // Page 1, and there NO other pages
    return '';
  }

  _generateMarkupBtn(curPage, numPages) {
    if (curPage === 1 && numPages > 1) {
      return `
        <button data-goto='${
          curPage + 1
        }' class="btn--inline pagination__btn--next">
          <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }
    if (curPage === numPages && numPages > 1) {
      return `
        <button data-goto='${
          curPage - 1
        }' class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curPage - 1}</span>
        </button>
      `;
    }
    if (curPage < numPages) {
      return `
        <button data-goto='${
          curPage - 1
        }' class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curPage - 1}</span>
        </button>
        <button data-goto='${
          curPage + 1
        }' class="btn--inline pagination__btn--next">
        <span>Page ${curPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
      `;
    }
  }
}

export default new PaginationView();
