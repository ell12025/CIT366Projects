import { Injectable } from '@angular/core';

import { EventEmitter } from '@angular/core';

import { Contact } from "./contact.model";

import { MOCKCONTACTS } from "./MOCKCONTACTS";

@Injectable()
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  private contacts: Contact[] = [];

  getContacts() {
    return this.contacts.slice();
  }

  getContact() {

  }


  constructor() {
    this.contacts = MOCKCONTACTS;
  }
}
