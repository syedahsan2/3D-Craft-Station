<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');

// ✅ Get email from React
$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'] ?? '';

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit;
}

// ✅ 1. Admin Ko Notification
$admin_email = "info@3dcraftstation.com";  // ✅ APNI DOMAIN EMAIL
$admin_subject = "New Newsletter Subscriber!";
$admin_body = "
========================================
📧 NEWSLETTER SUBSCRIPTION
========================================

📧 Email: $email
📅 Date: " . date('Y-m-d H:i:s') . "

========================================
";

$admin_headers = "From: noreply@3dcraftstation.com\r\n";
$admin_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// ✅ 2. User Ko Confirmation
$user_subject = "Welcome to 3D Craft Station Newsletter!";
$user_body = "
========================================
🎨 3D CRAFT STATION
========================================

Hello!

Thank you for subscribing to our newsletter! 🎉

You will now receive:
✨ Latest 3D designs
🎯 Exclusive offers
🚀 Updates and news

You can unsubscribe anytime by clicking the link in our emails.

Best regards,
Team 3D Craft Station
✨ Premium 3D Design Studio

========================================
";

$user_headers = "From: noreply@3dcraftstation.com\r\n";
$user_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// ✅ Send emails
$admin_sent = mail($admin_email, $admin_subject, $admin_body, $admin_headers);
$user_sent = mail($email, $user_subject, $user_body, $user_headers);

if ($admin_sent && $user_sent) {
    echo json_encode(['success' => true, 'message' => 'Subscribed successfully!']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to subscribe. Please try again.']);
}
?>