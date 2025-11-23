<?php



//This file just tests if the database connection works, using the function from db_connect.php
// test_connection.php
require_once "db_connect.php";

$conn = getConnection();

if ($conn) {
    echo "Database connection successful.";
    $conn->close();
} else {
    echo "Database connection failed.";
}
