import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const API_URL = "http://localhost:8080/api/product/"
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {
  }
  getAll(page: any, size: any, field: any): Observable<any> {
    return this.http.post<any>(API_URL + 'products/' + page + '/' + size, field);
  }

  getInfo() {
    return this.http.get<any>(API_URL + 'products-info');
  }

  getDetails(id: any) {
    return this.http.get<any>(API_URL + 'product-details/' + id);
  }
}
