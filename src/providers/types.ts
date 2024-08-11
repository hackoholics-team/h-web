export type MutationType = 'CREATE' | 'UPDATE';

export type DeleteArgsType = { id: string; meta: any };
export type GetOneArgsType = { id: string; meta: any };
export type SaveOrUpdateArgsType<T> = {
  payload: T;
  meta: {
    mutationType: MutationType;
    [T: string]: any;
  };
};
export type GetListArgsType = {
  page: number;
  pageSize: number;
  filter: any;
  sort: any;
  meta: any;
};

export type HackoholicDataProvider<T> = {
  getOne: (args: GetOneArgsType) => Promise<T>;
  saveOrUpdate: (args: SaveOrUpdateArgsType<T>) => Promise<T>;
  getList: (args: GetListArgsType) => Promise<T[]>;
  delete: (args: DeleteArgsType) => Promise<T>;
};
