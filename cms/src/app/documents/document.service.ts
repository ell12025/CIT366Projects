import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Document } from "./document.model";
import { MOCKDOCUMENTS } from "./MOCKDOCUMENTS";
import {Subject} from "rxjs/internal/Subject";

@Injectable()
export class DocumentService {
  documentSelectedEvent = new EventEmitter<Document>();
  // documentChangeEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();
  documents: Document[];
  maxDocumentId: Number;

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
    this.documentListChangedEvent.next(this.documents.slice());
  }

  getMaxId():number {
    var maxId = 0;

    for(var i = 0; i < this.documents.length; i++)
    {
      var currentId = parseInt(this.documents[i].id);
      if(currentId > maxId)
      {
        maxId = currentId
      }
    }
    return maxId;
  }


  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }
}


