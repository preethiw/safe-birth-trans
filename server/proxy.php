<?php 
  /*
  * Warning! Read and use at your own risk!
  *
  * This tiny proxy script is completely transparent and it passes 
  * all requests and headers without any checking of any kind.
  * The same happens with JSON data. They are simply forwarded.
  *
  * This is just an easy and convenient solution for the AJAX 
  * cross-domain request issue, during development.
  * No sanitization of input is made either, so use this only
  * if you are sure your requests are made correctly and
  * your urls are valid.
  *
  */

  if (!function_exists('getallheaders')) {
    function getallheaders() {
    $headers = [];
    foreach ($_SERVER as $name => $value) {
      if (substr($name, 0, 5) == 'HTTP_') {
          $headers[str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($name, 5)))))] = $value;
      }
    }
    return $headers;
    }
  }

  $method = $_SERVER['REQUEST_METHOD'];

  $headers = getallheaders();
  $headers_str = [];
  $url = 'https://api.constantcontact.com/v2/contacts?api_key=b2ctbzfqbdjn8xbhe2tt83bm';
  
  foreach ( $headers as $key => $value){
    if($key == 'Host')
      continue;
    $headers_str[]=$key.":".$value;
  }
  
  $ch = curl_init($url);
  curl_setopt($ch,CURLOPT_URL, $url);
  if( $method !== 'GET') {
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
  }
  if($method == "PUT" || $method == "PATCH" || ($method == "POST" && empty($_FILES))) {
    $data_str = file_get_contents('php://input');
   
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data_str);
  }

  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt( $ch, CURLOPT_HTTPHEADER, $headers_str );
  curl_setopt($ch, CURLINFO_HEADER_OUT, true);
  $result = curl_exec($ch);
  
  curl_close($ch);
  header('Content-Type: application/json;charset=UTF-8');
  
  header('Content-Encoding: gzip');
  echo $result;