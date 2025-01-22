import { Component, EventEmitter, inject, input, Output, signal } from '@angular/core';
import { NgFor } from '@angular/common';
import { LocalstorageService } from '../localstorage.service';
import { CardsList } from '../cardslist.model';

@Component({
  selector: 'app-cardlist-dialog',
  standalone: true,
  imports: [NgFor],
  templateUrl: './cardlist-dialog.component.html',
  styleUrl: './cardlist-dialog.component.css'
})
export class CardlistDialogComponent {

  isOpen = input.required<boolean>();

  @Output() listSelectEvent = new EventEmitter<string>();

  private readonly storageService = inject(LocalstorageService);

  listOfCardslist: CardsList[] = this.storageService.getListOfCardslist();

  protected cardsList = signal(this.listOfCardslist);

  onListSelect(selected: string): void {
    this.listSelectEvent.emit(selected);
  }


}
