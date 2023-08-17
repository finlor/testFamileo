import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BeerListComponent} from "./components/beer-list/beer-list.component";
import {BeerDetailComponent} from "./components/beer-detail/beer-detail.component";
import {SearchComponent} from "./components/search/search.component";

const routes: Routes = [
  { path: 'beer/index/:index/name/:name', component: BeerDetailComponent },
  { path: 'beer/search', component: SearchComponent },
  { path: '',   redirectTo: '/beer/search', pathMatch: 'full' },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
