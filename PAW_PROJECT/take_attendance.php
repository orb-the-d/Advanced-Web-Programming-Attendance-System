<?php

//This file loads all students from students.json,
//  shows them with Present/Absent radios, and when I submit, it creates a JSON file 
// for today like attendance_2025-11-23.json.
//  If today’s file already exists, it shows a warning instead of overwriting.


// take_attendance.php
$date = date("Y-m-d");
$file_name = "attendance_" . $date . ".json";
$message = "";

// Load students
$students = [];
if (file_exists("students.json")) {
    $json = file_get_contents("students.json");
    $students = json_decode($json, true) ?? [];
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (file_exists($file_name)) {
        $message = "Attendance for today has already been taken.";
    } else {
        $attendance = [];

        foreach ($students as $student) {
            $id = $student["student_id"];
            $status = $_POST["status_$id"] ?? "absent"; // default absent
            $attendance[] = [
                "student_id" => $id,
                "status"     => $status
            ];
        }

        file_put_contents($file_name, json_encode($attendance, JSON_PRETTY_PRINT));
        $message = "Attendance saved for $date.";
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Take Attendance (JSON)</title>
</head>
<body>
    <h1>Take Attendance (JSON)</h1>
    <p>Date: <?php echo htmlspecialchars($date); ?></p>
    <p><?php echo htmlspecialchars($message); ?></p>

    <?php if (empty($students)): ?>
        <p>No students found. Please add students first (add_student.php).</p>
    <?php else: ?>
        <form method="post">
            <table border="1" cellpadding="5">
                <tr>
                    <th>Student ID</th>
                    <th>Name</th>
                    <th>Group</th>
                    <th>Present</th>
                    <th>Absent</th>
                </tr>
                <?php foreach ($students as $s): ?>
                    <tr>
                        <td><?php echo htmlspecialchars($s["student_id"]); ?></td>
                        <td><?php echo htmlspecialchars($s["name"]); ?></td>
                        <td><?php echo htmlspecialchars($s["group"]); ?></td>
                        <td><input type="radio" name="status_<?php echo $s["student_id"]; ?>" value="present" checked></td>
                        <td><input type="radio" name="status_<?php echo $s["student_id"]; ?>" value="absent"></td>
                    </tr>
                <?php endforeach; ?>
            </table>
            <br>
            <button type="submit">Save Attendance</button>
        </form>
    <?php endif; ?>
</body>
</html>
