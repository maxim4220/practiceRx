import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public title = 'practiceRx';
  // TypeAhead properties
  public searchState: FormControl = new FormControl('');
  public filteredValues = [];
  public states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
    'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
    'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
    'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
    'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
    'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
    'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
    'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
  // Star Rating properties
  public stars: FormControl = new FormControl('', Validators.required);
  public ratingParams = {
    minStars: 2,
    maxStars: 8,
    totalStars: 10
  };

  private subs: Subscription;
  // public getSearchOutput(completeVal): void {
  //   this.searchState.setValue(completeVal);
  // }

  ngOnInit() {
    this.getSearchResult();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  public fillInput(state) {
    this.searchState.setValue(state);
    this.filteredValues = null;
  }

  private getSearchResult(): void {
    this.subs = this.searchState.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        map(term => term.length < 2 ? [] : this.states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
      )
      .subscribe(val => {
        this.filteredValues = val;
      });
  }

}
