import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy{
  isLoading = false;
  authStatusSub: Subscription;
  categories = [
    {value: 0, viewValue: 'Service'},
    {value: 1, viewValue: 'User'},
  ];

  constructor(public authService: AuthService) {}

  ngOnInit() {
    // this.authStatusSub =this.authService.getAuthStatusListener().subscribe(
    //   suthStatus => {
    //     this.isLoading = false;
    //   }
    // );
  }

  onLogin(form: NgForm) {
   console.log("LoginComponent -> onLogin -> form", form.value)
   if (form.invalid) {
     return;
   }
   this.isLoading = true;
   this.authService.loginUser(form.value.category, form.value.email, form.value.password);
  }

  ngOnDestroy() {
    // this.authStatusSub.unsubscribe();
  }
}
