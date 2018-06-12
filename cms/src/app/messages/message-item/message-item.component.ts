import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Message } from  "../message.model";

import {ContactService} from "../../contacts/contact.service";

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;
  messageSender: string = "";
  canEdit: boolean = false;
  @Output() messageWasSelected = new EventEmitter<void>();

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    let contact: Contact = this.contactService.getContact(this.message.sender);
    this.messageSender = contact.name;
  }

}
