import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { ProfileComponent } from './profile/profile.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { ChangeUsernameComponent } from './change-username/change-username.component';
import { ChangePasswordComponent } from './change-password/change-password.component';


@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    HomePageComponent,
    LoginPageComponent,
    SignUpPageComponent,
    SettingsPageComponent,
    ProfileComponent,
    DeleteAccountComponent,
    ChangeUsernameComponent,
    ChangePasswordComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
