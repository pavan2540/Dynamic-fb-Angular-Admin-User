import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFillComponent } from './form-fill.component';

describe('FormFillComponent', () => {
  let component: FormFillComponent;
  let fixture: ComponentFixture<FormFillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormFillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormFillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show alert on valid form submit', () => {
    spyOn(window, 'alert');
    component.formGroup = fb.group({ field1: ['value'] });
    spyOnProperty(component, 'formGroup').and.returnValue({ valid: true } as any);
    component.onSubmit();
    expect(window.alert).toHaveBeenCalledWith('Form submitted successfully!');
  });
  
});
