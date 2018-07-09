import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from "./contact.model";

@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {
  transform(contacts: Contact[], [term]): any {
    let filteredArray: Contact[];

    // Simplified way of the transform function
    filteredArray = contacts.filter(
      (contact: any) => contact.name.toLowerCase().includes(term.toLowerCase())
    );

    // Longer implementation of the transform function
    // for(let i = 0; i < contacts.length; i++) {
    //   let contact = contacts[i];
    //   if(contact.name.toLocaleLowerCase().includes(term)) {
    //     filteredArray.push(contact);
    //   }
    // }

    if(filteredArray.length < 1) {
      return contacts;
    }
    return filteredArray;
  }

}
