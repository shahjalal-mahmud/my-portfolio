<?php
// public/api/kimchi-config.example.php
//
// TEMPLATE — do NOT use this file as-is. It is shipped to dist/api/
// only so users have a reference when creating their real config.
//
// To configure Kimchi for cPanel hosting:
//
//   1. Copy this file to /home/<cpanel-username>/kimchi-config.php
//      (ONE directory above public_html — NOT inside public_html).
//   2. Replace the placeholder with your real Kimchi API key.
//   3. Set permissions: chmod 600 kimchi-config.php
//      (owner-only read; nobody else should ever see this file).
//
// Keeping the file outside public_html ensures the key is never served
// by Apache, even if someone misconfigures the server.

return [
    'kimchi_api_key' => 'PASTE_YOUR_REAL_KEY_HERE',
];