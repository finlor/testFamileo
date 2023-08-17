import { Component } from '@angular/core';
import {BeersService} from "../../services/beers.service";
import {Beer} from "../../interfaces/beer.model";
import {NUMBER_ITEMS_PER_PAGE} from "../../constants/constants.file";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  private maxPerLoad = NUMBER_ITEMS_PER_PAGE;
  public isLoading=false;

  public items:Beer[]=[];
  public currentPage=1;
  public searchValue: string = '';
  toggleLoading = ()=>this.isLoading=!this.isLoading;


  constructor(private beerService: BeersService) {}

  searchBeer(query:KeyboardEvent, page:string){
    if(query){
      const element = query.target as HTMLInputElement;
      this.searchValue = element.value;
      this.beerService.searchBeerByNameByPage(element.value, page, this.maxPerLoad.toString()).subscribe((result)=>{
        this.items=result;
      });
    }
  }

  // Loads more beer by calling API and Increasing maxPerPage
  onScrollDown() {
    this.currentPage++;
    this.beerService.searchBeerByNameByPage(this.searchValue, this.currentPage.toString(), this.maxPerLoad.toString()).subscribe({
      next:response=>this.items = [...this.items,...response],
        error:err=>console.log(err),
        complete:()=>this.toggleLoading()
    });
  }
}
