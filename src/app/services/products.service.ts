import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/Product'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = "http://localhost:8080/api";
  private httpOptions:any;

  constructor(private http:HttpClient) {
    this.generateToken();
  }

  generateToken(){
    var token = sessionStorage.getItem('currentUser');
    console.log("getAllProducts",token);
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+ token
    });
    this.httpOptions = {
          headers: headers_object
        };
  }

  getAllProduct():Observable<any>{
    this.generateToken();
    return this.http.get<any>(`${this.apiUrl}/getAllProducts`,this.httpOptions);
  }

  saveProducts(product: Product):Observable<any>{
    this.generateToken();
    return this.http.post(`${this.apiUrl}/addNewProduct`,product,this.httpOptions);
  }

  deleteProducts(productId: String):Observable<any>{
    this.generateToken();
    return this.http.delete(`${this.apiUrl}/deleteProduct/${productId}`,this.httpOptions);
  }
  updateProducts(product: Product):Observable<any>{
    this.generateToken();
    return this.http.put(`${this.apiUrl}/updateProduct`,product,this.httpOptions);
  }
}
