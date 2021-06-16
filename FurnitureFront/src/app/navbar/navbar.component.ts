import { Component, OnInit } from '@angular/core';
import { ClassLogin } from '../models/login';
import { LoginService } from '../services/login.service'
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { debounce, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  login = new ClassLogin();
  loginEdit: boolean;
  bearerToken: string;
  //loginModel = new ClassLogin();

  constructor(
    private loginService: LoginService,
  ) { }

  ngOnInit(): void {
  }

  VerifyPassword(login: ClassLogin): void {
    login.Id = 0;
    login.Role = null;
   
    this.loginService.ToLogin(login.Email, login.Password)
      .subscribe(bearer => this.bearerToken = bearer)
    //MAKE IT AN OBJECT
    console.log(this.bearerToken);
      
    
  }
}
