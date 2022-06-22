import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  {
    path: "test",
    component: TestComponent,
    pathMatch: "full"
  },
  {
    path: "",
    component: HomePageComponent,
    pathMatch: "full"
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
