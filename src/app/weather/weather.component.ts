import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent {
  public weatherData = [];
  public requestParams = ['q=London,uk', 'q=Kiev,ua', 'q=Moscow,ru', 'q=Rome,it'];


  constructor(private weatherService: WeatherService) {
  }

  public showWeatherInOrder(cityParams) {
    this.weatherService.getWeatherConcat(cityParams)
      .subscribe(res => {
        this.weatherData.push(res);
      });
  }

  public showWeatherAsIs(cityParams) {
    cityParams.forEach(city => {
      this.weatherService.getWeatherAsIs(city)
        .subscribe(res => {
          this.weatherData.push(res);
        });

    });
  }

  public showSwitchWeather(cityParams) {
    this.weatherService.getWeatherSwitch(cityParams)
      .subscribe(res => {
        this.weatherData.push(res);
      });
  }

  public showParallelWeather(cityParams) {
    this.weatherService.getWeatherMerge(cityParams)
      .subscribe(res => {
        this.weatherData.push(res);

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
        this.weatherData.push(res);
      });
  }

  public clear() {
    this.weatherData = [];
  }

}
