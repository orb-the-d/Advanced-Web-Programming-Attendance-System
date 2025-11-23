<!-- This file builds the page: the navigation bar, the form to add students,
  the search and buttons, the attendance table with the checkboxes,
  and the report section. It also links to styles.css and script.js-->


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Student Attendance System</title>
    <link rel="stylesheet" href="styles.css">
    <!-- jQuery for Tutorial 2 (required by teacher) -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>

    <!-- Simple Navbar -->
    <nav class="navbar">
        <span class="brand">Student Attendance System</span>
        <a href="index.php">Home (JS Attendance)</a>
        <a href="add_student.php">Add Student (JSON)</a>
        <a href="take_attendance.php">Take Attendance (JSON)</a>
        <a href="add_student_db.php">Add Student (DB)</a>
        <a href="list_students.php">List Students (DB)</a>
    </nav>


    <div class="container">

        <!-- Add Student Form -->
        <section id="add-student" class="card">
            <h2>Add New Student</h2>
            <form id="studentForm">
                <label>
                    Student ID:
                    <input type="text" id="studentId">
                    <span class="error" id="errorStudentId">Numbers only</span>
                </label>
                <label>
                    Last Name:
                    <input type="text" id="lastName">
                    <span class="error" id="errorLastName">Letters only</span>
                </label>
                <label>
                    First Name:
                    <input type="text" id="firstName">
                    <span class="error" id="errorFirstName">Letters only</span>
                </label>
                <label>
                    Email:
                    <input type="text" id="email">
                    <span class="error" id="errorEmail">Invalid email</span>
                </label>
                <button type="submit">Add Student</button>
            </form>
            <p class="success" id="successMessage">Student added!</p>
        </section>

        <!-- Controls: search + buttons -->
        <section class="card" id="controls">
            <h2>Controls</h2>
            <input type="text" id="searchInput" placeholder="Search by name...">

            <div class="buttons">
                <button id="sortByAbsences">Sort by Absences</button>
                <button id="sortByParticipation">Sort by Participation</button>
                <button id="highlightExcellent">Highlight Excellent</button>
                <button id="resetColors">Reset Colors</button>
                <button id="showReport">Show Report</button>
            </div>

            <p id="sortIndicator">No sorting applied</p>
        </section>

        <!-- Attendance Table -->
        <section class="card" id="attendance">
            <h2>Attendance Table</h2>
            <table id="attendanceTable">
                <thead>
                    <tr>
                        <th>Last Name</th>
                        <th>First Name</th>
                        <th>S1 P</th><th>S1 Pa</th>
                        <th>S2 P</th><th>S2 Pa</th>
                        <th>S3 P</th><th>S3 Pa</th>
                        <th>S4 P</th><th>S4 Pa</th>
                        <th>S5 P</th><th>S5 Pa</th>
                        <th>S6 P</th><th>S6 Pa</th>
                        <th>Absences</th>
                        <th>Participation</th>
                        <th>Message</th>
                    </tr>
                </thead>
                <tbody id="attendanceBody">
                    <!-- Example students -->
                    <tr data-lastname="Ahmed" data-firstname="Sara">
                        <td>Ahmed</td>
                        <td>Sara</td>
                        <!-- 6 sessions × 2 columns (P and Pa) -->
                        <td class="presence"><div class="box"></div></td>
                        <td class="participation"><div class="box"></div></td>

                        <td class="presence"><div class="box checked">✓</div></td>
                        <td class="participation"><div class="box checked">✓</div></td>

                        <td class="presence"><div class="box"></div></td>
                        <td class="participation"><div class="box"></div></td>

                        <td class="presence"><div class="box"></div></td>
                        <td class="participation"><div class="box"></div></td>

                        <td class="presence"><div class="box"></div></td>
                        <td class="participation"><div class="box"></div></td>

                        <td class="presence"><div class="box"></div></td>
                        <td class="participation"><div class="box"></div></td>

                        <td class="absences">5</td>
                        <td class="participation-count">1</td>
                        <td class="message"></td>
                    </tr>

                    <tr data-lastname="Yacine" data-firstname="Ali">
                        <td>Yacine</td>
                        <td>Ali</td>

                        <td class="presence"><div class="box checked">✓</div></td>
                        <td class="participation"><div class="box"></div></td>

                        <td class="presence"><div class="box"></div></td>
                        <td class="participation"><div class="box"></div></td>

                        <td class="presence"><div class="box checked">✓</div></td>
                        <td class="participation"><div class="box checked">✓</div></td>

                        <td class="presence"><div class="box checked">✓</div></td>
                        <td class="participation"><div class="box checked">✓</div></td>

                        <td class="presence"><div class="box checked">✓</div></td>
                        <td class="participation"><div class="box checked">✓</div></td>

                        <td class="presence"><div class="box checked">✓</div></td>
                        <td class="participation"><div class="box"></div></td>

                        <td class="absences">1</td>
                        <td class="participation-count">4</td>
                        <td class="message"></td>
                    </tr>

                    <!-- You keep the other rows similar (Houcine/Rania, Benali/Karim) -->
                </tbody>
            </table>
        </section>

        <!-- Report Section -->
        <section class="card" id="report" style="display:none;">
            <h2>Report</h2>
            <p>Total students: <span id="totalStudents">0</span></p>
            <p>Students present at least once: <span id="totalPresent">0</span></p>
            <p>Students who participated at least once: <span id="totalParticipated">0</span></p>
        </section>

    </div>

    <script src="script.js"></script>
</body>
</html>
