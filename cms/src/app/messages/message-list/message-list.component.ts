import {Component, OnInit, OnDestroy} from '@angular/core';
import {Message} from "../message.model";
import {MessageService} from "../message.service";
import {Subscription} from "rxjs/internal/Subscription";
import {ContactService} from "../../contacts/contact.service";

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit, OnDestroy {
  messages: Message[] = [];
  messageSubscription: Subscription;


  constructor(private messageService: MessageService, private contactService: ContactService) {
  }

  ngOnInit() {
    this.messageService.getMessages();
    this.contactService.getContacts();


    this.messageSubscription = this.messageService.messageChangeEvent.subscribe(
          (messages: Message[]) => {
            this.messages = messages;
          });

  }

  ngOnDestroy() {
    this.messageSubscription.unsubscribe();

  }


}
