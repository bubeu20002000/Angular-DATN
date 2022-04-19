import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FunctionsService } from '../services/functions.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  currentUser: any;
  constructor(private tokenStorageService: TokenStorageService, private funtions: FunctionsService) { }

  ngOnInit(): void {
    this.currentUser = this.tokenStorageService.getUser();
  }

  callLogout(){
    this.funtions.logout();
  }

  
}
