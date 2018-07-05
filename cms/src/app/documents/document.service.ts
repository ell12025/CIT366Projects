import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Document } from "./document.model";
import { MOCKDOCUMENTS } from "./MOCKDOCUMENTS";
import {Subject} from "rxjs/internal/Subject";

@Injectable()
export class DocumentService {
  documentSelectedEvent = new EventEmitter<Document>();
  documentListChangedEvent = new Subject<Document[]>();
  documents: Document[];
  maxDocumentId: number;
  documentsListClone: Document[];




  // Class constructor
  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }



  // Get documents
  getDocuments() {
    return this.documents.slice();
  }




  // Get a single document based on ID
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





  // Get max ID
  getMaxId():number {
    var maxId = 0;

    for(var i = 0; i < this.documents.length; i++)
    {
      var currentId = parseInt(this.documents[i].id);
      if(currentId > maxId)
      {
        maxId = currentId;
      }
    }
    return maxId;
  }






  // Add a document
  addDocument(newDocument: Document) {
    if (newDocument === undefined || newDocument === null) {
      return;
    }

    this.maxDocumentId++;
    newDocument.id = String(this.maxDocumentId);
    this.documents.push(newDocument);
    this.documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(this.documentsListClone);
  }







  // Update a document
  updateDocument(originalDocument: Document, newDocument: Document) {
    if(originalDocument === null || originalDocument === undefined
    || newDocument === null || newDocument === undefined)
    {
      return;
    }

    var pos = this.documents.indexOf(originalDocument);

      if(pos < 0 )
      {
        return;
      }

      newDocument.id = originalDocument.id;
      this.documents[pos] = newDocument;
      this.documentsListClone = this.documents.slice();
      this.documentListChangedEvent.next(this.documentsListClone);
    }






  // Delete a Document
  deleteDocument(document: Document) {
    if (document === null || document === undefined) {
      return;
    }

    var pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }

    this.documents.splice(pos, 1);
    this.documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(this.documents.slice());

  }







}


