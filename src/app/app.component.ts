import { Component, computed, signal, Signal, WritableSignal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from "./card/card.component";
import { CardReplyComponent } from "./card-reply/card-reply.component";
import { Card } from './card.model';
import { CardStacksComponent } from "./card-stacks/card-stacks.component";
import { Reply } from './reply.enum';
import { LocalstorageService } from './localstorage.service';
import { CardlistDialogComponent } from "./cardlist-dialog/cardlist-dialog.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CardComponent, CardReplyComponent, CardStacksComponent, CardlistDialogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Pluggar';

  private storageService = inject(LocalstorageService);

  swedishWords: Card[] = this.storageService.getCards('Zweedse lijst 1');

  cardList = signal(this.swedishWords);

  currentCard: Signal<Card> = computed(() => {
    const cards = this.cardList();
    return cards[cards.length - 1];
  });

  defaultCard: Card = {
    sideA: "a",
    sideB: "b",
  };

  cardListAnswered: WritableSignal<Card[]> = signal([]);

  addBackToListEvent(cardsBack: Card[]) {
    const currentCardList: Card[] = this.cardList();
    
    const completeCardList: Card[] = [
      ...cardsBack, 
      ...currentCardList
    ];

    const newCardsAnswered: Card[] = this.cardListAnswered().filter((card: Card) => !cardsBack.includes(card));
    
    this.cardListAnswered.update(() => {
      return newCardsAnswered;
    })

    this.cardList.update(() => {
      return completeCardList
    });

  }

  handleReply(reply: Reply) {
    if (this.currentCard()) {
      this.currentCard().answer = reply;

      const currentList = this.cardListAnswered();

      if (Array.isArray(currentList)) {
        this.cardListAnswered.set([...currentList, this.currentCard()]);
      }

      const currentCards = this.cardList();
      const updatedCards = currentCards.filter(card => card !== this.currentCard());

      this.cardList.update(() => { return updatedCards });
    } else {
      console.log("Geen kaartjes meer om te beantwoorden")
    }
  }

  handleListSelect(selection: string) {
    console.log("Stapel gekozen", selection);
  }

  Reply = Reply;

}
