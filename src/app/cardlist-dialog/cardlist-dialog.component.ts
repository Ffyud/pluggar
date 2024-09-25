import { Component, computed, EventEmitter, inject, Output, signal } from '@angular/core';
import { NgFor } from '@angular/common';
import { LocalstorageService } from '../localstorage.service';
import { Card } from '../card.model';
import { CardsList } from '../cardslist.model';
import { Reply } from '../reply.enum';

@Component({
  selector: 'app-cardlist-dialog',
  standalone: true,
  imports: [NgFor],
  templateUrl: './cardlist-dialog.component.html',
  styleUrl: './cardlist-dialog.component.css'
})
export class CardlistDialogComponent {

  private storageService = inject(LocalstorageService);

  listOfCardslist: CardsList[] = this.storageService.getListOfCardslist();

  protected cardsList = signal(this.listOfCardslist);

  @Output() listSelectEvent = new EventEmitter<string>();

  onListSelect(selected: string): void {
    this.listSelectEvent.emit(selected);

    // TODO close dialog
  }


}
