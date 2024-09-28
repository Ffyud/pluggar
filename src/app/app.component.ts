import { Component, computed, signal, Signal, WritableSignal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from "./card/card.component";
import { CardReplyComponent } from "./card-reply/card-reply.component";
import { Card } from './card.model';
import { CardStacksComponent } from "./card-stacks/card-stacks.component";
import { Reply } from './reply.enum';
import { LocalstorageService } from './localstorage.service';
import { CardlistDialogComponent } from "./cardlist-dialog/cardlist-dialog.component";
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DecimalPipe, CardComponent, CardReplyComponent, CardStacksComponent, CardlistDialogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Pluggar';

  private storageService = inject(LocalstorageService);

  selectedWords: Card[] = this.storageService.getCards(this.storageService.getSelectedList());
  selectedListName = this.storageService.getSelectedList();

  isDialogOpen = signal(false);

  listName = signal(this.selectedListName);
  cardList = signal(this.selectedWords);

  currentCard: Signal<Card> = computed(() => {
    const cards: Card[] = this.cardList().filter((card: Card) => (!card.answer));
    return cards[cards.length - 1];
  });

  percentage(cardsList: Card[]): number {
    const amountYes = cardsList.filter((card: Card) => (card.answer === Reply.YES)).length;
    const amountTotal = cardsList.length;
    return (amountYes / amountTotal) * 100
  }

  addBackToListEvent(reply: Reply): void {
    console.log("Gegegeven antwoord verwijderd:", reply);
    let clearedCards: Card[] = this.cardList().map((card: Card) => {
      if (card.answer === reply) {
        return { ...card, answer: undefined };
      }
      return card;
    });

    this.cardList.update(() => {
      return clearedCards
    });

    this.storageService.saveCards(this.cardList(), this.listName());
  }

  handleReply(reply: Reply): void {
    if (this.currentCard()) {
      console.log('Antwoord gegeven op kaart:', this.currentCard().sideA, reply);
      this.currentCard().answer = reply;

      const currentList = this.cardList().filter((card: Card) => (card !== this.currentCard()));

      if (Array.isArray(currentList)) {
        this.cardList.set([...currentList, this.currentCard()]);
      }

      this.storageService.saveCards(this.cardList(), this.listName());
    }
  }

  handleListSelect(name: string): void {
    this.listName.update(() => {
      return name;
    })

    this.cardList.update(() => {
      return this.storageService.getCards(name);
    });

    this.isDialogOpen.update(() => {
      return false;
    });
  }

  onHeaderClick(): void {
    this.isDialogOpen.update(() => {
      if (this.isDialogOpen()) {
        return false;
      }
      return true;

    });
  }

  Reply = Reply;

}
