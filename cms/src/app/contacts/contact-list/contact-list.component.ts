import { Component, OnDestroy, OnInit } from '@angular/core';
import { Contact } from "../contact.model";
import { ContactService } from "../contact.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs/internal/Subscription";


@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[];
  subscription: Subscription;

  constructor(private contactService: ContactService, private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.contacts = this.contactService.getContacts();

    this.subscription = this.contactService.contactListChangedEvent.subscribe
    ((contacts: Contact[]) => {
      this.contacts = contacts;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onNewContact() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }


}
