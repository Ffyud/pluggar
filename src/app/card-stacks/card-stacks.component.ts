import { Component, effect, computed, input, Signal, EventEmitter, Output } from '@angular/core';
import { Card } from '../card.model';
import { Reply } from '../reply.enum';

@Component({
  selector: 'app-card-stacks',
  standalone: true,
  imports: [],
  templateUrl: './card-stacks.component.html',
  styleUrl: './card-stacks.component.css'
})
export class CardStacksComponent {

  @Output() addBackToListEvent = new EventEmitter<Card[]>();

  cards = input.required<Card[]>();

  amountNo = computed(() => this.cards().filter((card: Card) => (card.answer === Reply.NO)).length);
  amountMaybe = computed(() => this.cards().filter((card: Card) => (card.answer === Reply.MAYBE)).length);
  amountYes = computed(() => this.cards().filter((card: Card) => (card.answer === Reply.YES)).length);

  Reply = Reply;

  addBackToList(reply: Reply) {
    const listWithReply = computed(() => {
      return this.cards().filter((card: Card) => (card.answer === reply))
    })

    this.addBackToListEvent.emit(listWithReply());

  }

}
