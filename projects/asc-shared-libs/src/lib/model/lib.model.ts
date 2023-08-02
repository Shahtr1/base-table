export type HttpVerbs = 'GET' | 'DELETE' | 'POST' | 'PUT' | 'PATCH';

export type TableConfig = {
  url: string;
  export?: boolean | undefined;
};

export type TableCol = {
  field: string;
  labelId: string;
};

export type TableConfigSchema = {
  tableConfig: TableConfig;
  tableCols: TableCol[];
};
