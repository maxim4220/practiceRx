import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-autocomplete',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => AutocompleteComponent),
    },
  ],
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})

export class AutocompleteComponent implements ControlValueAccessor {
  @Input() params = [];
  @Input() sv: string;
  @Output() autocomplete = new EventEmitter<string>();

  public currentValue: string;
  public onChanged: (val) => void;
  public onTouched: () => void;

  public writeValue(val: string): void {
    this.currentValue = val;
  }


  public registerOnChange(fn: (option: number) => void): void {
    this.onChanged = fn;
  }

  public registerOnTouched(fn): void {
    this.onTouched = fn;
  }

  public setOption(option: string): void {
    this.currentValue = option;
    this.onChanged(option);
    this.onTouched();
    this.params = [];
    this.autocomplete.emit(option);
  }

}
