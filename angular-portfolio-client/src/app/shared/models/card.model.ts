export interface Card {
    id: string;
    content: string;
    title: string;
    thumbnail: string;
    videoId?: string;
    date?: string;
    type: 'VIDEO' | 'IMAGE';
}