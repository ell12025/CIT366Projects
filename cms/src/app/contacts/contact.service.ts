import { Injectable } from '@angular/core';

import { EventEmitter } from '@angular/core';

import { Contact } from "./contact.model";

import { MOCKCONTACTS } from "./MOCKCONTACTS";

@Injectable()
export class ContactService {
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
}
