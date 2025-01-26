import { Component, computed, signal, Signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from "./card/card.component";
import { CardReplyComponent } from "./card-reply/card-reply.component";
import { Card } from './card.model';
import { CardStacksComponent } from "./card-stacks/card-stacks.component";
import { Reply } from './reply.enum';
import { LocalstorageService } from './localstorage.service';
import { CardlistSelectComponent } from "./cardlist-select/cardlist-select.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CardComponent, CardReplyComponent, CardStacksComponent, CardlistSelectComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Pluggar';

  private readonly storageService = inject(LocalstorageService);

  protected selectedWords: Card[] = this.storageService.getCards(this.storageService.getSelectedList());
  protected selectedlistTitle = this.storageService.getSelectedList();

  protected isDialogOpen = signal(false);
  protected replyIsNo = signal(false);
  protected listTitle = signal(this.selectedlistTitle);
  protected cardList = signal(this.selectedWords);

  currentCard: Signal<Card> = computed(() => {
    const cards: Card[] = this.cardList().filter((card: Card) => (!card.answer));
    return cards[cards.length - 1];
  });

  addBackToListEvent(reply: Reply): void {
    console.log("Gegegeven antwoord verwijderd:", reply);
    const clearedCards: Card[] = this.cardList().map((card: Card) => {
      if (card.answer === reply) {
        return { ...card, answer: undefined };
      }
      return card;
    });

    this.cardList.update(() => {
      return clearedCards
    });

    this.storageService.saveCards(this.cardList(), this.listTitle());
  }

  handleReply(reply: Reply): void {
    console.log('Antwoord gegeven op kaart:', this.currentCard().sideA, reply);
    if (reply === Reply.NO) {
      this.replyIsNo.update(() => { return true });
      console.log('Antwoord is nee, laat andere kant zien.')

      setTimeout(() => {
        this.replyIsNo.update(() => { return false });

        setTimeout(() => {
          if(!this.replyIsNo()) {
            this.updateCurrentCard(this.currentCard(), reply)
          }
        }, 1000)
      }, 1000);
    } else {
      this.replyIsNo.update(() => { return false });
      this.updateCurrentCard(this.currentCard(), reply)
    }
  }

  private updateCurrentCard(currentCard: Card, reply: Reply) {
    if (currentCard) {
      currentCard.answer = reply;

      const currentList = this.cardList().filter((card: Card) => (card !== currentCard));

      if (Array.isArray(currentList)) {
        this.cardList.set([...currentList, currentCard]);
      }

      this.storageService.saveCards(this.cardList(), this.listTitle());
    }
  }

  handleListSelect(name: string): void {
    this.listTitle.update(() => {
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
