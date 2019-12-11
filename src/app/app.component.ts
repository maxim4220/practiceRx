import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CustomOptionsValidator } from './ui/validators/custom-options.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('mydiv', { static: false }) mydiv: ElementRef;
  public title = 'practiceRx';
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
  public searchForm: FormGroup;
  public showOptions = false;
  private subs: Subscription;

  constructor(private formBuilder: FormBuilder, ) {
  }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchState: [null],
      options: [null, Validators.required],
    }, {
      validator: CustomOptionsValidator.CheckInvalidStates
    });

    this.onChanges();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public getSearchOutput(val) {
    this.searchForm.get('searchState').setValue(val);
  }

  private onChanges(): void {
    this.subs = this.searchForm.get('searchState').valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        map(term => term.length < 2 ? [] : this.states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
      )
      .subscribe(val => {
        this.filteredValues = val;
        if (this.filteredValues.length > 0) {
          this.showOptions = true;
        }
      });
  }

}
