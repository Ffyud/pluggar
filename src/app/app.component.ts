import { Component, computed, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from "./card/card.component";
import { CardReplyComponent } from "./card-reply/card-reply.component";
import { Card } from './card.model';
import { CardStacksComponent } from "./card-stacks/card-stacks.component";
import swedishWords from './swedish-words.json';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CardComponent, CardReplyComponent, CardStacksComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Pluggar';

  currentCard: Signal<Card | undefined> = computed(() => {
    console.log(this.cardList)
    if(this.cardList.length !== 0) {
      return this.cardList.pop();
    }

    return;
  });

  cardList: Card[] = swedishWords;


  cardListAnswered: Signal<Card[]> = computed(() => {
    return []
  });

}
