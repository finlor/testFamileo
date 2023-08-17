import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import {HttpClientModule} from "@angular/common/http";
import { FontAwesomeModule, FaIconLibrary  } from '@fortawesome/angular-fontawesome';
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import { BeerListComponent } from './components/beer-list/beer-list.component';
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import { BeerDetailComponent } from './components/beer-detail/beer-detail.component';

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
    InfiniteScrollModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { constructor(library: FaIconLibrary) {
    library.addIcons(faSearch)
}}
