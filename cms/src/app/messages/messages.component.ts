import { Component, OnInit } from '@angular/core';
import { MessageService } from "./message.service";
import { ContactService } from "../contacts/contact.service";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  providers: [MessageService]
})
export class MessagesComponent implements OnInit {

  constructor(private contactService: ContactService, private messageService: MessageService) {
  }

  ngOnInit() {
  }

}
