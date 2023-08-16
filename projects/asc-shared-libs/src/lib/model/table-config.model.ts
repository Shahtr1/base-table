export type PagingType = 'client-side' | 'server-side';

export type TableFilter = 'text' | 'select' | 'multiselect' | 'boolean';

export type Input = {
  type: InputType;
  placeholderId?: string;
  placeholder?: string;
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
  | 'select-button';

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
  input?: Input;

  sourceUrl?: string;
  optionLabel?: string;
  translate?: boolean;
};

export type TableViewConfig = {
  settings: TableSettings;
  columns: TableColumn[];
};
