import {Component, Input} from '@angular/core';
import {Beer} from "../../interfaces/beer.model";

@Component({
  selector: 'app-beer-list',
  templateUrl: './beer-list.component.html',
  styleUrls: ['./beer-list.component.scss']
})
export class BeerListComponent {

  @Input() beers: Beer[] = [];
  @Input() searchValue: string = '';


  calculateItemNumber(id: number | undefined): number {
    return this.beers.map(current => current.id).indexOf(id);
  }
}
