

<?php

//This file connects to the DB, selects all rows from students, and shows them in a simple HTML table

// list_students.php

require_once "db_connect.php";

$conn = getConnection();
$result = null;
$error  = "";

if ($conn) {
    $result = $conn->query("SELECT * FROM students");
    if (!$result) {
        $error = "Query error: " . $conn->error;
    }
} else {
    $error = "Database connection failed.";
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>List Students</title>
</head>
<body>
    <h1>Students (Database)</h1>

    <?php if ($error !== ""): ?>
        <p><?php echo htmlspecialchars($error); ?></p>
    <?php elseif ($result && $result->num_rows > 0): ?>
        <table border="1" cellpadding="5">
            <tr>
                <th>ID</th>
                <th>Full name</th>
                <th>Matricule</th>
                <th>Group</th>
            </tr>
            <?php while ($row = $result->fetch_assoc()): ?>
                <tr>
                    <td><?php echo htmlspecialchars($row["id"]); ?></td>
                    <td><?php echo htmlspecialchars($row["fullname"]); ?></td>
                    <td><?php echo htmlspecialchars($row["matricule"]); ?></td>
                    <td><?php echo htmlspecialchars($row["group_id"]); ?></td>
                </tr>
            <?php endwhile; ?>
        </table>
    <?php else: ?>
        <p>No students found.</p>
    <?php endif; ?>

    <?php if ($conn) $conn->close(); ?>
</body>
</html>
