import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from "./contact.model";

@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {
  transform(contacts: any, [term]: any, propName: string): any {
    let filteredArray: Contact[] = [];

    // Longer implementation of the transform function
    for(let i = 0; i < contacts.length; i++) {
      let contact = contacts[i];
      if(contact.name.toLocaleLowerCase().includes(term)) {
        filteredArray.push(contact);
      }
    }

    if(filteredArray.length < 1 ) {
      return contacts.slice();
    }
    return filteredArray;
  }
}
