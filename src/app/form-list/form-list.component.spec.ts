import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormListComponent } from './form-list.component';
import { FormTemplateService } from '../services/form-template.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { loadTemplates, deleteTemplate, addTemplate, updateTemplate } from '../state/form-template.actions';

describe('FormListComponent', () => {
  let component: FormListComponent;
  let fixture: ComponentFixture<FormListComponent>;
  let mockFormTemplateService: any;
  let mockRouter: any;
  let mockStore: any;

  beforeEach(async () => {
    mockFormTemplateService = {
      deleteTemplate: jasmine.createSpy('deleteTemplate').and.returnValue(of({}))
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    mockStore = {
      dispatch: jasmine.createSpy('dispatch'),
      select: jasmine.createSpy('select').and.returnValue(of([]))
    };

    await TestBed.configureTestingModule({
      declarations: [ FormListComponent ],
      providers: [
        { provide: FormTemplateService, useValue: mockFormTemplateService },
        { provide: Router, useValue: mockRouter },
        { provide: Store, useValue: mockStore }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load templates on init', () => {
    expect(mockStore.dispatch).toHaveBeenCalledWith(loadTemplates());
    expect(mockStore.select).toHaveBeenCalled();
  });

  it('should navigate to edit page on onEdit', () => {
    component.onEdit(1);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/form-edit', 1]);
  });

  it('should navigate to preview page on onPreview', () => {
    component.onPreview(1);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/form-preview', 1]);
  });

  it('should delete template on onDelete', () => {
    component.onDelete(1);
    expect(mockStore.dispatch).toHaveBeenCalledWith(deleteTemplate({ id: 1 }));
    expect(mockFormTemplateService.deleteTemplate).toHaveBeenCalledWith('1');
  });

  describe('saveFormTemplate', () => {
    it('should dispatch updateTemplate when currentTemplate exists', () => {
      component.currentTemplate = { id: 1 };
      component.templateName = 'Test';
      component.formFields = [];

      component.saveFormTemplate();

      expect(mockStore.dispatch).toHaveBeenCalledWith(
        updateTemplate({
          template: {
            id: 1,
            name: 'Test',
            fields: []
          }
        })
      );
    });

    it('should dispatch addTemplate when currentTemplate does not exist', () => {
      spyOn(Date, 'now').and.returnValue(12345);
      component.currentTemplate = null;
      component.templateName = 'Test';
      component.formFields = [];

      component.saveFormTemplate();

      expect(mockStore.dispatch).toHaveBeenCalledWith(
        addTemplate({
          template: {
            id: 12345,
            name: 'Test',
            fields: []
          }
        })
      );
    });
  });
});
