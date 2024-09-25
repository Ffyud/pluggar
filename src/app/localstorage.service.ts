import { Injectable, signal } from '@angular/core';
import { CardsList } from './cardslist.model';
import { Card } from './card.model';

import swedishWords from './swedish-words.json';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  swedishWords: Card[] = swedishWords;

  constructor() { } 

  getListOfCardslist(): CardsList[] {
    console.log('getListOfCardslist')
    // return JSON.parse(localStorage.getItem(key));
    // Return default data if no localstorage is found
      return [
        {
          name: 'Zweedse woorden 1',
          cardList: this.swedishWords
        },
        {
          name: 'Zweedse woorden 2',
          cardList: this.swedishWords
        },
        {
          name: 'Europese steden',
          cardList: this.swedishWords
        }
      ];
  }

  getCards(name: string): Card[] {
    console.log(name);
      return swedishWords
  }

  updateListOfCardsLists(): void {

  }
}
