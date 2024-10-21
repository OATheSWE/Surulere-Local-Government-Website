<?php
// Include the database connection
include 'db.php';

// Fetch all departments from the database
$query = "SELECT * FROM departments";
$result = pg_query($connection, $query);

// Check if the query was successful
if (!$result) {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to fetch departments: " . pg_last_error()
    ]);
    exit;
}

// Initialize an array to store departments
$departments = [];

// Fetch each department and store it in the array
while ($row = pg_fetch_assoc($result)) {
    $departments[] = $row;
}

// Return the departments as a JSON response
echo json_encode([
    "status" => "success",
    "departments" => $departments
]);
?>
