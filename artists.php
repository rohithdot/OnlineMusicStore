<?php
	$con = new mysqli("localhost", "root", "root", "musicstore") or die("Unable to connect");

	if($con->connect_error)
	{
	    die("Connection Failed:" .$con->connect_error);
	}

	if($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["index1"]) ){

		$artist=$_POST["index1"];

		$albumlist="select distinct album from songs where artist='$artist';";

		$albumresult=$con->query($albumlist);

		while($row=$albumresult->fetch_assoc()){

			$array[]=$row;
		}

		echo json_encode($array);
	}
?>