import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormTemplate, FormTemplateService } from 'src/app/services/form-template.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface FieldConfig {
  key: string;
  label: string;
  type: string;
  required?: boolean;
  options?: string[];
}

export const fieldsData: FieldConfig[] = [
  {
    key: 'name',
    label: 'Name',
    type: 'text',
    required: true
  },
  {
    key: 'description',
    label: 'Description',
    type: 'textarea',
    required: true
  },
  {
    key: 'gender',
    label: 'Gender',
    type: 'radio',
    options: ['Male', 'Female'],
    required: true
  },
  {
    key: 'hobbies',
    label: 'Hobbies',
    type: 'checkbox',
    options: ['Reading', 'Traveling', 'Sports'],
    required: true
  },
  {
    key: 'country',
    label: 'Country',
    type: 'select',
    options: ['USA', 'India', 'Canada'],
    required: true
  },
  {
    key: 'dob',
    label: 'Date of Birth',
    type: 'date',
    required: true
  }
];

@Component({
  selector: 'app-form-fill',
  templateUrl: './form-fill.component.html'
})

export class FormFillComponent implements OnInit {
  formGroup!: FormGroup;
  fields: any[] = [];
  today = new Date();
  form!: FormGroup;
  isPreview = false;
  templateId: string | null = null;

  constructor(private fb: FormBuilder,
    private formTemplateService: FormTemplateService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    // Replace this with dynamic loading if needed
    this.fields = fieldsData;

    const group: any = {};

    this.fields.forEach(field => {
      if (field.type === 'checkbox') {
        const checkboxArray = field.options.map(() => false);
        group[field.key] = this.fb.array(checkboxArray);
      } else {
        group[field.key] = field.required
          ? [null, Validators.required]
          : [null];
      }
    });
    this.route.paramMap.subscribe(params => {
      this.templateId = params.get('id');
      this.route.data.subscribe(data => {
        this.isPreview = data['isPreview'] || false;

        if (this.templateId) {
          this.loadTemplateFromLocalStorage(this.templateId);
        }
      });
    });
    // Initialize form group with dynamic fields
    this.formGroup = this.fb.group(group);
  }

  loadTemplateFromLocalStorage(id: string): void {
    const savedTemplates = JSON.parse(localStorage.getItem('form_templates') || '[]');
    const template = savedTemplates.find((t: any) => t.id.toString() === id);

    if (template) {
      this.populateForm(template);

      if (this.isPreview && this.form) {
        Object.values(this.form.controls).forEach(control => control.disable());
      }
    }
  }

  loadTemplate(id: string): void {
    this.formTemplateService.getTemplateById(id).subscribe(template => {
      if (template) {
        console.log('Loaded template:', template);
        this.formGroup.patchValue(template);
        this.formGroup.markAsPristine();
        this.formGroup.markAsUntouched();
        this.fields = template.fields || [];
        this.populateForm(template);
      }
    });
  }

  populateForm(template: FormTemplate): void {
    const group: { [key: string]: FormControl } = {};

    template.fields.forEach(field => {
      const validators = field.required ? [Validators.required] : [];
      group[field.key] = new FormControl(field.value || '', validators);
    });

    this.formGroup = new FormGroup(group);
    this.fields = template.fields;
  }



  onSubmit() {
    if (this.formGroup.valid) {
      if (this.formGroup.valid) {
        const updatedTemplate = {
          name: this.templateId ? this.fields[0].name : '',
          id: this.templateId || Date.now().toString(),
          fields: this.fields.map(field => ({
            ...field,
            value: field.type === 'checkbox'
              ? this.getCheckboxOptions(field.key).controls
                .map((ctrl: any, idx: any) => ctrl.value ? field.options[idx] : null)
                .filter((v: any) => v !== null)
              : this.formGroup.get(field.key)?.value
          }))
        };
        this.formTemplateService.saveTemplate(updatedTemplate);
        this.snackBar.open('Form submitted successfully!', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });

      } else {
        this.formGroup.markAllAsTouched();
        this.snackBar.open('Please fill all required fields correctly!', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    }
  }


  getCheckboxOptions(key: string): any {
    return this.formGroup.get(key) as FormArray;
  }

}
