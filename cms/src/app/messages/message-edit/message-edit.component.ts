import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import { Message} from "../message.model";

import { MessageService } from "../message.service";

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  currentSender: string = "Elizabeth Lim";
  @ViewChild('subjectInput') subjectInputRef: ElementRef;
  @ViewChild('messageInput') messageInputRef: ElementRef;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
  }

  onSendMessage() {
    const subject = this.subjectInputRef.nativeElement.value;
    const message = this.messageInputRef.nativeElement.value;
    const newMessage = new Message('2', subject, message, this.currentSender);
    this.messageService.addMessage(newMessage);

  }

}
