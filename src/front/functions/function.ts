const currentDate: Date = new Date();
let currentMonth: number = currentDate.getMonth();
let currentYear: number = currentDate.getFullYear();

displayCalendar(currentMonth, currentYear);

function displayCalendar(month: number, year: number): void {
    const calendarContainer: HTMLElement | null = document.getElementById("calendar");
    if (calendarContainer) {
        calendarContainer.innerHTML = '';

        const calendarTable: HTMLTableElement = document.createElement("table");

        const header: HTMLTableSectionElement = calendarTable.createTHead();
        const headerRow: HTMLTableRowElement = header.insertRow();

        const prevArrowCell: HTMLTableCellElement = headerRow.insertCell();
        prevArrowCell.innerHTML = '<span class="arrow" onclick="previousMonth()">&#10094;</span>';

        const headerCell: HTMLTableCellElement = headerRow.insertCell();
        headerCell.setAttribute("colspan", "5");
        headerCell.textContent = monthName(month) + " " + year;

        const nextArrowCell: HTMLTableCellElement = headerRow.insertCell();
        nextArrowCell.innerHTML = '<span class="arrow" onclick="nextMonth()">&#10095;</span>';

        const weekdays: string[] = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
        const weekdaysRow: HTMLTableRowElement = calendarTable.insertRow();
        for (let i: number = 0; i < weekdays.length; i++) {
            const cell: HTMLTableCellElement = weekdaysRow.insertCell();
            cell.textContent = weekdays[i];
        }

        const firstDay: Date = new Date(year, month, 1);
        const daysInMonth: number = new Date(year, month + 1, 0).getDate();
        const startingDay: number = firstDay.getDay();

        let date: number = 1;
        for (let row: number = 0; row < 6; row++) {
            const weekRow: HTMLTableRowElement = calendarTable.insertRow();
            for (let col: number = 0; col < 7; col++) {
                if (row === 0 && col < startingDay) {
                    const cell: HTMLTableCellElement = weekRow.insertCell();
                } else if (date > daysInMonth) {
                    break;
                } else {
                    const cell: HTMLTableCellElement = weekRow.insertCell();
                    cell.textContent = date.toString();
                    date++;
                }
            }
        }

        calendarContainer.appendChild(calendarTable);

    }
}



function previousMonth(): void {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    displayCalendar(currentMonth, currentYear);
}

function nextMonth(): void {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    displayCalendar(currentMonth, currentYear);
}

function monthName(month: number): string {
    const monthNames: string[] = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    return monthNames[month];
}




