import { Injectable } from '@angular/core';
import { CardsList } from './cardslist.model';
import { Card } from './card.model';

import swedishWords from './data/swedish-words.json';
import swedishJobs from './data/swedish-jobs.json';
import swedishVerbs from './data/swedish-verbs.json';
import swedishEverydayObjects from './data/swedish-everyday-objects.json';
import swedishExpressions from './data/swedish-expressions.json';
import swedishTraffic from './data/swedish-traffic.json';
import swedishEducation from './data/swedish-education.json';
import swedishFood from './data/swedish-food.json';
import swedishPersonality from './data/swedish-personality.json';
import swedishBody from './data/swedish-body.json';
import { Reply } from './reply.enum';

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
  swedishFood: Card[] = swedishFood;
  swedishPersonality: Card[] = swedishPersonality;
  swedishBody: Card[] = swedishBody;

  cardsList: CardsList[] = [
    {
      name: 'Willekeurige woorden',
      cardList: this.swedishWords
    },
    {
      name: 'Werkwoorden',
      cardList: this.swedishVerbs
    },
    {
      name: 'Banen',
      cardList: this.swedishJobs
    },
    {
      name: 'Alledaagse objecten',
      cardList: this.swedishEverydayObjects
    },
    {
      name: 'Alledaagse uitdrukkingen',
      cardList: this.swedishExpressions
    },
    {
      name: 'Verkeer',
      cardList: this.swedishTraffic
    },
    {
      name: 'Onderwijs',
      cardList: this.swedishEducation
    },
    {
      name: 'Voedsel',
      cardList: this.swedishFood
    },
    {
      name: 'Emoties en persoonlijkheid',
      cardList: this.swedishPersonality
    },
    {
      name: 'Lichaam en gezondheid',
      cardList: this.swedishBody
    }
  ];

  getListOfCardslist(): CardsList[] {
    return this.cardsList;
  }

  private getNumberOfCards(listName: string): number {
    return this.getCards(listName).length;
  }

  getNumberOfCardsRepliedYes(listName: string): number {
    const answeredCards: Card[] = this.getCards(listName).filter((card: Card) => card.answer === Reply.YES);
    return answeredCards.length;
  }

  getTotalPercentageOfCardsRepliedYes(): number {
    const eachListTotalRepliedYes: number[] = this.getListOfCardslist().map((cardsList) => {
      return this.getNumberOfCardsRepliedYes(cardsList.name)
    })

    const eachListTotal: number[] = this.getListOfCardslist().map((cardsList) => {
      return this.getNumberOfCards(cardsList.name)
    })
    

    const totalRepliedYes = eachListTotalRepliedYes.reduce((accumulator, currentValue) => {
      return accumulator + currentValue
    },0);

    const total = eachListTotal.reduce((accumulator, currentValue) => {
      return accumulator + currentValue
    },0);

    if (totalRepliedYes === 0 || total === 0) {
      return 0
    }
    return Math.round((totalRepliedYes / total) * 100);
  }



  getSelectedList(): string {
    const selectedList = localStorage.getItem('selectedList');
    if (selectedList) {
      return selectedList;
    }
    return '';
  }

  getCards(listName: string): Card[] {
    if (listName !== '') {
      localStorage.setItem('selectedList', listName);
    }

    const cardsInLocalStorage = localStorage.getItem(listName);
    if (cardsInLocalStorage) {
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
