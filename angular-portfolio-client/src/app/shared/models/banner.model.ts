export interface Banner {
    id: string;
    type: 'IMAGE' | 'VIDEO',
    content: string;
    title: string;
    source: string;
    displayTime?: number;
}