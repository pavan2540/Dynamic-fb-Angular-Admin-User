import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import * as FormActions from './form-template.actions';
import { FormTemplateService } from '../services/form-template.service';

@Injectable()
export class FormTemplateEffects {
  constructor(
    private actions$: Actions,
    private formTemplateService: FormTemplateService
  ) {}

  loadTemplates$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FormActions.loadTemplates),
      switchMap(() =>
        this.formTemplateService.getTemplates().pipe(
          map((templates) => FormActions.loadTemplatesSuccess({ templates }))
        )
      )
    )
  );
}
