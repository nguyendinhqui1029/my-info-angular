export interface Social {
    name: string;
    icon: string;
    link: string;
}
export interface IntroduceMySelf {
    fullName: string;
    position: string;
    description: string;
    avatarUrl: string;
    social: Social[];
}

export interface Experience {
    subDescription: string;
    description: string;
    image: string;
    statistic: {
        count: number;
        name: string;
    }[];
}
export interface AboutMeResponseValue {
    introduceMySelf: IntroduceMySelf;
    experience: Experience;
}
