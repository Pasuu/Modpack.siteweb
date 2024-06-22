document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('.search-input');
  const container = document.querySelector('.search-result-container');

  const localSearch = new LocalSearch({
    path: searchConfig.path,
    top_n_per_article: searchConfig.top_n_per_article,
    unescape: searchConfig.unescape
  });

  if (searchConfig.preload) {
    console.log("Preloading search data...");
    localSearch.fetchData();
  }

  function openSearchPopup() {
    document.querySelector('.search-popup').classList.add('search-activate');
    if (!localSearch.isfetched) {
      localSearch.fetchData();
    }
  }

  function closeSearchPopup() {
    document.querySelector('.search-popup').classList.remove('search-activate');
    input.value = '';
    container.innerHTML = `<div class="search-result-message"></div>`;
  }

  document.querySelector('.search-btn').addEventListener('click', openSearchPopup);
  document.querySelector('.search-popup-overlay').addEventListener('click', closeSearchPopup);
  document.querySelector('.search-close-btn').addEventListener('click', closeSearchPopup);

  function debounce(fn, delay) {
    let timeoutId;
    return function(...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  }

  function normalizeText(text) {
    return text.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, ' ').trim();
  }

  function fuzzyMatch(text, searchText) {
    const normalizedText = normalizeText(text);
    const normalizedSearchText = normalizeText(searchText);
    return normalizedText.includes(normalizedSearchText);
  }

  const displaySearchResult = debounce(() => {
    if (!localSearch.isfetched) return;
    const searchText = input.value.trim();

    let resultItems = [];
    if (searchText.length > 0) {
      resultItems = localSearch.getResultItems().filter(result => fuzzyMatch(result.item, searchText));
    }

    if (searchText === '') {
      container.innerHTML = `<div class="search-result-message"></div>`;
    } else if (resultItems.length === 0) {
      container.innerHTML = `<div class="search-result-message">无结果</div>`;
    } else {
      container.innerHTML = `
        <div class="search-result-message">${resultItems.length} 个结果</div>
        <ul class="search-result-list">
          ${resultItems.map(result => result.item).join('<div class="h-line-secondary"></div>')}
        </ul>`;
    }
  }, 300);

  input.addEventListener('input', displaySearchResult);

  window.addEventListener('search:loaded', displaySearchResult);
});
