import { Injectable, signal } from '@angular/core';
import { CardsList } from './cardslist.model';
import { Card } from './card.model';

import swedishWords from './data/swedish-words.json';
import swedishJobs from './data/swedish-jobs.json';
import swedishVerbs from './data/swedish-verbs.json';
import swedishEverydayObjects from './data/swedish-everyday-objects.json';
import swedishExpressions from './data/swedish-expressions.json';
import swedishTraffic from './data/swedish-traffic.json';
import swedishEducation from './data/swedish-education.json';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  swedishWords: Card[] = swedishWords;
  swedishVerbs: Card[] = swedishVerbs;
  swedishJobs: Card[] = swedishJobs;
  swedishEverydayObjects: Card[] = swedishEverydayObjects;
  swedishExpressions: Card[] = swedishExpressions;
  swedishTraffic: Card[] = swedishTraffic; 
  swedishEducation: Card[] = swedishEducation;

  cardsList: CardsList[] = [
    {
      name: '🇸🇪 Willekeurige woorden',
      cardList: this.swedishWords
    },
    {
      name: '🇸🇪 Werkwoorden',
      cardList: this.swedishVerbs
    },
    {
      name: '👷‍♀️ Banen',
      cardList: this.swedishJobs
    },
    {
      name: '☕ Alledaagse objecten',
      cardList: this.swedishEverydayObjects
    },
    {
      name: '💬 Alledaagse uitdrukkingen',
      cardList: this.swedishExpressions
    },
    {
      name: '🚃 Verkeer',
      cardList: this.swedishTraffic
    },
    {
      name: '🧑‍🏫 Onderwijs',
      cardList: this.swedishEducation
    }
  ];

  constructor() { }

  getListOfCardslist(): CardsList[] {
    return this.cardsList;
  }

  getSelectedList(): string {
    const selectedList = localStorage.getItem('selectedList');
    if(selectedList) {
      return selectedList;
    }
    return '';
  }

  getCards(listName: string): Card[] {
    if(listName !== '') {
      localStorage.setItem('selectedList', listName);
    }

    const cardsInLocalStorage = localStorage.getItem(listName);
    if(cardsInLocalStorage) {
      const cards: CardsList = JSON.parse(cardsInLocalStorage);
      return cards.cardList;
    }

    const cardItem = this.cardsList.find(item => item.name === listName);
    return cardItem ? cardItem.cardList : [];
  }

  saveCards(cards: Card[], listName: string): void {
    const cardsList: CardsList = { name: listName, cardList: cards }
    localStorage.setItem(listName, JSON.stringify(cardsList));
  }

}
