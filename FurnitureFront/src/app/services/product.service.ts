import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productUrl = 'api/Products/';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.productUrl)
  }
  getProduct(id:number): Observable<Product> {
    const url = `${this.productUrl}/{id}`;
    return this.http.get<Product>(url)
  }
}
