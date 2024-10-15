<?php
// Include the database connection
include 'db.php';

// Retrieve the section name and council name from the frontend
$section_name = $_POST['section_name'];
$council_name = $_POST['council_name'];

// Check if the required data is provided
if (empty($section_name) || empty($council_name)) {
    echo json_encode([
        "status" => "error",
        "message" => "Section name and council name are required."
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

// Get the current section data and decode it as an associative array
$currentData = pg_fetch_assoc($result);
$sectionData = json_decode($currentData['section_data'], true);

// Ensure the current section data is an object
if (!is_array($sectionData)) {
    $sectionData = [];
}

// Check if 'councils' key exists, if not, initialize it as an empty object
if (!isset($sectionData['council']) || !is_array($sectionData['council'])) {
    $sectionData['councils'] = [];
}

// Create a new council object with `text` and `image` set to null
$newcouncil = [
    'text' => null,
    'image' => null
];

// Add the new council to the councils object
$sectionData['council'][$council_name] = $newcouncil;

// Encode the updated data as JSON
$updatedData = json_encode($sectionData);

// Update the content table with the modified section data
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
    "message" => "New council created successfully."
]);
?>
