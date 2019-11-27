import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  public weatherData = [];
  private counter = 0;
  private requestParams = [];

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.requestParams = ['q=London,uk', 'q=Kiev,ua', 'q=Moscow,ru', 'q=Rome,it'];
    //  this.showForkWeather(this.requestParams);
    this.showParallelWeather(this.requestParams);
    //this.showWeatherInOrder(this.requestParams);
    // this.showSwitchWeather(this.requestParams);
    // uncomment below to use a regular call
    // this.requestParams.forEach(element => {
    //   this.showWeatherAsIs(element)
    // });
    setTimeout(() => {
      console.log('weatherData', this.weatherData);
    }, 2000)
  }

  private showWeatherInOrder(cityParams) {
    this.weatherService.getWeatherConcat(cityParams)
      .subscribe(res => {
        console.log('res in order (concatMap)', this.counter, res.name);
        this.weatherData.push(res);
        this.counter++;
      })
  }

  private showWeatherAsIs(cityParams) {
    this.weatherService.getWeatherAsIs(cityParams)
      .subscribe(res => {
        console.log('res as is', this.counter, res['name']);
        this.weatherData.push(res);
        this.counter++;
      })
  }

  private showSwitchWeather(cityParams) {
    this.weatherService.getWeatherSwitch(cityParams)
      .subscribe(res => {
        console.log('res if switchMap', this.counter, res['name']);
        this.weatherData.push(res);
        this.counter++;
      })
  }

  private showParallelWeather(cityParams) {
    this.weatherService.getWeatherMerge(cityParams)
      .subscribe(res => {
        console.log('res merged (mergeMap)', this.counter, res.name);
        this.weatherData.push(res);
        this.counter++;

        // May need to sort the array in order like in 'requestParams' property
        this.weatherData.sort((a, b) => {
          const aIndex = this.requestParams.findIndex(el => el.includes(a.name));
          const bIndex = this.requestParams.findIndex(el => el.includes(b.name));
          return aIndex - bIndex;
        });
      });
  }

  private showForkWeather(cityParams) {
    this.weatherService.getWeatherFork(cityParams)
      .subscribe(res => {
        console.log('res parallel (forkJoint)', this.counter, res.name);
        this.weatherData.push(res);
        this.counter++;
      })
  }

}
