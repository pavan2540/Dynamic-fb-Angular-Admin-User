import { createReducer, on } from '@ngrx/store';
import * as FormActions from './form-template.actions';

export interface FormTemplateState {
  templates: any[];
}

export const initialState: FormTemplateState = {
  templates: []
};

export const formTemplateReducer = createReducer(
  initialState,
  on(FormActions.loadTemplatesSuccess, (state, { templates }) => ({
    ...state,
    templates
  })),
  on(FormActions.addTemplate, (state, { template }) => ({
    ...state,
    templates: [...state.templates, template]
  })),
  on(FormActions.updateTemplate, (state, { template }) => ({
    ...state,
    templates: state.templates.map(t =>
      t.id === template.id ? template : t
    )
  })),
  on(FormActions.deleteTemplate, (state, { id }) => ({
    ...state,
    templates: state.templates.filter(t => t.id !== id)
  }))
);
