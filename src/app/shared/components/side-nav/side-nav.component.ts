import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBars, faTimes, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/core/models/user.model';

import { AuthService } from '../../../core/services/auth/auth.service'

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  /* icons */
  faBars = faBars;
  faTimes = faTimes;
  faSignOutAlt = faSignOutAlt;
  faUser = faUser;

  showSideBAr : boolean;

  user: User;
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser')).user;
  }

  sideBarToggler(sideNav, main){
    if(sideNav.style.width === "200px"){
      this.closeSideNav(sideNav, main);
    }else{
      this.openSideNav(sideNav, main);
    }
  }

  openSideNav(sideNav, main){
    sideNav.style.width = "200px";
    main.style.marginLeft = "200px";
    //document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
  }

  closeSideNav(sideNav, main){
    sideNav.style.width = "0";
    main.style.marginLeft = "0";
    //document.body.style.backgroundColor = "white";
  }

  logOut(sideNav, main){
    this.sideBarToggler(sideNav, main);
    this.authService.logout();
    this.router.navigate(['sign-in']);
  }

}
