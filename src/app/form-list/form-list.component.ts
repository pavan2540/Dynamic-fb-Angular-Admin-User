import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormTemplateService } from '../services/form-template.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addTemplate, deleteTemplate, loadTemplates, updateTemplate } from 'src/app/state/form-template.actions';
import { selectAllTemplates } from 'src/app/state/form-template.selectors';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.scss']
})
export class FormListComponent implements OnInit {
  formTemplates$!: Observable<any[]>;
  templates: any;
  currentTemplate: any;
  templateName: string = '';
  formFields: any[] = [];

  constructor(
    private formTemplateService: FormTemplateService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadTemplates());
    this.store.select(selectAllTemplates).subscribe(t => this.templates = t);
  }

  onEdit(id: number) {
    this.router.navigate(['/form-edit', id]);
  }

  onPreview(id: number) {
    this.router.navigate(['/form-preview', id]);
  }

  onDelete(id: number) {
    this.store.dispatch(deleteTemplate({ id }));
    this.formTemplateService.deleteTemplate(id.toString());
    this.formTemplates$ = this.store.select(selectAllTemplates);
  }

  saveFormTemplate() {
    const template = {
      id: this.currentTemplate?.id || Date.now(),
      name: this.templateName,
      fields: this.formFields
    };
  
    if (this.currentTemplate?.id) {
      this.store.dispatch(updateTemplate({ template }));
    } else {
      this.store.dispatch(addTemplate({ template }));
    }
  
    alert('Form saved!');
  }
  
}
