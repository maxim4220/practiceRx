import { Directive, ElementRef, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { NgControl, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ValidationMsgService } from 'src/app/services/validation.service';


@Directive({
  selector: '[appFormControlValidationMsg]'
})
export class FormControlValidationMsgDirective implements OnInit, OnDestroy {

  // tslint:disable-next-line:no-input-rename
  @Input('validationMsgId') validationMsgId: string;
  errorSpanId = '';
  statusChangeSubscription: Subscription;

  constructor(private elRef: ElementRef,
    private control: NgControl,
    private validationMsgService: ValidationMsgService
  ) {
  }

  ngOnInit(): void {
    this.errorSpanId = this.validationMsgId + new Date() + '-error-msg';
    this.statusChangeSubscription = this.control.statusChanges.subscribe(
      (status) => {
        console.log('STATUS', status);
        if (status === 'INVALID') {
          this.showError();
        } else {
          this.removeError();
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.statusChangeSubscription.unsubscribe();
  }

  @HostListener('blur', [])
  handleBlurEvent(): void {
    if (this.control.value === null || this.control.value === '') {
      if (this.control.errors) {
        this.showError();
      } else {
        this.removeError();
      }
    }
  }

  private showError(): void {
    this.removeError();
    const valErrors: ValidationErrors = this.control.errors;
    const firstKey = Object.keys(valErrors)[0];
    const errorMsg = this.validationMsgService.getValidationMsg(firstKey);
    const errSpan = '<span class="ap-error-msg" id="' + this.errorSpanId + '">' + errorMsg + '</span>';
    this.elRef.nativeElement.parentElement.insertAdjacentHTML('beforeend', errSpan);
  }

  private removeError(): void {
    const errorElement = document.getElementById(this.errorSpanId);
    if (errorElement) {
      errorElement.remove();
    }
  }

}
