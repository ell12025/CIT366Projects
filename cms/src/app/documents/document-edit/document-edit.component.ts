import {Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { DocumentService } from "../document.service";
import { Document } from "../document.model";
import { NgForm } from "@angular/forms";


@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {

  @ViewChild('f') documentsForm: NgForm;
  document: Document;
  originalDocument: Document;
  newDocument: Document;
  editMode: boolean = false;
  id: string;


  constructor(private route: ActivatedRoute, private router: Router, private documentService: DocumentService) {}



  // Form Submit button to submit form
  onSubmit(form: NgForm) {

    console.log(this.documentsForm.value);

    // THIS IS ANOTHER, LONGER, WAY OF GETTING AND STORING VALUES
    // const name = this.documentsForm.value.name;
    // const description = this.documentsForm.value.description;
    // const url = this.documentsForm.value.url;


    // this.newDocument = new Document('', name, description, url, []);


    this.newDocument = new Document('', this.documentsForm.value.name, this.documentsForm.value.description, this.documentsForm.value.url, [])

    console.log(this.newDocument);

    if (this.editMode == true)
    {
      this.documentService.updateDocument(this.originalDocument,this.newDocument);
    }
    else
    {
      this.documentService.addDocument(this.newDocument);
    }

    this.router.navigate(['documents']);

  }




  // Cancel form button clicked send view back to documents page
  onCancel() {
    this.router.navigate(['documents']);
  }





  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];

        if(this.id === undefined || this.id === null)
        {
          this.editMode = false;
          return;
        }

        this.originalDocument = this.documentService.getDocument(this.id);

        if (this.originalDocument === undefined || this.originalDocument === null)
        {
          return;
        }

        this.editMode = true;
        this.document = JSON.parse(JSON.stringify(this.originalDocument));

      });
  }

}
