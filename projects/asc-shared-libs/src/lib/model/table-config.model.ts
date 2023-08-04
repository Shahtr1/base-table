export type PagingType = 'client-side' | 'server-side';

export type TableFilter = 'search' | 'select';

export type TableSettings = {
  url: string;
  title?: string;
  size?: number;
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
  modifyConfig?: false;
  query?: { [key: string]: any };
  pagingType?: PagingType;
  lazy?: boolean;
};

export type TableColumn = {
  field: string;
  labelId: string;
  sort?: boolean;
  filter?: TableFilter;
  sourceUrl?: string;
  optionLabel?: string;
  filterDataKey?: string;
  filterKey?: string;
  type?: string;
  translate?: boolean;
};

export type TableViewConfig = {
  settings: TableSettings;
  columns: TableColumn[];
};
