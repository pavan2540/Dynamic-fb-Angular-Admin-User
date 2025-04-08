import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

// Define the FormTemplate interface
export interface FormField {
  value: any;
  name: any;
  id: string;
  key: string;
  label: string;
  type: string;
  required?: boolean;
  options?: string[];
}

export interface FormTemplate {
  id: string;
  name: string;
  fields: any[];
}

@Injectable({
  providedIn: 'root'
})
export class FormTemplateService {
  private templatesKey = 'form_templates';

  constructor() {}

  private defaultTemplates: any[] = [];

  // Get templates from localStorage or fallback to default
  getTemplates(): Observable<any[]> {
    const data = localStorage.getItem(this.templatesKey);
    const templates: any[] = data ? JSON.parse(data) : this.defaultTemplates;
    return of(templates);
  }

  getTemplateById(id: string): Observable<any> {
    return this.getTemplates().pipe(
      map((templates) => templates.find((t) => t.id === id))
    );
  }

  saveTemplate(template: any): void {
    this.getTemplates().subscribe((templates) => {
      const existingIndex = templates.findIndex((t) => t.id === template.id);
      if (existingIndex > -1) {
        templates[existingIndex] = template;
      } else {
        template.id = Date.now().toString();
        templates.push(template);
      }
      localStorage.setItem(this.templatesKey, JSON.stringify(templates));
    });
  }

  deleteTemplate(id: string): void {
    this.getTemplates().subscribe((templates) => {
      const updated = templates.filter((t) => t.id !== id);
      localStorage.setItem(this.templatesKey, JSON.stringify(updated));
    });
  }
}
