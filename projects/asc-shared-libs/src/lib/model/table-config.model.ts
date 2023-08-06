export type PagingType = 'client-side' | 'server-side';

export type TableFilter = 'text' | 'select' | 'multiselect' | 'checkbox';

export type TableSettings = {
  url: string;
  title?: string;
  rowsPerPage?: number;
  export?: boolean;
  paging?: boolean;
  globalSearch?: boolean;
  addButton?: boolean;
  editButton?: boolean;
  deleteButton?: boolean;
  softDelete?: boolean;
  editUrl?: string;
  addUrl?: string;
  deleteUrl?: boolean;
  actionColumn?: boolean;
  editCallBack?: boolean;
  addCallBack?: boolean;
  transformModel?: boolean;
  transformData?: boolean;
  modifyConfig?: boolean;
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

  sourceUrl?: string;
  optionLabel?: string;
  type?: string;
  translate?: boolean;
};

export type TableViewConfig = {
  settings: TableSettings;
  columns: TableColumn[];
};
