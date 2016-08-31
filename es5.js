'use strict';

var title = document.title;

var vm = new Vue({
  el: '#vue',
  data: {
    cards: [],
    actor: '水橋かおり'
  },

  computed: {
    selectedCards: function selectedCards() {
      var _this = this;

      this.cards, this.actor;
      if (this.actor === '') return [];
      return this.cards.filter(function (card) {
        return card.CV.indexOf(_this.actor) >= 0;
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
    actor: function actor(val) {
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
  return vm.cards = xhr.response;
};

if (location.search.length > 1) {
  vm.actor = decodeURIComponent(location.search.substring(1));
}
