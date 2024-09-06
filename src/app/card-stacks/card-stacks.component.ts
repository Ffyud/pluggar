import { Component, effect, computed, input, Signal } from '@angular/core';
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

  cards = input.required<Card[]>();

  amountNo = computed(() => this.cards().filter((card: Card) => (card.answer === Reply.NO)).length);
  amountMaybe = computed(() => this.cards().filter((card: Card) => (card.answer === Reply.MAYBE)).length);
  amountYes = computed(() => this.cards().filter((card: Card) => (card.answer === Reply.YES)).length);

  Reply = Reply;

}
