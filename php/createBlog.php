<?php
// Include the database connection
include 'db.php';

// Define the upload directory for images
$uploadDir = 'uploads/';

// Retrieve the blog data from the frontend
$blog_data = json_decode($_POST['blog_data'], true);

// Check if blog_data is provided and contains required fields
if (empty($blog_data) || !isset($blog_data['title'], $blog_data['content'], $blog_data['image'])) {
    echo json_encode([
        "status" => "error",
        "message" => "Blog data is incomplete."
    ]);
    exit;
}

// Process the image if provided
$image = $blog_data['image'];
if (!isset($image['name'], $image['size'], $image['type'], $image['data'])) {
    echo json_encode([
        "status" => "error",
        "message" => "Incomplete image data provided."
    ]);
    exit;
}

// Decode the base64 image data and save the image
$imageData = base64_decode($image['data']);
$filePath = $uploadDir . basename($image['name']);
if (!file_put_contents($filePath, $imageData)) {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to save the image."
    ]);
    exit;
}

// Update the image object to store the file path and remove the data key
$blog_data['image'] = [
    'name' => $image['name'],
    'size' => $image['size'],
    'type' => $image['type'],
    'file_path' => $filePath
];

// Generate an 8-character blog ID
$blog_id = substr(str_shuffle("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, 8);

// Insert the new blog into the blogs table
$query = "INSERT INTO blogs (blog_id, blog_data) VALUES ($1, $2)";
$result = pg_query_params($connection, $query, [$blog_id, json_encode($blog_data)]);

if (!$result) {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to create blog: " . pg_last_error()
    ]);
    exit;
}

// Return a success response
echo json_encode([
    "status" => "success",
    "message" => "Blog created successfully.",
    "blog_id" => $blog_id
]);
?>
