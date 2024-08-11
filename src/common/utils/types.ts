import { Dispatch, SetStateAction } from 'react';
import { ResourceProps } from 'react-admin';

export type UI = Partial<ResourceProps>;
export type StateSetter<T> = Dispatch<SetStateAction<T>>;
