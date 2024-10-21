<?php
// Include the database connection
include 'db.php';

// Define the upload directory for images
$uploadDir = 'uploads/';

// Retrieve data from the frontend
$blog_id = $_POST['blog_id'];
$blog_data = json_decode($_POST['blog_data'], true);

// Check if blog_id and blog_data are provided
if (empty($blog_id) || empty($blog_data)) {
    echo json_encode([
        "status" => "error",
        "message" => "Blog ID and data are required."
    ]);
    exit;
}

// Check if the blog exists in the database
$checkQuery = "SELECT * FROM blogs WHERE blog_id = $1";
$checkResult = pg_query_params($connection, $checkQuery, [$blog_id]);

if (!$checkResult || pg_num_rows($checkResult) === 0) {
    echo json_encode([
        "status" => "error",
        "message" => "Blog not found."
    ]);
    exit;
}

// Get the current blog data
$currentBlog = pg_fetch_assoc($checkResult);
$currentBlogData = json_decode($currentBlog['blog_data'], true);

// Process the image if the image object is provided
$image = $blog_data['image'] ?? null;
if ($image && !isset($image['file_path'])) {
    // Delete the old image file if a new image is uploaded
    if (isset($currentBlogData['image']['file_path'])) {
        unlink($currentBlogData['image']['file_path']);
    }

    // Save the new image to the upload directory
    $imageData = base64_decode($image['data']);
    $filePath = $uploadDir . basename($image['name']);
    if (!file_put_contents($filePath, $imageData)) {
        echo json_encode([
            "status" => "error",
            "message" => "Failed to save the new image."
        ]);
        exit;
    }

    // Update the image object to store the new file path
    $blog_data['image'] = [
        'name' => $image['name'],
        'size' => $image['size'],
        'type' => $image['type'],
        'file_path' => $filePath
    ];
}

// Update the blog in the blogs table
$updateQuery = "UPDATE blogs SET blog_data = $1 WHERE blog_id = $2";
$updateResult = pg_query_params($connection, $updateQuery, [json_encode($blog_data), $blog_id]);

if (!$updateResult) {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to update blog: " . pg_last_error()
    ]);
    exit;
}

// Return a success response
echo json_encode([
    "status" => "success",
    "message" => "Blog updated successfully."
]);
?>
