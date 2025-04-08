import { createAction, props } from '@ngrx/store';

export const loadTemplates = createAction('[Form] Load Templates');
export const loadTemplatesSuccess = createAction(
  '[Form] Load Templates Success',
  props<{ templates: any[] }>()
);

export const addTemplate = createAction(
  '[Form] Add Template',
  props<{ template: any }>()
);

export const updateTemplate = createAction(
  '[Form] Update Template',
  props<{ template: any }>()
);

export const deleteTemplate = createAction(
  '[Form] Delete Template',
  props<{ id: number }>()
);
