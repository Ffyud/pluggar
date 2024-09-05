import { Component, computed, Input, Signal } from '@angular/core';
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

  @Input() cards!: Signal<Card[]>;

  // protected amountOfNo: Signal<number> = computed(() => { 
  //   return this.cards().filter((card: Card) => (card.answer === Reply.NO)).length 
  // });

  Reply = Reply;

}
