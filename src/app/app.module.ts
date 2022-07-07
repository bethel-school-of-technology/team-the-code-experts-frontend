/* Import Modules */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgToastModule } from 'ng-angular-popup';

/* Import Components */
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav-bar/nav.component';
import { SideBarComponent } from './components/nav/side-bar/side-bar.component';
import { AppRoutingModule } from './app-routing.module';
import { SignupComponent } from './components/signup/signup.component';
import { FeedComponent } from './components/feed/feed.component';
import { ErrorComponent } from './components/error/error.component';
import { NavBarMobileComponent } from './components/nav/nav-bar-mobile/nav-bar-mobile.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { PostComponent } from './components/feed/post/post.component';
import { PostInputComponent } from './components/home/post-input/post-input.component';
import { ExploreComponent } from './components/explore/explore.component';

@NgModule({
  declarations: [ // Components
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
    ExploreComponent,
  ],
  imports: [ // Modules
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgToastModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
