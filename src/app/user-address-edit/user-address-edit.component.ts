import { Component, Input, OnInit } from '@angular/core';
import { FunctionsService } from '../services/functions.service';
import { TokenStorageService } from '../services/token-storage.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-address-edit',
  templateUrl: './user-address-edit.component.html',
  styleUrls: ['./user-address-edit.component.css']
})
export class UserAddressEditComponent implements OnInit {

  @Input() Addr_1: any;
  @Input() City: any;
  @Input() District: any;
  @Input() Ward: any;
  currentUser: any;
  currentData: any;

  api_data: any;
  city: Array<any> = [];
  district: Array<any> = [];
	ward: Array<any> = [];

  constructor(private tokenStorageService: TokenStorageService
    , private funtions: FunctionsService
    , private userService: UserService
    )
    { }
  
  ngOnInit(): void {
    this.currentUser = this.tokenStorageService.getUser();
    this.api_data = this.funtions.getAllNames().subscribe(res =>{
      for(var re of res){
        this.city.push(re)
      }
    })
    console.log(this.city)
  }
  
  callLogout(){
    this.funtions.logout();
  }

  updateAddr(){
    window.location.reload();
    const data = {
      address_1: this.Addr_1,
      city: this.City,
      district: this.District,
      ward: this.Ward
    };
    this.userService.updateAddr(this.currentUser.id, data)
    .subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      });
  }

  changeCountry(country: any) { 
		this.district = this.city.find((res: any) => res.name == country.target.value).districts;
    console.log(this.district)
	}
}
