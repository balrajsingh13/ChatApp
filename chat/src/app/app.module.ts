import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider
} from "angular-6-social-login";
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { GmailComponent } from './gmail/gmail.component';
import { TwitterComponent } from './twitter/twitter.component';
import { TwigioComponent } from './twigio/twigio.component';
import { LoginComponent } from './login/login.component';

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("91003732511-io00k47fsagrp415u0clqtruall5mdnb.apps.googleusercontent.com")
        }
      ]
  );
  return config;
}

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'gmail', component:GmailComponent,},
  {path:'twitter', component:TwitterComponent},
  {path:'twigio', component:TwigioComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    GmailComponent,
    TwitterComponent,
    TwigioComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    SocialLoginModule,
    HttpClientModule
  ],
  providers: [{
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
