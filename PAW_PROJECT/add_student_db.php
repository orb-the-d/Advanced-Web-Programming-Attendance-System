
<?php


//This file shows a form to add a student 
// directly into the students table in the database using getConnection()


// add_student_db.php
require_once "db_connect.php";

$message = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $fullname  = trim($_POST["fullname"] ?? "");
    $matricule = trim($_POST["matricule"] ?? "");
    $group_id  = trim($_POST["group_id"] ?? "");

    if ($fullname === "" || $matricule === "" || $group_id === "") {
        $message = "All fields are required.";
    } else {
        $conn = getConnection();
        if ($conn) {
            $stmt = $conn->prepare(
                "INSERT INTO students (fullname, matricule, group_id) VALUES (?, ?, ?)"
            );
            $stmt->bind_param("sss", $fullname, $matricule, $group_id);
            if ($stmt->execute()) {
                $message = "Student added to database.";
            } else {
                $message = "Error: " . $conn->error;
            }
            $stmt->close();
            $conn->close();
        } else {
            $message = "Database connection failed.";
        }
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Add Student (DB)</title>
</head>
<body>
    <h1>Add Student (Database)</h1>
    <p><?php echo htmlspecialchars($message); ?></p>

    <form method="post">
        <label>
            Full name:
            <input type="text" name="fullname">
        </label><br><br>

        <label>
            Matricule:
            <input type="text" name="matricule">
        </label><br><br>

        <label>
            Group ID:
            <input type="text" name="group_id">
        </label><br><br>

        <button type="submit">Add</button>
    </form>
</body>
</html>
