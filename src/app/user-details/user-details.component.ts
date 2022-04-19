import { Component, OnInit } from '@angular/core';
import { FunctionsService } from '../services/functions.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  constructor(private tokenStorageService: TokenStorageService, private funtions: FunctionsService) { }

  ngOnInit(): void {
  
  }

  callLogout(){
    this.funtions.logout();
  }


}
