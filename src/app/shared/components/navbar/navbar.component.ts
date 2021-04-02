import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() sideBarAction = new EventEmitter<boolean>();

  faBars = faBars;

  constructor() { }

  ngOnInit(): void {
  }

  showSideBar(showSideBarButton) {
    this.sideBarAction.emit();
  }

}
