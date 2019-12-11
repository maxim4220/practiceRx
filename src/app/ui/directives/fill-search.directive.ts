import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[search-listener]'
})

export class SearchListenerDirective {
  constructor(private control: NgControl) {
  }

  @HostListener('blur')
  // check if input data is invalid and if so - underline the input in red adn show message...
  onBlur() {
    setTimeout(() => {
      const errors = this.control['_parent'].form.controls.options.errors;
      if (errors && errors.invalidState) {
        //  console.log('errors here!! invalid state!!');
      }
    }, 500);
  }
}
