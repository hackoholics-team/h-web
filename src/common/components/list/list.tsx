import { FC, ReactNode } from 'react';
import {
  Datagrid,
  List as RaList,
  ListProps as RaListProps,
} from 'react-admin';

export type ListProps = Partial<RaListProps>;

export const List: FC<ListProps> = ({ children }) => {
  return (
    <RaList title="Hello">
      <Datagrid>{children}</Datagrid>
    </RaList>
  );
};
