export type TableSettings = {
  url: string;
  export?: boolean;
  editButton?: boolean;
  deleteButton?: boolean;
  newRecordButton?: boolean;
  title: string;
  transformData?: boolean;
  editCallBack?: boolean;
  newCallBack?: boolean;
  softDelete?: boolean;
};

export type TableColumn = {
  field: string;
  labelId: string;
  sort?: boolean;
  filter?: 'search' | 'select';
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
