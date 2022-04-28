import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from './_services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  constructor(private tokenStorageService: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      // this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.username = user.username;
    }
  }
  
  // logout(): void {
    
  //   if(this.router.url === '/orders' 
  //     ||this.router.url === '/user'
  //     ||this.router.url === '/login'
  //     ||this.router.url === '/user-details'
  //     ||this.router.url === '/user-details-edit'
  //     ||this.router.url === '/user-address'
  //     ){
  //       this.tokenStorageService.signOut();
  //       window.location.replace("/");
  //   }else{
  //     this.tokenStorageService.signOut();
  //     window.location.reload();
  //   }
  // }
}
