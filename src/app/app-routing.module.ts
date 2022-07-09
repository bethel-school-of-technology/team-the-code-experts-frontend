import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { ErrorComponent } from './components/error/error.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ExploreComponent } from './components/explore/explore.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';

const routes: Routes = [
  { // Default page is home
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: "profile",
    component: ProfileComponent
  },
  {
    path: "explore",
    component: ExploreComponent
  },
  {
<<<<<<< HEAD
    path: "settings",
    component: SettingsComponent
=======
    path: 'login',
    component: LoginComponent
>>>>>>> c38c1c9a0312e0c8bd36114a3a03df68a36fd9a7
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'goodbye',
    component: LogoutComponent
  },
  { // Error handling
    path: 'error/:id',
    component: ErrorComponent
  },
  { // Redirect to 404 if invalid page is entered
    path: '**',
    redirectTo: 'error/404',
    pathMatch: 'full'
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
