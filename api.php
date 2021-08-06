<?php
function jsonResponse($success, $message) {
	$arrData = array(
		'success' => $success,
		'message' => $message
	);
	header("Content-Type: application/json; charset=UTF-8");
	echo json_encode($arrData, JSON_PRETTY_PRINT);
}

$ipAddress = $_POST["ipAddress"];
$option = $_POST["option"];
switch ($option) {
	case "UNBLOCK";
		exec("iptables -D FORWARD -s ".$ipAddress." -j DROP");
		jsonResponse(true, "Unblocked");
		break;
	case "BLOCK";
		exec("iptables -I FORWARD -s ".$ipAddress." -j DROP");
		jsonResponse(true, "Blocked");
		break;
}
?>