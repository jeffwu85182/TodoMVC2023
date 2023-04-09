export interface TodoItem {
    id: string;
    title: string;
    completed: boolean;
    editing: boolean;
    timestamp: number;
}

export enum FilterType {
    All = 'all',
    Active = 'active',
    Completed = 'completed',
}
