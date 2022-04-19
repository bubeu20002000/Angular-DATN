import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FunctionsService } from '../services/functions.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private tokenStorageService: TokenStorageService, private funtions: FunctionsService) { }

  ngOnInit(): void {
  
  }

  callLogout(){
    this.funtions.logout();
  }


}
