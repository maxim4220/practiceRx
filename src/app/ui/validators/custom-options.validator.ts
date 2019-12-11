import {AbstractControl} from '@angular/forms';

export class CustomOptionsValidator {
  /**
   * Check for invalid states
   * @param control AbstractControl
   */
  static CheckInvalidStates(control: AbstractControl) {
    const ss = control.get('searchState').value;
    const opts = control.get('options').value;
    if (opts === 'New York' || opts === 'California') {
      control.get('searchState').setErrors({invalidState: true});
      control.get('options').setErrors({invalidState: true});
    } else if (ss === 'New York ' || ss === 'California') {
      control.get('searchState').setErrors({invalidState: true});
      control.get('options').setErrors({invalidState: true});
    } else {
      return null;
    }
  }
}
