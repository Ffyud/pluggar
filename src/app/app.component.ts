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

  selectedWords: Card[] = this.storageService.getCards('Zweedse woorden 1');
  selectedListName = 'Zweedse woorden 1';

  isDialogOpen = signal(false);

  listName = signal(this.selectedListName);
  cardList = signal(this.selectedWords);

  currentCard: Signal<Card> = computed(() => {
    const cards = this.cardList();
    return cards[cards.length - 1];
  });

  defaultCard: Card = {
    sideA: "a",
    sideB: "b",
  };

  cardListAnswered: WritableSignal<Card[]> = signal([]);

  /**
   * Adds cards back to the original card list
   * @param cardsBack 
   */
  addBackToListEvent(cardsBack: Card[]): void {
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

    this.storageService.saveCardsWithAnswer(this.cardList(), this.listName());
  }

  handleReply(reply: Reply): void {
    if (this.currentCard()) {
      this.currentCard().answer = reply;

      const currentList = this.cardListAnswered();

      if (Array.isArray(currentList)) {
        this.cardListAnswered.set([...currentList, this.currentCard()]);
      }

      const currentCards = this.cardList();
      const updatedCards = currentCards.filter(card => card !== this.currentCard());

      this.cardList.update(() => { return updatedCards });

      this.storageService.saveCardsWithAnswer(this.cardList(), this.listName());
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
      return true;
    });
    console.log(this.isDialogOpen())
  }

  Reply = Reply;

}
