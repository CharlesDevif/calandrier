"use strict";
const currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
displayCalendar(currentMonth, currentYear);
function displayCalendar(month, year) {
    const calendarContainer = document.getElementById("calendar");
    if (calendarContainer) {
        calendarContainer.innerHTML = '';
        const calendarTable = document.createElement("table");
        const header = calendarTable.createTHead();
        const headerRow = header.insertRow();
        const prevArrowCell = headerRow.insertCell();
        prevArrowCell.innerHTML = '<span class="arrow" onclick="previousMonth()">&#10094;</span>';
        const headerCell = headerRow.insertCell();
        headerCell.setAttribute("colspan", "5");
        headerCell.textContent = monthName(month) + " " + year;
        const nextArrowCell = headerRow.insertCell();
        nextArrowCell.innerHTML = '<span class="arrow" onclick="nextMonth()">&#10095;</span>';
        const weekdays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
        const weekdaysRow = calendarTable.insertRow();
        for (let i = 0; i < weekdays.length; i++) {
            const cell = weekdaysRow.insertCell();
            cell.textContent = weekdays[i];
        }
        const firstDay = new Date(year, month, 1);
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const startingDay = firstDay.getDay();
        let date = 1;
        for (let row = 0; row < 6; row++) {
            const weekRow = calendarTable.insertRow();
            for (let col = 0; col < 7; col++) {
                if (row === 0 && col < startingDay) {
                    const cell = weekRow.insertCell();
                }
                else if (date > daysInMonth) {
                    break;
                }
                else {
                    const cell = weekRow.insertCell();
                    cell.textContent = date.toString();
                    date++;
                }
            }
        }
        calendarContainer.appendChild(calendarTable);
    }
}
function previousMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    displayCalendar(currentMonth, currentYear);
}
function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    displayCalendar(currentMonth, currentYear);
}
function monthName(month) {
    const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    return monthNames[month];
}
