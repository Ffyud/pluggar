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
  protected cooldown = false;

  onReply(reply: Reply): void {
    if (reply === Reply.NO && this.cooldown) {
      return;
    }
    this.replyEvent.emit(reply);

    if (reply === Reply.NO) {
      this.cooldown = true;
      setTimeout(() => {
        this.cooldown = false;
      }, 2000);
    }
  }

  Reply = Reply;
}
