import { Component, OnInit } from '@angular/core';
import { Contact } from "../contact.model";


@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
contacts: Contact[] = [
  new Contact('1', 'Bro. Jackson', 'jacksonk@byui.edu', '208-496-3771',
    'http://www.byui.edu/images/instructional-development/News/stories/06-2015/jacksonk.jpg', 'null'),

  new Contact('2', 'Bro. Barzee', 'barzeer@byui.edu','208-496-3768',
    'https://images-na.ssl-images-amazon.com/images/I/51TXuDJxNYL._UX250_.jpg', 'null')
];


  constructor() { }

  ngOnInit() {
  }

}
