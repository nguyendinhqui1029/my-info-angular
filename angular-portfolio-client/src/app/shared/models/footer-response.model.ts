export interface FooterResponse {
    infos: {
        name: string;
        logo: string;
        description: string;
        social: { name: string; link: string; icon: string; }[];
    },
    contact: { content: string; link: string; icon: string;}[];
}