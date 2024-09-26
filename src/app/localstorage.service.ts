import { Injectable, signal } from '@angular/core';
import { CardsList } from './cardslist.model';
import { Card } from './card.model';

import swedishWords from './swedish-words.json';
import swedishJobs from './swedish-jobs.json';
import swedishVerbs from './swedish-verbs.json';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  swedishWords: Card[] = swedishWords;
  swedishVerbs: Card[] = swedishVerbs;
  swedishJobs: Card[] = swedishJobs;


  cardsList: CardsList[] = [
    {
      name: 'Zweedse woorden 1',
      cardList: this.swedishWords
    },
    {
      name: 'Zweedse werkwoorden',
      cardList: this.swedishVerbs
    },
    {
      name: 'Zweedse banen',
      cardList: this.swedishJobs
    },
    {
      name: 'Test',
      cardList: [
        { "sideA": "kaartje 1", "sideB": "zijn" },
        { "sideA": "kaartje 2", "sideB": "zijn" }
      ]
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
