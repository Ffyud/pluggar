import { Component, computed, signal, Signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from "./card/card.component";
import { CardReplyComponent } from "./card-reply/card-reply.component";
import { Card } from './card.model';
import { CardStacksComponent } from "./card-stacks/card-stacks.component";
import swedishWords from './swedish-words.json';
import { Reply } from './reply.enum';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CardComponent, CardReplyComponent, CardStacksComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Pluggar';

  swedishWords: Card[] = swedishWords;

  cardList = signal(swedishWords);

  currentCard: Signal<Card> = computed(() => {
    const cards = this.cardList();
    return cards[cards.length - 1];
  });


  defaultCard: Card = {
    sideA: "a",
    sideB: "b",
  };

  cardListAnswered: WritableSignal<Card[]> = signal([]);

  handleReply(reply: Reply) {

    if(this.currentCard()) {
      this.currentCard().answer = reply;
      // this.cardListAnswered.
      // .push(this.currentCard())
  
      const currentList = this.cardListAnswered();
      
      if (Array.isArray(currentList)) {
        this.cardListAnswered.set([...currentList, this.currentCard()]);
      }

      const currentCards = this.cardList();
      const updatedCards = currentCards.filter(card => card !== this.currentCard());
  
      this.cardList.update(() => { return updatedCards });
    } else {
      console.log("Geen kaartjes meer om te beantwoorden")
    }


  }

  Reply = Reply;

}
