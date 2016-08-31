'use strict';

var title = document.title;

var vm = new Vue({
  el: '#vue',
  data: {
    cards: [],
    query: '水橋かおり'
  },

  computed: {
    selectedCards: function selectedCards() {
      var _this = this;

      this.cards, this.query;
      if (this.query === '') return [];
      return this.cards.filter(function (card) {
        return card.CV.indexOf(_this.query) >= 0 || card.name.indexOf(_this.query) >= 0;
      });
    },
    actors: function actors() {
      return this.cards.map(function (c) {
        return c.CV;
      }).filter(function (cv) {
        return cv !== '-';
      }).sort().reduce(function (a, cv) {
        if (a[a.length - 1] !== cv) a.push(cv);return a;
      }, []);
    }
  },
  watch: {
    query: function query(val) {
      if (val) {
        document.title = val + ' - ' + title;
        history.replaceState(null, document.title, '?' + val);
      }
    }
  }
});

var xhr = new XMLHttpRequest();
xhr.open('GET', './cards.json');
xhr.responseType = 'json';
xhr.send();
xhr.onload = function () {
  return vm.cards = xhr.response.filter(function (card) {
    return card.CV !== '-';
  });
};

if (location.search.length > 1) {
  vm.query = decodeURIComponent(location.search.substring(1));
}
