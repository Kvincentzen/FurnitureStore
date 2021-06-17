import { Component, OnInit } from '@angular/core';
import { ClassLogin, Login } from '../models/login';
import { LoginService } from '../services/login.service'
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { Observable, observable } from 'rxjs';
import { debounce, debounceTime } from 'rxjs/operators';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';


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
  observable$;

  constructor(
    private loginService: LoginService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.observable$ = Observable.create((dwa) => {
      dwa.next(1);
    })
  }

  private delay(ms: number)
  {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // DET KAN FUNGERE MEN BLIVER IKKE SIKKERT HVIS MAN BRUGER ET DELAY 
  async VerifyPassword() {
    
    this.loginService.ToLogin('jegerenemail@trues12.dk', 'jegeretsikkertpassword1')
      .subscribe(Login => {
        this.login = Login,
        this.GetData})
    
      await this.delay(500);
      this.GetData();
  }

  GetData(){
    console.log(this.login);
  }

  GetProduct() {
    this.productService.getProduct(2)
      .subscribe(product => this.product = product)

    console.log(this.product);
    
  }
}

