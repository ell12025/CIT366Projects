import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router} from "@angular/router";
import { ContactService } from "../contact.service";
import { Contact } from "../contact.model";

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  contact: Contact = null;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  hasGroup: boolean = false;
  id: string;


  constructor(private route: ActivatedRoute, private router: Router, private contractService: ContactService) { }





  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.editMode = params['id'] != null;
      }
    );
  }

}
