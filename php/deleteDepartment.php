<?php
// Include the database connection
include 'db.php';

// Retrieve data from the frontend
$section_name = $_POST['section_name'];
$department_name = $_POST['department_name'];

// Check if both section_name and department_name are provided
if (empty($section_name) || empty($department_name)) {
    echo json_encode([
        "status" => "error",
        "message" => "Both section name and department name are required."
    ]);
    exit;
}

// Fetch the current data for the specified section
$query = "SELECT section_data FROM content WHERE section_name = $1";
$result = pg_query_params($connection, $query, [$section_name]);

if (!$result) {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to fetch section data: " . pg_last_error()
    ]);
    exit;
}

$currentData = pg_fetch_assoc($result);
$currentDepartments = json_decode($currentData['section_data'], true);

// Check if the department exists in the current data
if (!isset($currentDepartments['departments'][$department_name])) {
    echo json_encode([
        "status" => "error",
        "message" => "The specified department does not exist."
    ]);
    exit;
}

// Delete the department from the departments object
unset($currentDepartments['departments'][$department_name]);

// Update the content table with the modified departments data
$updatedData = json_encode($currentDepartments);
$updateQuery = "UPDATE content SET section_data = $1 WHERE section_name = $2";
$updateResult = pg_query_params($connection, $updateQuery, [$updatedData, $section_name]);

if (!$updateResult) {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to update section data: " . pg_last_error()
    ]);
    exit;
}

// Return a success response
echo json_encode([
    "status" => "success",
    "message" => "Department deleted successfully."
]);
?>
