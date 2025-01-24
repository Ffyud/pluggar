import { Component, computed, input, EventEmitter, Output } from '@angular/core';
import { NgFor } from '@angular/common';
import { Card } from '../card.model';
import { Reply } from '../reply.enum';

@Component({
  selector: 'app-card-stacks',
  standalone: true,
  imports: [NgFor],
  templateUrl: './card-stacks.component.html',
  styleUrl: './card-stacks.component.css'
})
export class CardStacksComponent {

  @Output() addBackToListEvent = new EventEmitter<Reply>();

  cardsList = input.required<Card[]>();
  listTitle = input.required<string>();

  amountWithoutAnswer = computed(() => this.cardsList().filter((card: Card) => !card.answer).length);
  amountNo = computed(() => this.cardsList().filter((card: Card) => (card.answer === Reply.NO)).length);
  amountMaybe = computed(() => this.cardsList().filter((card: Card) => (card.answer === Reply.MAYBE)).length);
  amountYes = computed(() => this.cardsList().filter((card: Card) => (card.answer === Reply.YES)).length);

  percentage(): number {
    const amountYes = this.cardsList().filter((card: Card) => (card.answer === Reply.YES)).length;
    const amountTotal = this.cardsList().length;
    return (amountYes / amountTotal) * 100
  }

  addBackToList(reply: Reply) {
    this.addBackToListEvent.emit(reply);
  }

  Reply = Reply;


}
