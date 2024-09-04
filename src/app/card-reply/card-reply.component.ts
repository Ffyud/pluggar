import { Component, EventEmitter, Output } from '@angular/core';
import { Reply } from '../reply.enum';

@Component({
  selector: 'app-card-reply',
  standalone: true,
  imports: [],
  templateUrl: './card-reply.component.html',
  styleUrl: './card-reply.component.css'
})
export class CardReplyComponent {

  @Output() replyEvent = new EventEmitter<Reply>();

  onReply(reply: Reply): void {
    this.replyEvent.emit(reply);
  }

  Reply = Reply;
}
