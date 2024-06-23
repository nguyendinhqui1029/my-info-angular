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

export interface Skill {
    subDescription: string;
    skills: {
        id: string;
        group: string;
        items: {
          id: string;
          name: string;
          value: string;
        }[];
      }[];
}

export interface Work {
    subDescription: string;
    companies: {
        id: string;
        name: string;
        icon: string;
        startDate: string;
        endDate: string;
        address: string;
        description: string;
        imageUrl: string;
      }[];
}
export interface AboutMeResponseValue {
    introduceMySelf: IntroduceMySelf;
    experience: Experience;
    skill: Skill;
    work: Work;
}
