<?php
// add_student.php (JSON version)
$message = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $student_id = trim($_POST["student_id"] ?? "");
    $name       = trim($_POST["name"] ?? "");
    $group      = trim($_POST["group"] ?? "");

    // Simple validation
    if ($student_id === "" || $name === "" || $group === "") {
        $message = "All fields are required.";
    } elseif (!ctype_digit($student_id)) {
        $message = "Student ID must be numbers only.";
    } else {
        // Load existing students.json
        $students = [];
        if (file_exists("students.json")) {
            $json = file_get_contents("students.json");
            $students = json_decode($json, true) ?? [];
        }

        // Add new student
        $students[] = [
            "student_id" => $student_id,
            "name"       => $name,
            "group"      => $group
        ];

        // Save back to JSON
        file_put_contents("students.json", json_encode($students, JSON_PRETTY_PRINT));

        $message = "Student added successfully to students.json.";
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Add Student (JSON)</title>
</head>
<body>
    <h1>Add Student (JSON)</h1>

    <p><?php echo htmlspecialchars($message); ?></p>

    <form method="post">
        <label>
            Student ID:
            <input type="text" name="student_id">
        </label><br><br>

        <label>
            Name:
            <input type="text" name="name">
        </label><br><br>

        <label>
            Group:
            <input type="text" name="group">
        </label><br><br>

        <button type="submit">Add</button>
    </form>
</body>
</html>
