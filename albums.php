<?php
	$con = new mysqli("localhost", "root", "root", "musicstore") or die("Unable to connect");

	if($con->connect_error)
	{
	    die("Connection Failed:" .$con->connect_error);
	}

	if($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["index1"]) ){

		$album=$_POST["index1"];

		$songslist="select * from songs where album='$album';";

		$songsresult=$con->query($songslist);

		while($row=$songsresult->fetch_assoc()){

			$array[]=$row;
		}

		echo json_encode($array);
	}
?>