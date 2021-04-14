import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';
var personalDataTBody = [
    document.getElementById('codigoRow'),
    document.getElementById('cedulaRow'),
    document.getElementById('edadRow'),
    document.getElementById('direccionRow'),
    document.getElementById('telefonoRow')
];
var coursesTbody = document.getElementById('courses');
var btnfilterByName = document.getElementById("button-filterByName");
var inputSearchBox = document.getElementById("search-box");
var btnFilterByCreditsRange = document.getElementById("button-filterByCreditsRange");
var inputMinCredits = document.getElementById("search-box-minCreditos");
var inputMaxCredits = document.getElementById("search-box-maxCreditos");
var totalCreditElm = document.getElementById("total-credits");
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnFilterByCreditsRange.onclick = function () { return applyFilterByCreditsRange(); };
totalCreditElm.textContent = getTotalCredits(dataCourses) + "";
renderPersonalDataInTable(dataStudent);
renderCoursesInTable(dataCourses);
function renderPersonalDataInTable(data) {
    var element = document.createElement("div");
    element.className = "col";
    element.innerHTML = "" + data.codigo;
    personalDataTBody[0].appendChild(element);
    element = document.createElement("div");
    element.className = "col";
    element.innerHTML = "" + data.cedula;
    personalDataTBody[1].appendChild(element);
    element = document.createElement("div");
    element.className = "col";
    element.innerHTML = "" + data.edad;
    personalDataTBody[2].appendChild(element);
    element = document.createElement("div");
    element.className = "col";
    element.innerHTML = "" + data.direccion;
    personalDataTBody[3].appendChild(element);
    element = document.createElement("div");
    element.className = "col";
    element.innerHTML = "" + data.telefono;
    personalDataTBody[4].appendChild(element);
}
function renderCoursesInTable(courses) {
    courses.forEach(function (c) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + c.name + "</td>\n                            <td>" + c.professor + "</td>\n                            <td>" + c.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits += course.credits; });
    return totalCredits;
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey == '' ? dataCourses : courses.filter(function (c) { return c.name.match(nameKey); });
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
function applyFilterByCreditsRange() {
    var minCredits = inputMinCredits.value;
    var maxCredits = inputMaxCredits.value;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByCreditsRange(+minCredits, +maxCredits, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByCreditsRange(minCredits, maxCredits, courses) {
    return courses.filter(function (c) { return c.credits >= minCredits && c.credits <= maxCredits; });
}
