import { Component, OnDestroy, OnInit } from '@angular/core';
import { Document } from "../document.model";
import { DocumentService } from "../document.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs/internal/Subscription";

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {
  documents: Document[] = [];
  subscription: Subscription;

  constructor(private documentService: DocumentService, private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.documentService.getDocuments();
    this.subscription = this.documentService.documentListChangedEvent.subscribe
    ((documents: Document[]) => {
      this.documents = documents;
    });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  onNewDocument() {
    this.router.navigate(['new'], {relativeTo: this.route});

  }
}

