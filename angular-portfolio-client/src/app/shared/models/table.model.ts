export interface TableHeaderConfig<T> {
    key: keyof T;
    header: string;
    headerClass?: string;
    contentClass?: string;
}
