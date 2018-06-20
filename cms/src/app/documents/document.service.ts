import { Injectable } from '@angular/core';

import { EventEmitter } from '@angular/core';

import { Document } from "./document.model";

import { MOCKDOCUMENTS } from "./MOCKDOCUMENTS";

@Injectable()
export class DocumentService {
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangeEvent = new EventEmitter<Document>();
  documents: Document[];

  getDocuments() {
    return this.documents.slice();
  }

  getDocument(id: string) {


    for(var i = 0; i < this.documents.length; i++)
    {
      if(this.documents[i].id == id)
      {
      return this.documents[i];
      }
    }
    return null;
  }

  deleteDocument(document: Document){
    if (document === null) {
      return;
    }

    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }

    this.documents.splice(pos,1);
    this.documentChangeEvent.emit(this.documents.slice());
  }


  constructor() {
    this.documents = MOCKDOCUMENTS;
  }
}


