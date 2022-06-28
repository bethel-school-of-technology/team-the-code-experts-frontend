import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav-bar/nav.component';
import { SideBarComponent } from './components/nav/side-bar/side-bar.component';
import { AppRoutingModule } from './app-routing.module';
import { SignupComponent } from './components/signup/signup.component';
import { FeedComponent } from './components/home/feed/feed.component';
import { ErrorComponent } from './components/error/error.component';
import { NavBarMobileComponent } from './components/nav/nav-bar-mobile/nav-bar-mobile.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { PostComponent } from './components/post/post.component';
import { PostInputComponent } from './components/post-input/post-input.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    SideBarComponent,
    SignupComponent,
    FeedComponent,
    ErrorComponent,
    NavBarMobileComponent,
    FooterComponent,
    PostComponent,
    PostInputComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
