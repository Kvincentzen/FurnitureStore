import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productUrl = 'api/products/';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.productUrl)
  }
  getProduct(id: number): Observable<Product> {
    //const url = `${this.productUrl}/${id}`;
    return this.http.get<Product>(`${this.productUrl}/${id}`)
  }
  searchProducts(term: string): Observable<Product[]> {
    if (!term.trim()) { 
      return of([]);
    }
    return this.http.get<Product[]>(`${this.productUrl}/GetName/?name=${term}`).pipe(
      tap(x => x.length ?
         console.log(`found products matching "${term}"`) :
         console.log(`no products matching "${term}"`)),
      catchError(this.handleError<Product[]>('searchProducts', []))
    );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
