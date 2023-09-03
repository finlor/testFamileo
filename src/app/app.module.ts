import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import {HttpClientModule} from "@angular/common/http";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BeerListComponent } from './components/beer-list/beer-list.component';
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import { BeerDetailComponent } from './components/beer-detail/beer-detail.component';
import {IconsModule} from "./Icon/IconsModulde";

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    BeerListComponent,
    BeerDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    IconsModule,
    InfiniteScrollModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
