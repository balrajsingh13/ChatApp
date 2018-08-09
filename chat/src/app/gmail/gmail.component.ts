import { Component, OnInit } from '@angular/core';
import {
  AuthService,
  GoogleLoginProvider
} from 'angular-6-social-login';
import { Router } from '@angular/router';

import { RequestsService } from '../requests.service' 

@Component({
  selector: 'app-gmail',
  templateUrl: './gmail.component.html',
  styleUrls: ['./gmail.component.css']
})

export class GmailComponent implements OnInit {

  constructor( private socialAuthService: AuthService , 
               private route: Router,
               private requestService : RequestsService){

  }
  
  ngOnInit() {}

  public socialSignIn() {

    let socialPlatformProvider;    
    socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;     
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        this.requestService.setID(userData.id);
        console.log("Google sign in data : " , userData); // Now sign-in with userData
        this.route.navigate(['/twigio']);                    
      }
    );
  }
}
