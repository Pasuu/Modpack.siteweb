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

  function calculateMatchScore(item, keywords) {
    let score = 0;
    keywords.forEach(keyword => {
      const regex = new RegExp(keyword, 'gi');
      const matches = item.match(regex);
      if (matches) {
        score += matches.length;
      }
    });
    return score;
  }

  const displaySearchResult = debounce(() => {
    if (!localSearch.isfetched) return;
    const searchText = input.value.trim().toLowerCase();
    const keywords = searchText.split(/[-\s]+/);
    let resultItems = [];

    if (searchText.length > 0) {
      resultItems = localSearch.getResultItems(keywords);
      resultItems = resultItems.map(result => {
        return {
          item: result.item,
          score: calculateMatchScore(result.item, keywords)
        };
      }).sort((a, b) => b.score - a.score); 
    }

    if (keywords.length === 1 && keywords[0] === '') {
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

  if (searchConfig.trigger === 'auto') {
    input.addEventListener('input', displaySearchResult);
  } else {
    input.addEventListener('keypress', event => {
      if (event.key === 'Enter') {
        displaySearchResult();
      }
    });
  }

  window.addEventListener('search:loaded', displaySearchResult);
});
