// Generated by ts-to-zod
import { z } from "zod";

export const pagingTypeSchema = z.union([
  z.literal("client-side"),
  z.literal("server-side"),
]);

export const tableFilterSchema = z.union([
  z.literal("text"),
  z.literal("select"),
  z.literal("multiselect"),
  z.literal("boolean"),
]);

export const inputTypeSchema = z.union([
  z.literal("text"),
  z.literal("select"),
  z.literal("multiselect"),
  z.literal("radio"),
  z.literal("checkbox"),
  z.literal("textarea"),
  z.literal("colorPicker"),
  z.literal("number"),
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

export const tableColumnSchema = z.object({
  field: z.string(),
  headerId: z.string(),
  header: z.string().optional(),
  sort: z.boolean().optional(),
  globalSearch: z.boolean().optional(),
  filter: tableFilterSchema.optional(),
  inputType: inputTypeSchema.optional(),
  sourceUrl: z.string().optional(),
  optionLabel: z.string().optional(),
  translate: z.boolean().optional(),
});

export const tableViewConfigSchema = z.object({
  settings: tableSettingsSchema,
  columns: z.array(tableColumnSchema),
});
