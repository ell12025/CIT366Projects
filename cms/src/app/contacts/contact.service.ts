import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Contact } from "./contact.model";
import { MOCKCONTACTS } from "./MOCKCONTACTS";
import { Subject } from "rxjs/internal/Subject";
import { Document } from "../documents/document.model";
import { DocumentService } from "../documents/document.service";

@Injectable()
export class ContactService {
  // contactChangeEvent = new EventEmitter<Contact[]>();
  contactSelectedEvent = new EventEmitter<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();
  contacts: Contact[];
  documentsListClone: Document[];

  constructor(private documentService: DocumentService) {
    this.contacts = MOCKCONTACTS;
  }

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
    if(newDocument === null || newDocument === undefined )
    {
      return;
    }

    this.documentService.maxDocumentId++;
    newDocument.id = String(this.documentService.maxDocumentId);
    this.documentService.documents.push(newDocument);
    this.documentsListClone = this.documentService.documents.slice();
    this.documentService.documentListChangedEvent.next(this.documentsListClone);

  }


  updateDocument(originalDocument: Document, newDocument: Document) {
    if(originalDocument === null || originalDocument === undefined ||
      newDocument === null || newDocument === undefined)
    {
      return;
    }

    var pos;
    pos = this.documentService.documents.indexOf(originalDocument)

    if(pos < 0)
    {
      return;
    }

    newDocument.id = originalDocument.id;
    this.documentService.documents[pos] = newDocument;
    this.documentsListClone = this.documentService.documents.slice();
    this.documentService.documentListChangedEvent.next(this.documentsListClone);
  }



  deleteDocument(document: Document) {
    if(document === null || document === undefined)
    {
      return;
    }

    var pos = this.documentService.documents.indexOf(document)
    if(pos < 0)
    {
      return;
    }

    this.documentService.documents = this.documentService.documents.splice(pos, 1);
    this.documentsListClone = this.documentService.documents.slice();
    this.documentService.documentListChangedEvent.next(this.documentsListClone);
  }

}
