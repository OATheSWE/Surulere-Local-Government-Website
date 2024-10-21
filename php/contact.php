<?php
// Include the necessary files
include 'db.php';
require 'vendor/autoload.php'; // Make sure PHPMailer's autoload file is included

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Retrieve and decode JSON data from POST
$inputData = json_decode($_POST['json_data'], true);

// Validate the received data
$requiredFields = ['first_name', 'last_name', 'email', 'phone_number', 'message'];
foreach ($requiredFields as $field) {
    if (empty($inputData[$field])) {
        echo json_encode([
            "status" => "error",
            "message" => ucfirst($field) . " is required."
        ]);
        exit;
    }
}

// Prepare email data
$firstName = htmlspecialchars($inputData['first_name']);
$lastName = htmlspecialchars($inputData['last_name']);
$email = filter_var($inputData['email'], FILTER_SANITIZE_EMAIL);
$phoneNumber = htmlspecialchars($inputData['phone_number']);
$message = nl2br(htmlspecialchars($inputData['message'])); // Convert newlines to <br> tags
$image = $inputData['image'] ?? null;

// Create email content with HTML and inline CSS
$emailContent = "
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20px;
                background-color: #f4f4f4;
            }
            .container {
                max-width: 600px;
                margin: auto;
                background: #fff;
                padding: 20px;
                border-radius: 5px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            h1 {
                color: #333;
            }
            p {
                line-height: 1.5;
                color: #555;
            }
            .footer {
                margin-top: 20px;
                font-size: 0.9em;
                color: #777;
            }
        </style>
    </head>
    <body>
        <div class='container'>
            <h1>Contact Us Form Submission</h1>
            <p><strong>First Name:</strong> $firstName</p>
            <p><strong>Last Name:</strong> $lastName</p>
            <p><strong>Phone Number:</strong> $phoneNumber</p>
            <p><strong>Message:</strong></p>
            <p>$message</p>
            <div class='footer'>
                <p>Thank you for reaching out to us!</p>
            </div>
        </div>
    </body>
    </html>
";

// Initialize PHPMailer
$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->isSMTP();
    $mail->Host       = 'smtp.example.com'; // Set the SMTP server to send through
    $mail->SMTPAuth   = true;
    $mail->Username   = 'your_email@example.com'; // SMTP username
    $mail->Password   = 'your_password'; // SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Enable TLS encryption
    $mail->Port       = 587; // TCP port to connect to

    // Recipients
    $mail->setFrom($email, 'Website Contact Form'); // Sender's email
    $mail->addAddress('support@surulerelg.com.ng', 'Support Team'); // Add a recipient

    // Content
    $mail->isHTML(true); // Set email format to HTML
    $mail->Subject = 'New Contact Us Message';
    $mail->Body    = $emailContent;

    // Handle image upload if present
    if ($image && isset($image['data'])) {
        $imageData = base64_decode($image['data']);
        $imageName = basename($image['name']);
        $uploadDir = 'uploads/';
        
        // Save the image
        if (!file_put_contents($uploadDir . $imageName, $imageData)) {
            echo json_encode([
                "status" => "error",
                "message" => "Failed to save the image."
            ]);
            exit;
        }
        
        // Attach the image to the email
        $mail->addAttachment($uploadDir . $imageName);
    }

    // Send the email
    $mail->send();
    echo json_encode([
        "status" => "success",
        "message" => "Your message has been sent successfully."
    ]);
} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to send the email. Mailer Error: {$mail->ErrorInfo}"
    ]);
}
?>
