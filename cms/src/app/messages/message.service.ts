import { Injectable } from '@angular/core';

import { Message } from "./message.model";

import { MOCKMESSAGES } from "./MOCKMESSAGES";

@Injectable()
export class MessageService {
  private messages: Message[] = [];

  getMessages() {
    return this.messages.slice();
  }

  getMessage() {

  }

  constructor() {
    this.messages = MOCKMESSAGES;
  }
}
