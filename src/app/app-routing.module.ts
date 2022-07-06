import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangeUsernameComponent } from './change-username/change-username.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';

const routes: Routes = [
  {
    path: "home",
    component: HomePageComponent
  },
  {
    path: "test",
    component: TestComponent,
    pathMatch: "full"
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "login",
    component: LoginPageComponent
  },
  {
    path: "signup",
    component: SignUpPageComponent

  },
  {
    path: "settings",
    component: SettingsPageComponent
  },
  {
    path: "profile",
    component: ProfileComponent
  },
  {
    path: "changeusername",
    component: ChangeUsernameComponent
  },
  {
    path: "changepassword",
    component: ChangePasswordComponent
  },
  {
    path: "deleteaccount",
    component: DeleteAccountComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
