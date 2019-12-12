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
import { FormControlValidationMsgDirective } from './ui/directives/form-error.directive';
import { ValidationMsgService } from './services/validation.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    SelectRatingComponent,
    AutocompleteComponent,
    HighlightSearch,
    WeatherComponent,
    FormControlValidationMsgDirective
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [WeatherService, ValidationMsgService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
