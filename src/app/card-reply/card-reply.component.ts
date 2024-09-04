import { Component } from '@angular/core';
import { Reply } from '../reply.enum';

@Component({
  selector: 'app-card-reply',
  standalone: true,
  imports: [],
  templateUrl: './card-reply.component.html',
  styleUrl: './card-reply.component.css'
})
export class CardReplyComponent {

  onReply(reply: Reply): void {
    console.log("Geklikt op ", reply)
  }

  Reply = Reply;
}
