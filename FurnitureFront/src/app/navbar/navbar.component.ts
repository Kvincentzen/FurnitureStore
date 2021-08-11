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
import { BearerTokenInfo } from '../models/bearertokeninfo';

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
  loginInfo: BearerTokenInfo;

  constructor(
    private loginService: LoginService,
    private productService: ProductService,
    private bearerTokenService: BearertokenService
  ) { }

  ngOnInit(): void {
    this.loginInfo = this.bearerTokenService.CheckLoginInfo();
    
  }

  

  VerifyPassword(email: string, password: string) {
    // genbruger rolle i denne her funktion til at få den bearertoken string der bliver givet til siden.
    this.loginService.ToLogin(email, password)
      .pipe()
      .subscribe(Login => {
        this.bearerToken = Login.role,
          this.SetBearerToken(this.bearerToken)
          //checklogininfo bruger vi for at holde den dynamisk opdateret med om der noget i den variable og vores html ændres ud fra det 
          this.loginInfo = this.bearerTokenService.CheckLoginInfo();
    
      })
      
  }

  SetBearerToken(bearerToken: string) {
    this.bearerTokenService.SetBearertoken(bearerToken);
  }

 

  GetProduct() {
    this.productService.getProduct(2)
      .subscribe(product => this.product = product)

    console.log(this.product);

  }
}

