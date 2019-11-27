import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, forkJoin } from 'rxjs';
import { ApiConfig } from '../api-config';
import { concatMap, switchMap, mergeMap, concatAll } from 'rxjs/operators';

@Injectable()
export class WeatherService {
  private api = ApiConfig.api;
  constructor(private http: HttpClient) { }

  public getWeatherConcat(params: []): Observable<any> {
    return from(params).pipe(
      concatMap(searchParams => <Observable<any>>this.http.get(this.api + searchParams + ApiConfig.apiKey))
    )
  }

  public getWeatherAsIs(searchParams) {
    const url = this.api + searchParams + ApiConfig.apiKey;
    return this.http.get(url);
  }

  public getWeatherSwitch(params) {
    return from(params).pipe(
      switchMap(searchParams => <Observable<any>>this.http.get(this.api + searchParams + ApiConfig.apiKey))
    )
  }

  public getWeatherMerge(params) {
    return from(params).pipe(
      mergeMap(searchParams => <Observable<any>>this.http.get(this.api + searchParams + ApiConfig.apiKey))
    )
  }

  public getWeatherFork(params) {
    return <Observable<any>>forkJoin(
      params.map(searchParams => <Observable<any>>this.http.get(this.api + searchParams + ApiConfig.apiKey))
    ).pipe(concatAll());
  }
}

