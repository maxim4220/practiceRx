import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { ratingParams } from './select-rating.interface';

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
  @Input() params: ratingParams;

  public currentStar: number;
  // Function to call when the rating changes.
  public onChanged: (val) => void;
  // Function to call when the input is touched (when a star is clicked).
  public onTouched: () => void;

  private rateSelected = false;

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

  }

  public mouseMovement(rate: number, mouseEnter: boolean) {
    if (!this.rateSelected) {
      return this.currentStar = mouseEnter ? rate : null;
    }
  }

  public selectRating(rate: number) {
    this.mouseMovement(rate, true);
    this.onChanged(rate);
    this.onTouched();
    this.validate();
    this.rateSelected = true;
  }

  private validate() {
    return this.currentStar > this.params.maxStars ? { tooHigh: true } : this.currentStar < this.params.minStars ? { tooLow: true } : null;
  }

}
