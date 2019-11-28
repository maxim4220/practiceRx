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
  public requestParams = ['q=London,uk', 'q=Kiev,ua', 'q=Moscow,ru', 'q=Rome,it'];

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    setTimeout(() => {
      console.log('weatherData', this.weatherData);
    }, 2000)
  }

  public showWeatherInOrder(cityParams) {
    this.weatherService.getWeatherConcat(cityParams)
      .subscribe(res => {
        console.log('res in order (concatMap)', this.counter, res.name);
        this.weatherData.push(res);
        this.counter++;
      })
  }

  public showWeatherAsIs(cityParams) {
    cityParams.forEach(city => {
      this.weatherService.getWeatherAsIs(city)
        .subscribe(res => {
          console.log('res as is', this.counter, res['name']);
          this.weatherData.push(res);
          this.counter++;
        })

    });
  }

  public showSwitchWeather(cityParams) {
    this.weatherService.getWeatherSwitch(cityParams)
      .subscribe(res => {
        console.log('res if switchMap', this.counter, res['name']);
        this.weatherData.push(res);
        this.counter++;
      })
  }

  public showParallelWeather(cityParams) {
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

  public showForkWeather(cityParams) {
    this.weatherService.getWeatherFork(cityParams)
      .subscribe(res => {
        console.log('res parallel (forkJoint)', this.counter, res.name);
        this.weatherData.push(res);
        this.counter++;
      })
  }

  public clear() {
    this.weatherData = [];
  }

}
