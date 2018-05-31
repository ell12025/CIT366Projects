import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Document } from "../document.model";

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  documents: Document[] = [

    new Document("one", "CIT 260 -", " Object Oriented Programming", "https://content.byui.edu/file/2c4ddd6c-dce4-408d-b581-f254a13e4d10/1/Lesson%204%20-%20Assignment.pdf", ""),

    new Document("two", "CIT 366 -", " Web Stack Development", "https://content.byui.edu/file/f0594919-9524-47eb-9f4d-5c7239c3c002/1/Lesson%201%20Assignment.pdf", ""),

    new Document("three", "CIT 425 -", " Data Warehousing", "https://content.byui.edu/file/c67e59fd-990c-4adc-9232-8027f847c8b9/1/Lesson%202%20-%20Create%20CMS%20project%20and%20Contact%20components.pdf", ""),

    new Document("four", "CIT 460 -", " Enterprise Development", "https://content.byui.edu/file/aa9b6af5-b882-48f5-8321-caca980e5ec9/1/Lesson%203%20Components%20and%20Databinding.pdf", "")

  ];

  constructor() { }

  ngOnInit() {
  }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);

  }

}
