import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {RatingParams} from './select-rating.interface';

@Component({
  selector: 'app-select-rating',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => SelectRatingComponent),
    },
    {
      provide: NG_VALIDATORS, multi: true, useExisting: forwardRef(() => SelectRatingComponent),
    }
  ],
  templateUrl: './select-rating.component.html',
  styleUrls: ['./select-rating.component.scss']
})
export class SelectRatingComponent implements ControlValueAccessor {
  @Input() params: RatingParams;

  public currentStar: number;
  // Function to call when the rating changes.
  public onChanged: (val) => void;
  // Function to call when the input is touched (when a star is clicked).
  public onTouched: () => void;

  private rateDisabled = false;

  // Allows Angular to update the model (rating).
  // Update the model and changes needed for the view here.
  public writeValue(val: number): void {
    this.currentStar = val;
  }

  // Allows Angular to register a function to call when the model (rating) changes.
  // Save the function as a property to call later here.
  public registerOnChange(fn: (rating: number) => void): void {
    this.onChanged = fn;
  }

  // Allows Angular to register a function to call when the input has been touched.
  // Save the function as a property to call later here.
  public registerOnTouched(fn): void {
    this.onTouched = fn;
  }

  // Allows Angular to disable the input.
  public setDisabledState(isDisabled: boolean): void {
    this.rateDisabled = isDisabled;
  }

  public mouseMovement(rate: number, mouseEnter: boolean) {
    if (!this.rateDisabled) {
      return this.currentStar = mouseEnter ? rate : null;
    }
  }

  public setRating(rate: number): void {
    if (!this.rateDisabled) {
      this.currentStar = rate;
      this.onChanged(rate);
      this.onTouched();
      this.validate();
      this.rateDisabled = true;
    }
  }

  private validate() {
    return this.currentStar > this.params.maxStars ? {tooHigh: true} : this.currentStar < this.params.minStars ? {tooLow: true} : null;
  }

}
