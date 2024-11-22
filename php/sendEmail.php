<?php
include 'db.php';
require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Receive JSON stringified data
$data = json_decode($_POST['data'], true); // Assuming the JSON is in a key named 'data'

if (!$data) {
    die('Invalid JSON data');
}

// Extract keys from the decoded JSON
$first_name = $data['first_name'] ?? '';
$last_name = $data['last_name'] ?? '';
$email = $data['email'] ?? '';
$phone_number = $data['phone_number'] ?? '';
$message = $data['message'] ?? '';
$image = $data['image'] ?? null;

// Validate and process the image data
$imageAttachmentPath = null;
if ($image && isset($image['data'], $image['size'], $image['type'], $image['name'])) {
    // Decode the base64 image data
    $imageData = base64_decode($image['data']);
    if ($imageData) {
        $imageAttachmentPath = __DIR__ . '/attachments/' . $image['name'];
        file_put_contents($imageAttachmentPath, $imageData);
    } else {
        die('Invalid image data');
    }
} else if ($image) {
    die('Incomplete image data');
}

// Prepare the email content
$body = <<<EOD
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { font-family: Arial, sans-serif; color: #333; }
        .container { width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; }
        .header { font-size: 24px; font-weight: bold; margin-bottom: 20px; text-align: center; }
        .content { font-size: 16px; line-height: 1.5; }
        .footer { font-size: 14px; color: grey; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">New Contact Form Submission</div>
        <div class="content">
            <p><strong>First Name:</strong> $first_name</p>
            <p><strong>Last Name:</strong> $last_name</p>
            <p><strong>Email:</strong> $email</p>
            <p><strong>Phone Number:</strong> $phone_number</p>
            <p><strong>Message:</strong> $message</p>
        </div>
        <div class="footer">
            <p>This email was generated from the contact form submission.</p>
        </div>
    </div>
</body>
</html>
EOD;

// Send Email
function sendEmail($recipient, $subject, $body, $attachmentPath = null) {
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->SMTPDebug = 0;
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'osborneosas12@gmail.com';
        $mail->Password   = 'zniw wylx awcx yfhg';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // Recipients
        $mail->setFrom($recipient, 'Contact Form');
        $mail->addAddress("osborneosas12@gmail.com");

        // Attachments
        if ($attachmentPath) {
            $mail->addAttachment($attachmentPath);
        }

        // Content
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = $body;
        $mail->AltBody = strip_tags($body);

        $mail->send();
        echo 'Message has been sent';
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}

// Call the sendEmail function
sendEmail($email, 'New Contact Form Submission', $body, $imageAttachmentPath);
?>
