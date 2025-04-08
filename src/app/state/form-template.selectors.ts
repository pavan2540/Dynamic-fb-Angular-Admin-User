import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FormTemplateState } from './form-template.reducer';

export const selectFormState =
  createFeatureSelector<FormTemplateState>('formTemplates');

export const selectAllTemplates = createSelector(
  selectFormState,
  state => state.templates
);
export const selectTemplateById = (id: number) =>
  createSelector(selectAllTemplates, templates =>
    templates.find(template => template.id === id)
  );
export const selectTemplateByName = (name: string) =>
  createSelector(selectAllTemplates, templates =>
    templates.find(template => template.name === name)
  );
export const selectTemplateByType = (type: string) =>
  createSelector(selectAllTemplates, templates =>
    templates.filter(template => template.type === type)
  );
export const selectTemplateByStatus = (status: string) =>
  createSelector(selectAllTemplates, templates =>
    templates.filter(template => template.status === status)
  );
export const selectTemplateByDateRange = (startDate: Date, endDate: Date) =>
  createSelector(selectAllTemplates, templates =>
    templates.filter(
      template =>
        new Date(template.date) >= new Date(startDate) &&
        new Date(template.date) <= new Date(endDate)
    )
  );
export const selectTemplateByCreator = (creator: string) =>
  createSelector(selectAllTemplates, templates =>
    templates.filter(template => template.creator === creator)
  );
export const selectTemplateByTags = (tags: string[]) =>
  createSelector(selectAllTemplates, templates =>
    templates.filter(template =>
      tags.every(tag => template.tags.includes(tag))
    )
  );
export const selectTemplateByField = (field: string, value: any) =>
  createSelector(selectAllTemplates, templates =>
    templates.filter(template => template[field] === value)
  );
export const selectTemplateByFieldRange = (
  field: string,
  minValue: number,
  maxValue: number
) =>
  createSelector(selectAllTemplates, templates =>
    templates.filter(
      template =>
        template[field] >= minValue && template[field] <= maxValue
    )
  );
     