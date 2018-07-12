import {Component, OnInit, OnDestroy} from '@angular/core';
import { Message } from "../message.model";
import { MessageService } from "../message.service";
import { Subscription } from "rxjs/internal/Subscription";

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit, OnDestroy {
  messages: Message[] = [];
  subscription: Subscription;


  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.getMessages();
    this.subscription = this.messageService.messageChangeEvent.subscribe(
      (messages: Message[]) => {
      this.messages = messages;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
