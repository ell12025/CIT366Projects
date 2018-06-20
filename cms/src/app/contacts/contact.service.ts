import { Injectable } from '@angular/core';

import { EventEmitter } from '@angular/core';

import { Contact } from "./contact.model";

import { MOCKCONTACTS } from "./MOCKCONTACTS";

@Injectable()
export class ContactService {
  contactChangeEvent = new EventEmitter<Contact>();
  contactSelectedEvent = new EventEmitter<Contact>();
  contacts: Contact[] = [];

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

  constructor() {
    this.contacts = MOCKCONTACTS;
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
    this.contactChangeEvent.emit(this.contacts.slice());
  }

}
