import { Injectable, signal } from '@angular/core';
import { CardsList } from './cardslist.model';
import { Card } from './card.model';

import swedishWords from './swedish-words.json';
import worldCapitals from './world-capitals.json';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  swedishWords: Card[] = swedishWords;
  worldCapitals: Card[] = worldCapitals;


  cardsList: CardsList[] = [
    {
      name: 'Zweedse woorden 1',
      cardList: this.swedishWords
    },
    {
      name: 'Zweedse woorden 2',
      cardList: this.swedishWords
    },
    {
      name: 'Hoofdsteden van de wereld',
      cardList: this.worldCapitals
    }
  ];

  constructor() { } 

  getListOfCardslist(): CardsList[] {
    console.log('getListOfCardslist')
      return this.cardsList;
  }

  getCards(name: string): Card[] {
    const cardItem = this.cardsList.find(item => item.name === name);
    console.log(cardItem?.cardList)
    return cardItem ? cardItem.cardList : [];
  }

  updateCardsWithAnswer(): void {
    // TODO opslaan van lijst met antwoorden 
   // return JSON.parse(localStorage.getItem(key));
  }
}
