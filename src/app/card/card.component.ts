import { Component, Input, Signal } from '@angular/core';
import { Card } from '../card.model';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  @Input() cardInput!: Signal<Card | undefined>; 

  protected showSideA = true;

  onClick(): void {
    console.log("Geklikt op kaartje")
    if (this.showSideA) {
      this.showSideA = false;
    } else {
      this.showSideA = true;
    }
  }
}
