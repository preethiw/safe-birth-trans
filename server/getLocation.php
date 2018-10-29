<?php 
$ip = getenv('REMOTE_ADDR'); // the IP address to query
$query = @unserialize(file_get_contents('http://ip-api.com/php/'.$ip));
echo json_encode($query);