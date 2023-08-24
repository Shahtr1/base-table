import { z } from 'zod';
import { PrimeIcons } from 'primeng/api';

export const primeIconValuesSchema = z.enum(
  Object.values(PrimeIcons) as [string, ...string[]]
);

export const pagingTypeSchema = z.union([
  z.literal('client-side'),
  z.literal('server-side'),
]);

export const tableFilterSchema = z.union([
  z.literal('text'),
  z.literal('select'),
  z.literal('multiselect'),
  z.literal('boolean'),
]);

export const selectConfigSchema = z.object({
  options: z.array(z.record(z.any())).optional(),
  optionLabel: z.string().optional(),
  optionValue: z.string().optional(),
  filterBy: z.string().optional(),
});

export const textConfigSchema = z.object({
  position: z.union([z.literal('left'), z.literal('right')]).optional(),
  icon: primeIconValuesSchema.optional(),
});

export const inputTypeSchema = z.union([
  z.literal('text'),
  z.literal('number'),
  z.literal('select'),
  z.literal('multiselect'),
  z.literal('radio'),
  z.literal('checkbox'),
  z.literal('textarea'),
  z.literal('color'),
  z.literal('calendar'),
  z.literal('chips'),
  z.literal('editor'),
  z.literal('mask'),
  z.literal('switch'),
  z.literal('knob'),
  z.literal('select-button'),
  z.literal('autocomplete'),
]);

export const tableSettingsSchema = z.object({
  url: z.string(),
  title: z.string().optional(),
  rowsPerPage: z.number().optional(),
  globalSearch: z.boolean().optional(),
  softDelete: z.boolean().optional(),
  transformData: z.boolean().optional(),
  modifyConfig: z.boolean().optional(),
  export: z.boolean().optional(),
  showAddButton: z.boolean().optional(),
  firstColumnFrozen: z.boolean().optional(),
  paging: z.boolean().optional(),
  showEditButton: z.boolean().optional(),
  showDeleteButton: z.boolean().optional(),
  editUrl: z.string().optional(),
  addUrl: z.string().optional(),
  deleteUrl: z.boolean().optional(),
  actionColumn: z.boolean().optional(),
  editCallBack: z.boolean().optional(),
  addCallBack: z.boolean().optional(),
  query: z.record(z.any()).optional(),
  pagingType: pagingTypeSchema.optional(),
  lazy: z.boolean().optional(),
});

export const inputFieldSchema = z.object({
  type: inputTypeSchema,
  placeholderId: z.string().optional(),
  placeholder: z.string().optional(),
  selectConfig: selectConfigSchema.optional(),
  textConfig: textConfigSchema.optional(),
  disabled: z.boolean().optional(),
});

export const tableColumnSchema = z.object({
  field: z.string(),
  headerId: z.string(),
  header: z.string().optional(),
  sort: z.boolean().optional(),
  globalSearch: z.boolean().optional(),
  filter: tableFilterSchema.optional(),
  input: inputFieldSchema.optional(),
  sourceUrl: z.string().optional(),
  optionLabel: z.string().optional(),
  translate: z.boolean().optional(),
});

export const tableViewConfigSchema = z.object({
  settings: tableSettingsSchema,
  columns: z.array(tableColumnSchema),
});
