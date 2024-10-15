<?php
// Include the database connection
include 'db.php';

// Define the upload directory for images
$uploadDir = 'files/';

// Retrieve data from the frontend
$section_name = $_POST['section_name'];
$section_data = json_decode($_POST['section_data'], true);

// Check if the section name is provided
if (empty($section_name)) {
    echo json_encode([
        "status" => "error",
        "message" => "Section name is required."
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

// Update departments
foreach ($section_data as $departmentName => &$department) {
    $newImage = $department['image'];
    $currentImage = null;

    // Check if the department exists in the current data
    if (isset($currentDepartments['departments'][$departmentName])) {
        $currentImage = $currentDepartments['departments'][$departmentName]['image'];
    }

    // If the image details (name, size, type) are different, update the image
    if ($currentImage === null || 
        $newImage['name'] !== $currentImage['name'] || 
        $newImage['size'] !== $currentImage['size'] || 
        $newImage['type'] !== $currentImage['type']) {

        // Delete the old image if it exists
        if ($currentImage !== null && file_exists($uploadDir . $currentImage['name'])) {
            unlink($uploadDir . $currentImage['name']);
        }

        // Save the new image
        $imageData = base64_decode($newImage['data']);
        $filePath = $uploadDir . basename($newImage['name']);
        file_put_contents($filePath, $imageData);

        // Update the department's image details
        $department['image'] = [
            'name' => $newImage['name'],
            'size' => $newImage['size'],
            'type' => $newImage['type'],
            'path' => $filePath
        ];
    } else {
        // If the image is the same, use the existing image details
        $department['image'] = $currentImage;
    }
}

// Update the content table with the new departments data
$updatedData = json_encode(['departments' => $section_data]);
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
    "message" => "Section data updated successfully."
]);
?>