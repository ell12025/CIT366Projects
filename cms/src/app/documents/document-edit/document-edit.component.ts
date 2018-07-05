import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { DocumentService } from "../document.service";

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {

  originalDocument: Document;
  document: Document;
  editMode: boolean = false;
  id: string;

  constructor(private route: ActivatedRoute, private router: Router, private documentService: DocumentService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];

        if(this.id === undefined || this.id === null)
        {
          this.editMode = false;
          return;
        }

        //this.originalDocument = this.documentService.getDocument(this.id);

        if (this.originalDocument === undefined || this.originalDocument === null)
        {
          return;
        }

        this.editMode = true;
        this.document = JSON.parse(JSON.stringify(this.originalDocument));

      });
  }

}
