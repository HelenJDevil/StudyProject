import { ReactNode } from 'react';

export type Primitive =
    | boolean
    | number
    | string
    | symbol
    | null
    | undefined;

export interface Library<T = any> { [key: string]: T }

export type FlatLibrary<T extends Primitive = Primitive> = Library<T>;

export interface Record {
    id: number,
}

export type DataSource<T = Record> = Array<T>;

export interface ColumnProps<IncomingType = any> {
    className?: string,
    key: string,
    title: string,
    getText? (value: IncomingType): string,
    customRender? (value: IncomingType): ReactNode,
}

export type ColumnStructure = Array<ColumnProps>;

export interface UserData {
    firstName: string,
    lastName: string,
    middleName?: string,
    organisationId: number,
    email: string
    displayName?: string,
    password?: string,
}
export type User = Record & UserData;

export interface OrganisationData {
    fullName: string,
    shortName?: string,
}
export type Organisation = Record & OrganisationData;

export interface RowOptions {
    className? : string,
}

export interface TableSelection {
    isExcluded?: boolean,
    clickedList: Array<number>
}

export interface DataViewer<T = any> {
    dataSource: DataSource<T>,
}
