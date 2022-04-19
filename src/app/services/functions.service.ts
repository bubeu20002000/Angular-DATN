import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { TokenStorageService } from './token-storage.service';

const URL_provinceVN = 'https://provinces.open-api.vn/api/?depth=3'

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {


  constructor(private router: Router
    , private tokenStorageService: TokenStorageService
    , private http: HttpClient
    ) { }

  logout(): void {
    
    if(this.router.url === '/orders' 
      ||this.router.url === '/user'
      ||this.router.url === '/login'
      ||this.router.url === '/user-details'
      ||this.router.url === '/user-details-edit'
      ||this.router.url === '/user-address'
      ||this.router.url === '/user-address-edit'
      ){
        this.tokenStorageService.signOut();
        window.location.replace("/");
    }else{
      this.tokenStorageService.signOut();
      window.location.reload();
    }
  }

  getAllNames(): Observable<any>{
    return this.http.get<any>(URL_provinceVN)
  }

}
