export class Course {
    name: String;
    credits: number;
    professor: string;

    constructor(name: string, professor: string, credits: number) {
        this.name = name;
        this.credits = credits;
        this.professor = professor;
    }
}