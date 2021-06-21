import { Component, OnInit } from '@angular/core';
import { ClassLogin, Login } from '../models/login';
import { LoginService } from '../services/login.service'
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { Observable, interval } from 'rxjs';

import { debounce, debounceTime, map, take, filter } from 'rxjs/operators';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { BearertokenService } from '../services/bearertoken.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  classLogin = new ClassLogin;
  login: Login;
  loginEdit: boolean;
  bearerToken: string;
  product: Product;

  constructor(
    private loginService: LoginService,
    private productService: ProductService,
    private bearerTokenService: BearertokenService
  ) { }

  ngOnInit(): void {
    const number$ = interval(500);


  }

  //TODO slet denne her
  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  VerifyPassword(email: string, password: string) {

    this.loginService.ToLogin(email, password)
      //***NOTAT***  EXEMPLE PÅ HVORDAN MAN MODIFICERE ET OBJEKT INDE I EN OBSERVABLE
      .pipe(
        map(Login => {
          this.login = Login
          this.login.id = this.login.id * 10
          return this.login

        })
      )
      .subscribe(Login => {
        this.bearerToken = Login.role,
          this.SetBearerToken(this.bearerToken)
     
      })
  }

  SetBearerToken(bearerToken: string) {
    this.bearerTokenService.SetBearertoken(bearerToken);
    this.bearerTokenService.GetBearertoken()
  }


  GetProduct() {
    this.productService.getProduct(2)
      .subscribe(product => this.product = product)

    console.log(this.product);

  }
}

