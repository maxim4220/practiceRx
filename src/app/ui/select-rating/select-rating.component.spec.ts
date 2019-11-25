import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectRatingComponent } from './select-rating.component';

describe('SelectRatingComponent', () => {
  let component: SelectRatingComponent;
  let fixture: ComponentFixture<SelectRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
