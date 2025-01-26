import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { LocalstorageService } from '../localstorage.service';
import { CardsList } from '../cardslist.model';

@Component({
  selector: 'app-cardlist-select',
  standalone: true,
  imports: [],
  templateUrl: './cardlist-select.component.html',
  styleUrl: './cardlist-select.component.css'
})
export class CardlistSelectComponent {

  @Output() listSelectEvent = new EventEmitter<string>();

  private readonly storageService = inject(LocalstorageService);

  listOfCardslist: CardsList[] = this.storageService.getListOfCardslist();

  protected cardsList = signal(this.listOfCardslist);

  percentageAnsweredYes(cardsList: CardsList) {
    const amountAnsweredYes = this.storageService.getNumberOfCardsRepliedYes(cardsList.name);
    const amountTotal = cardsList.cardList.length;

    if (amountAnsweredYes === 0 || amountTotal === 0) {
      return 0
    }
    return Math.round((amountAnsweredYes / amountTotal) * 100);
  }

  onListSelect(selected: string): void {
    this.listSelectEvent.emit(selected);
  }
}
