export interface Banner {
    id: string;
    type: 'IMAGE_HORIZONTAL' | 'IMAGE_VERTICAL' | 'VIDEO_HORIZONTAL' | 'VIDEO_VERTICAL',
    content: string;
    title: string;
    source: string;
    displayTime?: number;
    date?: string;
}