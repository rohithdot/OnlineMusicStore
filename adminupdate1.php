<?php

$con = new mysqli("localhost", "root", "root", "musicstore") or die("Unable to connect");

if($con->connect_error)
{
    die("Connection Failed:" .$con->connect_error);
}

if($_SERVER["REQUEST_METHOD"] == "POST")
{
		$id = $_POST["index1"];
		$song = $_POST["index2"];
		$artist = $_POST["index3"];
		$album = $_POST["index4"];
		$latest = $_POST["index5"];
		$genre = $_POST["index6"];

		$updatequery = "UPDATE songs SET name='$song', artist='$artist', album='$album', latest='$latest', genre='$genre' WHERE id='$id';";
		$con->query($updatequery);

		$con->close();
		echo "updated";

	// }
	
}


?>