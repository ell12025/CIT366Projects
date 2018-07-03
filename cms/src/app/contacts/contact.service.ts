import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Contact } from "./contact.model";
import { MOCKCONTACTS } from "./MOCKCONTACTS";
import { Subject } from "rxjs/internal/Subject";
import { DocumentService } from "../documents/document.service";

@Injectable()
export class ContactService {
  // contactChangeEvent = new EventEmitter<Contact[]>();
  contactSelectedEvent = new EventEmitter<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();
  contacts: Contact[];

  getContacts() {
    return this.contacts.slice();
  }

  getContact(id: string) {
    for(var i = 0; i < this.contacts.length; i++)
    {
      if(this.contacts[i].id == id)
      {
        return this.contacts[i];
      }
    }
    return null;
  }

  deleteContact(contact: Contact) {
    if (contact === null) {
      return;
    }

    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }

    this.contacts.splice(pos,1);
    this.contactListChangedEvent.next(this.contacts.slice());
  }

  addDocument(newDocument: Document) {
    if(newDocument === null )
    {
      return;
    }


  }

  constructor(private documentService: DocumentService) {
    this.contacts = MOCKCONTACTS;
  }

}
