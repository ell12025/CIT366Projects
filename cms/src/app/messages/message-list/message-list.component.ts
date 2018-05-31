import {Component, OnInit} from '@angular/core';

import { Message } from "../message.model";

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [

    new Message(1, "How are you?", "The weather has been very cold", "DJ"),

    new Message(2, "Class schedule", "What is your class schedule for our project", "April"),

    new Message(3, "Summer break", "When is the last day of classes before the summer break?", "Ben")
  ];


  constructor() { }

  ngOnInit() {
  }

  onAddMessage(message: Message) {
    this.messages.push(message);

  }


}
