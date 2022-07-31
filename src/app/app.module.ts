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
import { PostInputComponent } from './components/post-input/post-input.component';
import { ExploreComponent } from './components/explore/explore.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { UsersPostsComponent } from './components/feed/users-posts/users-posts.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { UserprofileComponent } from './components/profile/userprofile/userprofile.component';
import { PostsComponent } from './components/profile/userprofile/posts/posts.component';
import { MobileLogoutComponent } from './components/logout/mobile-logout/mobile-logout.component';

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
    SettingsComponent,
    ProfileComponent,
    LoginComponent,
    LogoutComponent,
    UsersPostsComponent,
    EditPostComponent,
    UserprofileComponent,
    PostsComponent,
    MobileLogoutComponent,
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
