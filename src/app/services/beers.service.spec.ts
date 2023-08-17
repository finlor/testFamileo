import { TestBed } from '@angular/core/testing';

import { BeersService } from './beers.service';
import {HttpErrorResponse} from "@angular/common/http";
import {Beer} from "../interfaces/beer.model";
import * as beerMock from "./beer-mock.json";
import {defer} from "rxjs";
import {HttpClientTestingModule} from "@angular/common/http/testing";


/**
 * Create async observable that emits-once and completes
 * after a JS engine turn
 */
export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

/**
 * Create async observable error that errors
 * after a JS engine turn
 */
export function asyncError<T>(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}

describe('BeersService', () => {
  let service: BeersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BeersService]
    });
    service = TestBed.inject(BeersService);
  });

  it('should be created', () => {
    const service: BeersService = TestBed.get(BeersService)
    expect(service).toBeTruthy();
  });

  describe('#searchBeers (with spies)', () => {
    let httpClientSpy: { get: jasmine.Spy };
    let beersService: BeersService;
    const name = 'food';
    const page = '1';
    const perPage = '4';

    beforeEach(() => {
      httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
      beersService = new BeersService(httpClientSpy as any);
    });

    it('should return expected beers (HttpClient called once)', () => {
      const expectedBeers: Beer[] = beerMock;

      httpClientSpy.get.and.returnValue(asyncData(expectedBeers));

      beersService.searchBeerByNameByPage(name, page, perPage).subscribe(
        beers => expect(beers).toEqual(expectedBeers, 'expected beers'),
        fail
      );
      expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    });

    it('should return an error when the server returns a 404', () => {
      const errorResponse = new HttpErrorResponse({
        error: 'test 404 error',
        status: 404, statusText: 'Not Found'
      });

      httpClientSpy.get.and.returnValue(asyncError(errorResponse));

      beersService.searchBeerByNameByPage(name, page, perPage).subscribe(
        beers => fail('expected an error, not beers'),
        error  => expect(error.message).toContain('test 404 error')
      );
    });

  });


});
