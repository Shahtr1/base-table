import { PrimeIcons } from 'primeng/api';

export type PrimeIconValues = (typeof PrimeIcons)[Exclude<
  keyof typeof PrimeIcons,
  'prototype'
>];

export type PagingType = 'client-side' | 'server-side';

export type TableFilter = 'text' | 'select' | 'multiselect' | 'boolean';

export type SelectConfig = {
  options?: Record<string, any>[];

  /** url to get select options */
  url?: string;

  /** Will take label(key) as default */
  optionLabel?: string;

  /** Will take value(key) as default, if no value, then will take whole object */
  optionValue?: string;

  /** filter by which key?, Will take label(key) as default */
  filterBy?: string;
};

export type TextConfig = {
  position?: 'left' | 'right';
  icon?: PrimeIconValues;
};

export type InputField = {
  type: InputType;
  placeholderId?: string;
  placeholder?: string;
  selectConfig?: SelectConfig;
  textConfig?: TextConfig;
  disabled?: boolean;
};

export type InputType =
  | 'text'
  | 'number'
  | 'select'
  | 'multiselect'
  | 'radio'
  | 'checkbox'
  | 'textarea'
  | 'color'
  | 'calendar'
  | 'chips'
  | 'editor'
  | 'mask'
  | 'switch'
  | 'knob'
  | 'select-button'
  | 'autocomplete';

export type TableSettings = {
  url: string;
  title?: string;
  rowsPerPage?: number;
  globalSearch?: boolean;
  softDelete?: boolean;
  transformData?: boolean;
  modifyConfig?: boolean;
  export?: boolean;
  showAddButton?: boolean;
  firstColumnFrozen?: boolean;

  paging?: boolean;
  showEditButton?: boolean;
  showDeleteButton?: boolean;
  editUrl?: string;
  addUrl?: string;
  deleteUrl?: boolean;
  actionColumn?: boolean;
  editCallBack?: boolean;
  addCallBack?: boolean;
  query?: { [key: string]: any };
  pagingType?: PagingType;
  lazy?: boolean;
};

export type TableColumn = {
  field: string;
  headerId: string;
  header?: string;
  sort?: boolean;
  globalSearch?: boolean;
  filter?: TableFilter;
  input?: InputField;

  sourceUrl?: string;
  optionLabel?: string;
  translate?: boolean;
};

export type TableViewConfig = {
  settings: TableSettings;
  columns: TableColumn[];
};
