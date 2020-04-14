import { Injectable } from "@angular/core";
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  canActivate = async () => {
    if(this.auth.getIsAuth() && this.auth.fetchType() == 'service') {
      console.log("AuthGuardService -> canActivate -> this.auth.fetchType()", this.auth.fetchType())
      return true;
    }  else {
      await this.router.navigate(['/']);
      return false;
    }
  }
}
