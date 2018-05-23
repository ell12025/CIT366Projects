import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() selectedFeatureEvent = new EventEmitter<string>();

  onSelect(selectedEvent: string) {
    this.selectedFeatureEvent.emit(selectedEvent);
  }
  constructor() { }

  ngOnInit() {
  }

}
