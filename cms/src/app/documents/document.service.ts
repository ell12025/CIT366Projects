import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Document } from "./document.model";
import { Subject } from "rxjs/internal/Subject";
import { HttpClient, HttpHeaders } from "@angular/common/http";


@Injectable()
export class DocumentService {
  documentSelectedEvent = new EventEmitter<Document>();
  documentListChangedEvent = new Subject<Document[]>();
  documents: Document[] = [];
  maxDocumentId: number;
  documentsListClone: Document[];




  // Class constructor
  constructor(private http: HttpClient) {
    this.maxDocumentId = this.getMaxId();
  }



  // Get documents
  getDocuments() {
    // if(this.documents) {
    //   return this.documents.slice();
    // }
    this.http.get<Document[]>('https://cit366-c75e2.firebaseio.com/documents.json').subscribe(
      (documents: Document[]) => {
        this.documents = documents;
        this.maxDocumentId = this.getMaxId();
        this.documents = this.documents.sort(this.compare);
        this.documentListChangedEvent.next(this.documents.slice());
      },
      (error: any) => {
        console.log("HTTP error: " + error.msgText);
      }
    );
  }


  // compare function that gets called in getDocuments()
  compare(documentA: Document, documentB: Document) {
    const docA = documentA.name.toUpperCase();
    const docB = documentB.name.toUpperCase();
    if(docA < docB) {
      return -1;
    }
    if(docA > docB) {
      return 1;
    }
    return 0;
  }



  // Store the new documents that get added to the database
  storeDocuments() {
    const strDocuments = JSON.stringify(this.documents);
    const header = new HttpHeaders( {
      'Content-Type': 'application/json'
    });

    return this.http.put('https://cit366-c75e2.firebaseio.com/documents.json',
      strDocuments,
      {headers: header}).subscribe(
      () => this.documentListChangedEvent.next(this.documents.slice()));
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
    // this.documentListChangedEvent.next(this.documentsListClone);
    this.storeDocuments();
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
    // this.documentListChangedEvent.next(this.documentsListClone);
    this.storeDocuments();
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
    //this.documentListChangedEvent.next(this.documents.slice());
    this.storeDocuments();

  }

}


