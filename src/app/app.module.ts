import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SelectRatingComponent } from './ui/select-rating/select-rating.component';
import { AutocompleteComponent } from './ui/autocomplete/autocomplete.component';
import { HighlightSearch } from './ui/pipes/hightlight.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SelectRatingComponent,
    AutocompleteComponent,
    HighlightSearch
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
