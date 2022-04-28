import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FunctionsService } from '../_services/functions.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-page-order',
  templateUrl: './page-order.component.html',
  styleUrls: ['./page-order.component.css']
})
export class PageOrderComponent implements OnInit {

  constructor(private tokenStorageService: TokenStorageService, private funtions: FunctionsService) { }

  ngOnInit(): void {
  
  }

  callLogout(){
    this.funtions.logout();
  }


}
