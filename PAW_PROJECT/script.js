//This file controls all the behavior: it validates the add-student form,
//  adds new rows to the table, lets me click the boxes to mark presence and participation,
//  recalculates absences and participation,
//  changes row colors, filters by name, sorts the rows, and generates the small report

$(document).ready(function () {

    // Recalculate absences, participation and colors for all rows
    function updateAttendanceData() {
        $('#attendanceBody tr').each(function () {
            const row = $(this);

            // count checked presence boxes
            const presenceChecked = row.find('.presence .box.checked').length;
            const totalSessions = 6;
            const absences = totalSessions - presenceChecked;

            // count checked participation boxes
            const participationChecked = row.find('.participation .box.checked').length;

            // write numbers in table
            row.find('.absences').text(absences);
            row.find('.participation-count').text(participationChecked);

            // set row color
            row.removeClass('row-green row-yellow row-red');
            if (absences < 3) {
                row.addClass('row-green');
            } else if (absences >= 3 && absences <= 4) {
                row.addClass('row-yellow');
            } else {
                row.addClass('row-red');
            }

            // message
            let msg = '';
            if (absences >= 5) {
                msg = 'Too many absences';
            } else if (absences >= 3) {
                msg = 'Warning';
            } else {
                msg = 'Good attendance';
            }

            if (participationChecked >= 4) {
                msg += ' – Excellent participation';
            } else if (participationChecked >= 2) {
                msg += ' – Good participation';
            } else {
                msg += ' – Low participation';
            }

            row.find('.message').text(msg);
        });
    }

    // initial call
    updateAttendanceData();

    // Toggle box when clicked
    $('#attendanceBody').on('click', '.box', function (e) {
        e.stopPropagation();
        $(this).toggleClass('checked');
        if ($(this).hasClass('checked')) {
            $(this).text('✓');
        } else {
            $(this).text('');
        }
        updateAttendanceData();
    });

    // Simple row hover + alert on click (student info)
    $('#attendanceBody').on('click', 'tr', function (e) {
        if ($(e.target).hasClass('box')) return;
        const lastName = $(this).data('lastname');
        const firstName = $(this).data('firstname');
        const abs = $(this).find('.absences').text();
        alert('Student: ' + firstName + ' ' + lastName + '\nAbsences: ' + abs);
    });

    // Form validation + add student
    $('#studentForm').on('submit', function (e) {
        e.preventDefault();

        $('.error').hide();
        let ok = true;

        const id = $('#studentId').val().trim();
        const ln = $('#lastName').val().trim();
        const fn = $('#firstName').val().trim();
        const email = $('#email').val().trim();

        if (!/^\d+$/.test(id)) {
            $('#errorStudentId').show(); ok = false;
        }
        if (!/^[A-Za-z]+$/.test(ln)) {
            $('#errorLastName').show(); ok = false;
        }
        if (!/^[A-Za-z]+$/.test(fn)) {
            $('#errorFirstName').show(); ok = false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            $('#errorEmail').show(); ok = false;
        }

        if (!ok) return;

        // create empty row (all absent initially)
        const newRow = `
        <tr data-lastname="${ln}" data-firstname="${fn}">
            <td>${ln}</td>
            <td>${fn}</td>
            ${[1,2,3,4,5,6].map(() =>
                '<td class="presence"><div class="box"></div></td>' +
                '<td class="participation"><div class="box"></div></td>'
            ).join('')}
            <td class="absences">6</td>
            <td class="participation-count">0</td>
            <td class="message"></td>
        </tr>`;

        $('#attendanceBody').append(newRow);
        $('#studentForm')[0].reset();
        $('#successMessage').show().delay(2000).fadeOut();
        updateAttendanceData();
    });

    // Search by name
    $('#searchInput').on('keyup', function () {
        const term = $(this).val().toLowerCase();
        $('#attendanceBody tr').each(function () {
            const ln = $(this).data('lastname').toLowerCase();
            const fn = $(this).data('firstname').toLowerCase();
            const match = ln.includes(term) || fn.includes(term);
            $(this).toggle(match);
        });
    });

    // Sort by absences
    $('#sortByAbsences').on('click', function () {
        const rows = $('#attendanceBody tr').get();
        rows.sort(function (a, b) {
            const aAbs = parseInt($(a).find('.absences').text());
            const bAbs = parseInt($(b).find('.absences').text());
            return aAbs - bAbs;
        });
        $('#attendanceBody').empty().append(rows);
        $('#sortIndicator').text('Sorted by absences (ascending)');
    });

    // Sort by participation
    $('#sortByParticipation').on('click', function () {
        const rows = $('#attendanceBody tr').get();
        rows.sort(function (a, b) {
            const aP = parseInt($(a).find('.participation-count').text());
            const bP = parseInt($(b).find('.participation-count').text());
            return bP - aP;
        });
        $('#attendanceBody').empty().append(rows);
        $('#sortIndicator').text('Sorted by participation (descending)');
    });

    // Highlight excellent (absences < 3)
    $('#highlightExcellent').on('click', function () {
        $('#attendanceBody tr').each(function () {
            const abs = parseInt($(this).find('.absences').text());
            if (abs < 3) {
                $(this).addClass('highlight');
                setTimeout(() => $(this).removeClass('highlight'), 2000);
            }
        });
    });

    // Reset colors (just recalc)
    $('#resetColors').on('click', function () {
        updateAttendanceData();
    });

    // Report
    $('#showReport').on('click', function () {
        const total = $('#attendanceBody tr').length;
        let presentCount = 0;
        let participatedCount = 0;

        $('#attendanceBody tr').each(function () {
            const hasPresence = $(this).find('.presence .box.checked').length > 0;
            const hasParticipation = $(this).find('.participation .box.checked').length > 0;
            if (hasPresence) presentCount++;
            if (hasParticipation) participatedCount++;
        });

        $('#totalStudents').text(total);
        $('#totalPresent').text(presentCount);
        $('#totalParticipated').text(participatedCount);
        $('#report').show();
    });
});
