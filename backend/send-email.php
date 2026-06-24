<?php
require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$data = json_decode(file_get_contents('php://input'), true);

$mail = new PHPMailer(true);

try {
    // ✅ APNI DOMAIN EMAIL SMTP SETTINGS
    $mail->isSMTP();
    $mail->Host = 'smtp.hostinger.com';  // ✅ APNA HOSTING SMTP
    $mail->SMTPAuth = true;
    $mail->Username = 'info@3dcraftstation.com';   // ✅ APNI DOMAIN EMAIL
    $mail->Password = '3D_Station_321';   // ✅ EMAIL PASSWORD
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;  // Ya 465 for SSL

    // ✅ Admin Email (Domain email se)
    $mail->setFrom('info@3dcraftstation.com', '3D Craft Station');
    $mail->addAddress('info@3dcraftstation.com', 'Admin');  // ✅ APNI DOMAIN EMAIL
    $mail->Subject = "New Message from {$data['name']}";
    $mail->Body = "Name: {$data['name']}\nEmail: {$data['email']}\nPhone: {$data['phone']}\nService: {$data['service']}\nMessage: {$data['message']}";
    $mail->send();

    // ✅ User Auto-Reply (Domain email se)
    $mail->clearAddresses();
    $mail->addAddress($data['email'], $data['name']);
    $mail->Subject = 'Thank you for contacting 3D Craft Station!';
    $mail->Body = "Hello {$data['name']},\n\nThank you for reaching out to us. We will get back to you within 24-48 hours.\n\nBest regards,\nTeam 3D Craft Station\n\n" . $mail->Username;
    $mail->send();

    echo json_encode(['success' => true]);

} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $mail->ErrorInfo]);
}
?>