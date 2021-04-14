import { Course } from './course.js';
import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';
import { Student } from './student.js';

const personalDataTBody: HTMLElement[] = [
    document.getElementById('codigoRow')!,
    document.getElementById('cedulaRow')!,
    document.getElementById('edadRow')!,
    document.getElementById('direccionRow')!,
    document.getElementById('telefonoRow')!
];
const coursesTbody: HTMLElement = document.getElementById('courses')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const btnFilterByCreditsRange: HTMLElement = document.getElementById("button-filterByCreditsRange")!;
const inputMinCredits: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box-minCreditos")!;
const inputMaxCredits: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box-maxCreditos")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;

btnfilterByName.onclick = () => applyFilterByName();
btnFilterByCreditsRange.onclick = () => applyFilterByCreditsRange();
totalCreditElm.textContent = getTotalCredits(dataCourses) + "";

renderPersonalDataInTable(dataStudent);
renderCoursesInTable(dataCourses);

function renderPersonalDataInTable(data: Student) {
    let element = document.createElement("div");
    element.className = "col";
    element.innerHTML = `${data.codigo}`;
    personalDataTBody[0].appendChild(element);

    element = document.createElement("div");
    element.className = "col";
    element.innerHTML = `${data.cedula}`;
    personalDataTBody[1].appendChild(element);

    element = document.createElement("div");
    element.className = "col";
    element.innerHTML = `${data.edad}`;
    personalDataTBody[2].appendChild(element);

    element = document.createElement("div");
    element.className = "col";
    element.innerHTML = `${data.direccion}`;
    personalDataTBody[3].appendChild(element);

    element = document.createElement("div");
    element.className = "col";
    element.innerHTML = `${data.telefono}`;
    personalDataTBody[4].appendChild(element);
}

function renderCoursesInTable(courses: Course[]): void {
    courses.forEach(c => {
        let trElement = document.createElement("tr");
        trElement.innerHTML = `<td>${c.name}</td>
                            <td>${c.professor}</td>
                            <td>${c.credits}</td>`;
        coursesTbody.appendChild(trElement);
    })
}

function getTotalCredits(courses: Course[]): number {
    let totalCredits: number = 0;
    courses.forEach((course) => totalCredits += course.credits);
    return totalCredits;
}

function applyFilterByName(): void {
    let text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
    return nameKey == '' ? dataCourses : courses.filter(c => c.name.match(nameKey));
}

function clearCoursesInTable(): void {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild)
        }
    }
}

function applyFilterByCreditsRange(): void {
    let minCredits: string = inputMinCredits.value;
    let maxCredits: string = inputMaxCredits.value;
    clearCoursesInTable();
    let coursesFiltered: Course[] = searchCourseByCreditsRange(+minCredits, +maxCredits, dataCourses);
    renderCoursesInTable(coursesFiltered);
}

function searchCourseByCreditsRange(minCredits: number, maxCredits: number, courses: Course[]): Course[] {
    return courses.filter(c => c.credits >= minCredits && c.credits <= maxCredits);
}