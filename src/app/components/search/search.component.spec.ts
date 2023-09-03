import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {IconsModule} from "../../Icon/IconsModulde";
import {BeerListComponent} from "../beer-list/beer-list.component";
import {InfiniteScrollModule} from "ngx-infinite-scroll";

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, IconsModule, InfiniteScrollModule],
      declarations: [SearchComponent, BeerListComponent]
    });
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
