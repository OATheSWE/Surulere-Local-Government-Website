<?php
// Include the database connection
include 'db.php';

// Retrieve the department_id from the frontend
$department_id = $_POST['department_id'];

// Check if the department_id is provided
if (empty($department_id)) {
    echo json_encode([
        "status" => "error",
        "message" => "Department ID is required."
    ]);
    exit;
}

// Check if the department exists in the database
$checkQuery = "SELECT * FROM departments WHERE department_id = $1";
$checkResult = pg_query_params($connection, $checkQuery, [$department_id]);

if (!$checkResult || pg_num_rows($checkResult) === 0) {
    echo json_encode([
        "status" => "error",
        "message" => "Department not found."
    ]);
    exit;
}

// Delete the department from the departments table
$deleteQuery = "DELETE FROM departments WHERE department_id = $1";
$deleteResult = pg_query_params($connection, $deleteQuery, [$department_id]);

if (!$deleteResult) {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to delete department: " . pg_last_error()
    ]);
    exit;
}

// Return a success response
echo json_encode([
    "status" => "success",
    "message" => "Department deleted successfully."
]);
?>
