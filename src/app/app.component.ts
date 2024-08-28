import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from "./card/card.component";
import { CardReplyComponent } from "./card-reply/card-reply.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CardComponent, CardReplyComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Pluggar';
}
