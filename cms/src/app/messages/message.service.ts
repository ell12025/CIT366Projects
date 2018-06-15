import {EventEmitter, Injectable} from '@angular/core';

import { Message } from "./message.model";

import { MOCKMESSAGES } from "./MOCKMESSAGES";

@Injectable()
export class MessageService {
  messageChangeEvent = new EventEmitter<Message[]>();
  messages: Message[] = [];

  getMessages() {
    return this.messages.slice();
  }

  getMessage(id: string) {
    for(var i = 0; i < this.messages.length; i++)
    {
      if(this.messages[i].id == id)
      {
        return this.messages[i];
      }
    }
    return null;
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.messageChangeEvent.emit(this.messages.slice());
  }


  constructor() {
    this.messages = MOCKMESSAGES;
  }
}
