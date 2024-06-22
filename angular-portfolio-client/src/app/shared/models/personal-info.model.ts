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

export interface AboutMeResponseValue {
    introduceMySelf: IntroduceMySelf;
}
