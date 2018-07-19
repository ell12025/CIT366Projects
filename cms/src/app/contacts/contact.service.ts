import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Contact } from "./contact.model";
import { Subject } from "rxjs/internal/Subject";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();
  contacts: Contact[] = [];
  maxContactId: number;
  contactsListClone: Contact[];



  // Class constructor
  constructor(private http: HttpClient) {
    this.getContacts();
  }


  // Get all contacts
  getContacts() {
    // if(this.contacts) {
    //   return this.contacts.slice();
    // }

    this.http.get<Contact[]>('https://cit366-c75e2.firebaseio.com/contacts.json').subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
        this.maxContactId = this.getMaxId();
        this.contacts = this.contacts.sort(this.compare);
        this.contactListChangedEvent.next(this.contacts.slice());
        return this.contacts.slice();
      },
      (error: any) => {
        console.log("HTTP error: " + error.msgText);
      }
    );
  }


  // Compare function that is called by the getContacts()
  compare(contactA: Contact, contactB: Contact) {
    const conA = contactA.name.toUpperCase();
    const conB = contactB.name.toUpperCase();
    if(conA < conB) {
      return -1;
    }
    if(conA > conB) {
      return 1;
    }
    return 0;
  }


  // Store added contacts in database
  storeContacts() {
    const strContacts = JSON.stringify(this.contacts);
    const header = new HttpHeaders( {
      'Content-Type': 'application/json'
    });

    return this.http.put('https://cit366-c75e2.firebaseio.com/contacts.json',
      strContacts,
      {headers: header}).subscribe(
      () => this.contactListChangedEvent.next(this.contacts.slice()));
  }



  // Get a single contact based on ID
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







  // Get contact max ID
  getMaxId(): number {
    var maxId = 0;

    for(var i = 0; i < this.contacts.length; i++)
    {
      var currentId = parseInt(this.contacts[i].id);
      if(currentId > maxId)
      {
        maxId = currentId;
      }
    }
    return maxId;
  }





  // Add a new contact
  addContact(newContact: Contact) {
    if(newContact === null || newContact === undefined)
    {
      return;
    }

    this.maxContactId++;
    newContact.id = String(this.maxContactId);
    this.contacts.push(newContact);
    this.contactsListClone = this.contacts.slice();
    // this.contactListChangedEvent.next(this.contactsListClone);
    this.storeContacts();
  }




  // Update a contact
  updateContact(originalContact: Contact, newContact: Contact) {
    if(originalContact === null || originalContact === undefined
      || newContact === null || newContact === undefined)
    {
      return;
    }

    var pos = this.contacts.indexOf(originalContact);

    if(pos < 0 )
    {
      return;
    }

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.contactsListClone = this.contacts.slice();
    // this.contactListChangedEvent.next(this.contactsListClone);
    this.storeContacts();
  }




  // Delete a contact when 'delete' is clicked
  deleteContact(contact: Contact) {
    if (contact === null) {
      return;
    }

    var pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }

    this.contacts.splice(pos,1);
    this.contactsListClone = this.contacts.slice();
    // this.contactListChangedEvent.next(this.contactsListClone);
    this.storeContacts();
  }




}
