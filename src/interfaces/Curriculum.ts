export interface CurriculumData {
    name: string;
    title: string;
    summary: string;
    skills: string[];
    experience: Experience[];
    education: Education[];
    certifications: Certification[];
    languages: string[];
    references: string;
    profilePicture: string;
}

export interface Experience {
    title: string;
    startDate: string;
    endDate: string;
    description: string;
}

export interface Education {
    name: string;
    startDate: string;
    endDate: string;
}

export interface Certification {
    name: string;
    description: string;
    link: string;
}