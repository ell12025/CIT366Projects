import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router} from "@angular/router";
import { ContactService } from "../contact.service";
import { Contact } from "../contact.model";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {

  @ViewChild('f') contactsForm: NgForm;
  contact: Contact = null;
  originalContact: Contact;
  groupContacts: Contact[] = [];
  newContact: Contact;
  editMode: boolean = false;
  hasGroup: boolean = false;
  invalidGroupContact: boolean;
  id: string;


  constructor(private route: ActivatedRoute, private router: Router, private contactService: ContactService) { }



  // From Submit button to submit contacts form
  onSubmit(form: NgForm) {

    this.newContact = new Contact('', this.contactsForm.value.name,
      this.contactsForm.value.email, this.contactsForm.value.phone,
      this.contactsForm.value.imageUrl, this.groupContacts.slice());

    console.log(this.newContact);

    if(this.editMode == true)
    {
      this.contactService.updateContact(this.originalContact, this.newContact);
    }
    else
    {
      this.contactService.addContact(this.newContact);
    }

    this.router.navigate(['contacts']);

  }



  // Cancel form button clicked send view back to contacts page
  onCancel() {
    this.router.navigate(['contacts']);
  }




  // This function determines if the newContact to be added
  // to the group is already in the current contact's group array.
  isInvalidContact(newContact: Contact) {
    if(!newContact)
    {
      console.log(newContact, "!this.newcontact returing true")
      return true;
    }

    if(this.editMode && newContact.id === this.contact.id)
    {
      console.log("!this.newcontact.id returing true")
      return true;
    }

    for(let i = 0; i < this.groupContacts.length; i++)
    {
      if(newContact.id === this.groupContacts[i].id)
      {
        return true;
      }
    }

    return false;
  }


  addToGroup($event: any) {
    let selectedContact: Contact = $event.dragData;
    console.log(selectedContact, "addToGroupFunction WORKS!");
    this.invalidGroupContact = this.isInvalidContact(selectedContact);
    console.log(this.invalidGroupContact,"INVALIDGROUP");
    if(this.invalidGroupContact) {
      return;
    }

    this.groupContacts.push(selectedContact);
    console.log(this.groupContacts, "HERE IS THE GROUP LIST");
    this.invalidGroupContact = false;

  }


  onRemoveItem(idx: number) {
    // If contact is outside the bounds of the array
    if(idx < 0 || idx >= this.groupContacts.length)
    {
      return;
    }

    this.groupContacts.splice(idx, 1);
    this.invalidGroupContact = false;

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

        this.originalContact = this.contactService.getContact(this.id);
        console.log(this.originalContact, "ORIGINAL");
        if(this.originalContact === undefined || this.originalContact === null)
        {
          return;
        }

        this.editMode = true;
        this.contact = JSON.parse(JSON.stringify(this.originalContact));

        if(this.contact.group && this.contact.group.length > 0)
        {
          this.groupContacts = JSON.parse(JSON.stringify(this.contact.group));
        }
      });
  }

}
