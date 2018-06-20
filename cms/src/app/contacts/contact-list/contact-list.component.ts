import {Component, OnInit} from '@angular/core';
import { Contact } from "../contact.model";
import { ContactService } from "../contact.service";
import { ActivatedRoute, Router } from "@angular/router";
import {Document} from "../../documents/document.model";

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];

  constructor(private contactService: ContactService, private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.contacts = this.contactService.getContacts();

    this.contactService.contactChangeEvent.subscribe
    ((contacts: Contact[]) => {
      this.contacts = contacts;
    });
  }

  onNewContact() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }


}
