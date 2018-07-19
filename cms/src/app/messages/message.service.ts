import { EventEmitter, Injectable } from '@angular/core';
import { Message } from "./message.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class MessageService {
  messageChangeEvent = new EventEmitter<Message[]>();
  messages: Message[] = [];
  maxMessageId: number;


  // Class constructor
  constructor(private http: HttpClient) {

    this.getMessages();

  }


  // Get messages
  getMessages() {
    // return this.messages.slice();

    this.http.get<Message[]>('https://cit366-c75e2.firebaseio.com/messages.json').subscribe(
      (messages: Message[]) => {
        this.messages = messages;
        this.maxMessageId = this.getMaxId();
        this.messageChangeEvent.emit(this.messages.slice());
        console.log(this.messages);
      },
      (error: any) => {
        console.log("HTTP error: " + error.msgText);
      }
    );
  }


  // Save messages
  storeMessages() {
    const strMessages = JSON.stringify(this.messages);
    const header = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.put('https://cit366-c75e2.firebaseio.com/messages.json',
      strMessages,
      {headers: header}).subscribe(
      () => this.messageChangeEvent.emit(this.messages.slice()));
  }

  // getMessage(id: string) {
  //   for(var i = 0; i < this.messages.length; i++)
  //   {
  //     if(this.messages[i].id == id)
  //     {
  //       return this.messages[i];
  //     }
  //   }
  //   return null;
  // }


  // Get max ID
  getMaxId():number {
    var maxId = 0;

    for(var i = 0; i < this.messages.length; i++)
    {
      var currentId = parseInt(this.messages[i].id);
      if(currentId > maxId)
      {
        maxId = currentId;
      }
    }
    return maxId;
  }


  // Add a message
  addMessage(message: Message) {
    this.maxMessageId++;
    message.id = String(this.maxMessageId);
    this.messages.push(message);
    // this.messageChangeEvent.emit(this.messages.slice());
    this.storeMessages();
  }

}
