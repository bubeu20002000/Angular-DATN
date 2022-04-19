import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() isLoggedIn:any;
  @Input() showAdminBoard:any;

  url: any;

  constructor(private tokenStorageService: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
  }

  isLogged(){
    if(!this.isLoggedIn){
      return this.router.navigate(['/login']);
    }else{
      return this.router.navigate(['/user']);
    }
  }

  logout(): void {
    
    if(this.router.url === '/orders' 
      ||this.router.url === '/user'
      ||this.router.url === '/login'
      ||this.router.url === '/user-details'
      ||this.router.url === '/user-details-edit'
      ||this.router.url === '/user-address'
      ){
        this.tokenStorageService.signOut();
        window.location.replace("/");
    }else{
      this.tokenStorageService.signOut();
      window.location.reload();
    }
  }
  
}
