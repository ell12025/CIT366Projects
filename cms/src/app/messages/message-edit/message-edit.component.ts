import {Component, ElementRef, OnInit, ViewChild, EventEmitter, Output} from '@angular/core';

import { Message} from "../message.model";

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  currentSender: string = "Elizabeth Lim";
  @ViewChild('subjectInput') subjectInputRef: ElementRef;
  @ViewChild('messageInput') messageInputRef: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();

  constructor() { }

  ngOnInit() {
  }

  onSendMessage() {
    const subject = this.subjectInputRef.nativeElement.value;
    const message = this.messageInputRef.nativeElement.value;
    const newMessage = new Message(2, subject, message, this.currentSender);
    this.addMessageEvent.emit(newMessage);
  }

}
