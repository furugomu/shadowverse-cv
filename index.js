'use strict';

const vm = new Vue({
  el: '#vue',
  data: {
    cards: [],
    actor: '水橋かおり',
  },

  computed: {
    selectedCards() {
      this.cards, this.actor;
      if (this.actor === '') return [];
      return this.cards.filter((card) => card.CV.indexOf(this.actor) >= 0);
    },
    actors() {
      return this.cards
        .map((c) => c.CV)
        .filter((cv) => cv !== '-')
        .sort()
        .reduce((a, cv) => { if (a[a.length-1] !== cv) a.push(cv); return a }, []);
    },
  }
});

const xhr = new XMLHttpRequest();
xhr.open('GET', './cards.json');
xhr.responseType = 'json';
xhr.send();
xhr.onload = () => vm.cards = xhr.response;
