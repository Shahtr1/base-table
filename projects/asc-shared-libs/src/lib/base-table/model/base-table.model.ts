export type Column = {
  field: string;
  header: string;
  customExportHeader?: string;
};

export type ExportColumn = {
  title: string;
  dataKey: string;
};

export type Size = 'small' | 'normal' | 'large';
