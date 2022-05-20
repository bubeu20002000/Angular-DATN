import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
const API_URL = "http://localhost:8080/api/cart/"

@Injectable({
  providedIn: 'root'
})
export class CartService {
  header: any;
  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) {
    const Bearer ="Bearer " + this.tokenStorageService.getUser().token
    this.header = new HttpHeaders().set(
      "Authorization",
       Bearer
    );
  }
  addtoCart(sku: any, size: any, id: any, qty: any): Observable<any> {
    return this.http.post<any>(API_URL + 'add/' + sku + '/' + size + '/' + id + '/' + qty, {headers: this.header });
  }
  getItems(id:any){
    return this.http.get<any>(API_URL + 'get/'+id,{headers: this.header })
  }
  delItem(id:any):Observable<any>{
    return this.http.delete<any>(API_URL + 'del/' +id,{headers: this.header })
  }
}
