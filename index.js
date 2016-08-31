'use strict';

const title = document.title;

const vm = new Vue({
  el: '#vue',
  data: {
    cards: [],
    query: '水橋かおり',
  },

  computed: {
    selectedCards() {
      this.cards, this.query;
      if (this.query === '') return [];
      return this.cards.filter((card) =>
        card.CV.indexOf(this.query) >= 0 || card.name.indexOf(this.query) >= 0);
    },
    actors() {
      return this.cards
        .map((c) => c.CV)
        .filter((cv) => cv !== '-')
        .sort()
        .reduce((a, cv) => { if (a[a.length-1] !== cv) a.push(cv); return a }, []);
    },
  },
  watch: {
    query: (val) => {
      if (val) {
        document.title = `${val} - ${title}`;
        history.replaceState(null, document.title, `?${val}`);
      }
    },
  },
});

const xhr = new XMLHttpRequest();
xhr.open('GET', './cards.json');
xhr.responseType = 'json';
xhr.send();
xhr.onload = () => vm.cards = xhr.response.filter((card) => card.CV !== '-');

if (location.search.length > 1) {
  vm.query = decodeURIComponent(location.search.substring(1));
}
