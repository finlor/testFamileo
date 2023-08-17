import {Component, OnInit} from '@angular/core';
import {BeersService} from "../../services/beers.service";
import {ActivatedRoute} from "@angular/router";
import {Beer} from "../../interfaces/beer.model";

@Component({
  selector: 'app-beer-detail',
  templateUrl: './beer-detail.component.html',
  styleUrls: ['./beer-detail.component.scss']
})
export class BeerDetailComponent implements OnInit {

  id: string  ='';
  index: string ='';
  previousIndex: number=0;
  nextIndex: number=0;

  name:string = '';
  beers: Beer = {};
  error = null;
  isFetching = false;
  constructor(private route: ActivatedRoute, public beersService: BeersService) {
  }

  ngOnInit() {

    // this.id = this.route.snapshot.params['id'];
   // this.index = this.route.snapshot.params['index'];
  //  this.name = this.route.snapshot.params['name'];
    this.route.paramMap.subscribe(params => {
        // @ts-ignore
      this.id = params.get("id");
        // @ts-ignore
      this.index = params.get("index");
        // @ts-ignore
      this.name = params.get("name");
      const indexToNumber = parseInt(this.index,10)
      if(indexToNumber>1){
        this.previousIndex = indexToNumber-1;
      }
      this.nextIndex = indexToNumber +1;
      this.searchUnitaryBeerByNameByIndex(this.name, this.index);
    })


  }

  searchUnitaryBeerByNameByIndex(name: string, index: string) {
    this.isFetching = true;
    this.beersService.searchBeerByNameByPage(name, index, '1' ).subscribe(
      beer => {
        this.isFetching = false;
        this.beers = beer[0];
      },
      error => {
        this.isFetching = false;
        this.error = error;
      }
    );
  }

  loadNextBeer(): void{
    this.index = (parseInt(this.index,10)+1).toString();
    this.searchUnitaryBeerByNameByIndex(this.name, this.index);

  }

  loadPreviousBeer(): void{
    this.index = (parseInt(this.index,10)-1).toString();
    this.searchUnitaryBeerByNameByIndex(this.name, this.index);

  }

}
