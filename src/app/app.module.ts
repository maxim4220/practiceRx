import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectRatingComponent } from './ui/select-rating/select-rating.component';
import { AutocompleteComponent } from './ui/autocomplete/autocomplete.component';
import { HighlightSearch } from './ui/pipes/hightlight.pipe';
import { WeatherComponent } from './weather/weather.component';
import { WeatherService } from './services/weather.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SelectRatingComponent,
    AutocompleteComponent,
    HighlightSearch,
    WeatherComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
