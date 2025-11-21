// Wait for DOM to be ready
$(document).ready(function() {
    
    // ==================== EXERCISE 1 - Tutorial 2 ====================
    // Calculate absences, participation, and color code rows
    function updateAttendanceData() {
        $('#attendanceBody tr').each(function() {
            const row = $(this);
            const absences = parseInt(row.find('.absences').text());
            const participation = parseInt(row.find('.participation').text());
            
            // Remove existing color classes
            row.removeClass('row-green row-yellow row-red');
            
            // Apply color based on absences
            if (absences < 3) {
                row.addClass('row-green');
            } else if (absences >= 3 && absences <= 4) {
                row.addClass('row-yellow');
            } else {
                row.addClass('row-red');
            }
            
            // Generate message
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
    
    // Initialize attendance data
    updateAttendanceData();
    
    
    // ==================== EXERCISE 2 - Tutorial 2 ====================
    // Form validation
    $('#studentForm').on('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Hide all error messages
        $('.error-message').hide();
        
        // Validate Student ID (numbers only)
        const studentId = $('#studentId').val().trim();
        if (studentId === '' || !/^\d+$/.test(studentId)) {
            $('#errorStudentId').show();
            isValid = false;
        }
        
        // Validate Last Name (letters only)
        const lastName = $('#lastName').val().trim();
        if (lastName === '' || !/^[A-Za-z]+$/.test(lastName)) {
            $('#errorLastName').show();
            isValid = false;
        }
        
        // Validate First Name (letters only)
        const firstName = $('#firstName').val().trim();
        if (firstName === '' || !/^[A-Za-z]+$/.test(firstName)) {
            $('#errorFirstName').show();
            isValid = false;
        }
        
        // Validate Email
        const email = $('#email').val().trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '' || !emailRegex.test(email)) {
            $('#errorEmail').show();
            isValid = false;
        }
        
        
        // ==================== EXERCISE 3 - Tutorial 2 ====================
        // Add student to table if valid
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
            
            // Reset form
            $('#studentForm')[0].reset();
            
            // Show success message
            $('#successMessage').fadeIn().delay(3000).fadeOut();
        }
    });
    
    
    // ==================== EXERCISE 4 - Tutorial 2 ====================
    // Show Report with statistics
    $('#showReport').on('click', function() {
        const totalStudents = $('#attendanceBody tr').length;
        
        // Count students present (at least one checkmark in Present columns)
        let studentsPresent = 0;
        $('#attendanceBody tr').each(function() {
            const hasPresence = $(this).find('.presence-cell .checkbox-square.checked').length > 0;
            if (hasPresence) studentsPresent++;
        });
        
        // Count students who participated (at least one checkmark in Participation columns)
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
    
    
    // ==================== INTERACTIVE ATTENDANCE CELLS ====================
    // Click to toggle presence/participation
    $('#attendanceBody').on('click', '.checkbox-square', function(e) {
        e.stopPropagation(); // Prevent row click event
        
        $(this).toggleClass('checked');
        
        if ($(this).hasClass('checked')) {
            $(this).text('✓');
        } else {
            $(this).text('');
        }
        
        // Recalculate absences and participation for this row
        const row = $(this).closest('tr');
        
        // Count presence (checked presence cells)
        const presenceCells = row.find('.presence-cell .checkbox-square.checked').length;
        const totalSessions = 6;
        const absences = totalSessions - presenceCells;
        
        // Count participation
        const participation = row.find('.participation-cell .checkbox-square.checked').length;
        
        // Update counts
        row.find('.absences').text(absences);
        row.find('.participation').text(participation);
        
        // Update colors and messages
        updateAttendanceData();
    });
    
    
    // ==================== EXERCISE 5 - Tutorial 2 ====================
    // Hover effect and click to show student info
    $('#attendanceBody').on('mouseenter', 'tr', function() {
        $(this).addClass('highlight');
    }).on('mouseleave', 'tr', function() {
        $(this).removeClass('highlight');
    }).on('click', 'tr', function(e) {
        // Only trigger if not clicking on attendance cell
        if (!$(e.target).closest('.attendance-cell').length) {
            const lastName = $(this).find('td:first').text();
            const firstName = $(this).find('td:nth-child(2)').text();
            const absences = $(this).find('.absences').text();
            alert(`Student: ${firstName} ${lastName}\nAbsences: ${absences}`);
        }
    });
    
    
    // ==================== EXERCISE 6 - Tutorial 2 ====================
    // Highlight Excellent Students (< 3 absences)
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
    
    // Reset Colors button
    $('#resetColors').on('click', function() {
        updateAttendanceData();
        $('#attendanceBody tr').removeClass('excellent-student');
    });
    
    
    // ==================== EXERCISE 7 - Tutorial 2 V2 ====================
    // Search functionality
    $('#searchInput').on('keyup', function() {
        const searchTerm = $(this).val().toLowerCase();
        
        $('#attendanceBody tr').filter(function() {
            const lastName = $(this).data('lastname').toLowerCase();
            const firstName = $(this).data('firstname').toLowerCase();
            const matches = lastName.includes(searchTerm) || firstName.includes(searchTerm);
            $(this).toggle(matches);
        });
    });
    
    // Sort by Absences (Ascending)
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
    
    // Sort by Participation (Descending)
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
