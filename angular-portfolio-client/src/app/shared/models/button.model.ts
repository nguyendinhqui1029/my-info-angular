export interface Button {
    id: string;
    label?: string;
    icon?: string;
    severity?: 'success' | 'info' | 'warning' | 'danger' | 'help' | 'primary' | 'secondary' | 'contrast' | null | undefined;
    raised?: boolean;
    rounded?: boolean;
    text?: boolean;
    outlined?: boolean;
    badge?: string;
    badgeClass?: string;
    size?: 'small' | 'large';
}