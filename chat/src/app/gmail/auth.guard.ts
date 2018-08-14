import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { RequestsService } from '../requests.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private service: RequestsService, private router: Router){}

  canActivate() {
    if(!!localStorage.getItem('userData')){
    console.log("if")
    return true;
  }
    else{
      this.router.navigate(['/gmail']);
      console.log("else")
    return false;
  }
  }
}
