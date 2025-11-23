<?php
//This file defines one function getConnection() that uses config.php
// and returns a mysqli connection, or null if it fails
// db_connect.php
require_once "config.php";

function getConnection() {
    global $db_host, $db_user, $db_pass, $db_name;

    // Create connection
    $conn = @new mysqli($db_host, $db_user, $db_pass, $db_name);

    // Check connection
    if ($conn->connect_error) {
        // Optional: log error
        error_log("DB connection failed: " . $conn->connect_error);
        return null;
    }
    return $conn;
}
