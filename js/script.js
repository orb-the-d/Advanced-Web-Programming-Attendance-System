
$(document).ready(function() {
    
   
    function updateAttendanceData() {
        $('#attendanceBody tr').each(function() {
            const row = $(this);
            const absences = parseInt(row.find('.absences').text());
            const participation = parseInt(row.find('.participation').text());
            
          
            row.removeClass('row-green row-yellow row-red');
            
            
            if (absences < 3) {
                row.addClass('row-green');
            } else if (absences >= 3 && absences <= 4) {
                row.addClass('row-yellow');
            } else {
                row.addClass('row-red');
            }
            
           
            let message = '';
            if (absences >= 5) {
                message = 'Excluded – too many absences';
            } else if (absences >= 3) {
                message = 'Warning – attendance low';
            } else {
                message = 'Good attendance';
            }
            
            if (participation >= 4) {
                message += ' – Excellent participation';
            } else if (participation >= 2) {
                message += ' – Good participation';
            } else {
                message += ' – You need to participate more';
            }
            
            row.find('.message').text(message);
        });
    }
    
    
    updateAttendanceData();
    
    
    
    
    $('#studentForm').on('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        
        $('.error-message').hide();
        
       
        const studentId = $('#studentId').val().trim();
        if (studentId === '' || !/^\d+$/.test(studentId)) {
            $('#errorStudentId').show();
            isValid = false;
        }
        
        
        const lastName = $('#lastName').val().trim();
        if (lastName === '' || !/^[A-Za-z]+$/.test(lastName)) {
            $('#errorLastName').show();
            isValid = false;
        }
        
        
        const firstName = $('#firstName').val().trim();
        if (firstName === '' || !/^[A-Za-z]+$/.test(firstName)) {
            $('#errorFirstName').show();
            isValid = false;
        }
        
        
        const email = $('#email').val().trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '' || !emailRegex.test(email)) {
            $('#errorEmail').show();
            isValid = false;
        }
        
        
        
        if (isValid) {
            const newRow = `
                <tr data-lastname="${lastName}" data-firstname="${firstName}">
                    <td>${lastName}</td>
                    <td>${firstName}</td>
                    <td class="attendance-cell presence-cell"><div class="checkbox-square"></div></td>
                    <td class="attendance-cell participation-cell"><div class="checkbox-square"></div></td>
                    <td class="attendance-cell presence-cell"><div class="checkbox-square"></div></td>
                    <td class="attendance-cell participation-cell"><div class="checkbox-square"></div></td>
                    <td class="attendance-cell presence-cell"><div class="checkbox-square"></div></td>
                    <td class="attendance-cell participation-cell"><div class="checkbox-square"></div></td>
                    <td class="attendance-cell presence-cell"><div class="checkbox-square"></div></td>
                    <td class="attendance-cell participation-cell"><div class="checkbox-square"></div></td>
                    <td class="attendance-cell presence-cell"><div class="checkbox-square"></div></td>
                    <td class="attendance-cell participation-cell"><div class="checkbox-square"></div></td>
                    <td class="attendance-cell presence-cell"><div class="checkbox-square"></div></td>
                    <td class="attendance-cell participation-cell"><div class="checkbox-square"></div></td>
                    <td class="absences">6</td>
                    <td class="participation">0</td>
                    <td class="message"></td>
                </tr>
            `;
            
            $('#attendanceBody').append(newRow);
            updateAttendanceData();
            
            
            $('#studentForm')[0].reset();
            
            
            $('#successMessage').fadeIn().delay(3000).fadeOut();
        }
    });
    
    
    
    $('#showReport').on('click', function() {
        const totalStudents = $('#attendanceBody tr').length;
        
        let studentsPresent = 0;
        $('#attendanceBody tr').each(function() {
            const hasPresence = $(this).find('.presence-cell .checkbox-square.checked').length > 0;
            if (hasPresence) studentsPresent++;
        });
        
        let studentsParticipated = 0;
        $('#attendanceBody tr').each(function() {
            const hasParticipation = $(this).find('.participation-cell .checkbox-square.checked').length > 0;
            if (hasParticipation) studentsParticipated++;
        });
        
        $('#totalStudents').text(totalStudents);
        $('#totalPresent').text(studentsPresent);
        $('#totalParticipated').text(studentsParticipated);
        
        $('#reportSection').slideDown();
    });
    
    
    $('#attendanceBody').on('click', '.checkbox-square', function(e) {
        e.stopPropagation(); 
        
        $(this).toggleClass('checked');
        
        if ($(this).hasClass('checked')) {
            $(this).text('✓');
        } else {
            $(this).text('');
        }
        
        const row = $(this).closest('tr');
        
        const presenceCells = row.find('.presence-cell .checkbox-square.checked').length;
        const totalSessions = 6;
        const absences = totalSessions - presenceCells;
        
        const participation = row.find('.participation-cell .checkbox-square.checked').length;
        
        row.find('.absences').text(absences);
        row.find('.participation').text(participation);
        
        updateAttendanceData();
    });
    
    
    $('#attendanceBody').on('mouseenter', 'tr', function() {
        $(this).addClass('highlight');
    }).on('mouseleave', 'tr', function() {
        $(this).removeClass('highlight');
    }).on('click', 'tr', function(e) {
        if (!$(e.target).closest('.attendance-cell').length) {
            const lastName = $(this).find('td:first').text();
            const firstName = $(this).find('td:nth-child(2)').text();
            const absences = $(this).find('.absences').text();
            alert(`Student: ${firstName} ${lastName}\nAbsences: ${absences}`);
        }
    });
    
    
    $('#highlightExcellent').on('click', function() {
        $('#attendanceBody tr').each(function() {
            const absences = parseInt($(this).find('.absences').text());
            if (absences < 3) {
                $(this).addClass('excellent-student');
                setTimeout(() => {
                    $(this).removeClass('excellent-student');
                }, 4500);
            }
        });
    });
    
    $('#resetColors').on('click', function() {
        updateAttendanceData();
        $('#attendanceBody tr').removeClass('excellent-student');
    });
    
    
    $('#searchInput').on('keyup', function() {
        const searchTerm = $(this).val().toLowerCase();
        
        $('#attendanceBody tr').filter(function() {
            const lastName = $(this).data('lastname').toLowerCase();
            const firstName = $(this).data('firstname').toLowerCase();
            const matches = lastName.includes(searchTerm) || firstName.includes(searchTerm);
            $(this).toggle(matches);
        });
    });
    
    $('#sortByAbsences').on('click', function() {
        const rows = $('#attendanceBody tr').get();
        
        rows.sort(function(a, b) {
            const absA = parseInt($(a).find('.absences').text());
            const absB = parseInt($(b).find('.absences').text());
            return absA - absB;
        });
        
        $.each(rows, function(index, row) {
            $('#attendanceBody').append(row);
        });
        
        $('#sortIndicator').text('Currently sorted by absences (ascending)');
    });
    
    $('#sortByParticipation').on('click', function() {
        const rows = $('#attendanceBody tr').get();
        
        rows.sort(function(a, b) {
            const partA = parseInt($(a).find('.participation').text());
            const partB = parseInt($(b).find('.participation').text());
            return partB - partA;
        });
        
        $.each(rows, function(index, row) {
            $('#attendanceBody').append(row);
        });
        
        $('#sortIndicator').text('Currently sorted by participation (descending)');
    });
});
