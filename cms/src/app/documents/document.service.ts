import { Injectable } from '@angular/core';

import { EventEmitter } from '@angular/core';

import { Document } from "./document.model";

import { MOCKDOCUMENTS } from "./MOCKDOCUMENTS";

@Injectable()
export class DocumentService {
  documentSelectedEvent = new EventEmitter<Document>();
  private documents: Document[] = [];

  getDocuments() {
    return this.documents.slice();
  }

  getDocument() {

  }

  constructor() {
    this.documents = MOCKDOCUMENTS;
  }
}


