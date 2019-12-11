import {Injectable} from '@angular/core';

@Injectable()
export class ValidationMsgService {

  private errorMessages = {
    'invalidState': 'The selected option is not allowed. Please choose a different one.',
  };

  public getValidationMsg(validationId: string): string {
    return this.errorMessages[validationId];
  }

}
