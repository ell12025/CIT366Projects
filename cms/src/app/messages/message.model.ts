export class Message {
  public messageId: number ;
  public messageSubject: string;
  public msgText: string;
  public sender: string;


  constructor(messageId: number, messageSubject: string, msgText: string, sender: string) {
    this.messageId = messageId;
    this.messageSubject = messageSubject;
    this.msgText = msgText;
    this.sender = sender;

  }
}
