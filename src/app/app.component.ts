import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from './models/role';
import { User } from './models/user';
import { AuthenticationService } from './services/authentication.service';

 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: User;

  constructor(
      private router: Router,
      private authenticationService: AuthenticationService
  ) {
  } 

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  get isAdmin() {
      return this.currentUser && this.currentUser.role === Role.Admin;
  }

  get isInsert() {
    return this.currentUser && this.currentUser.role === Role.Insert;
}

get isUpdate() {
  return this.currentUser && this.currentUser.role === Role.Update;
}

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
  }
}
