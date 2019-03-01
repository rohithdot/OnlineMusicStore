<?php

$con = new mysqli("localhost", "root", "root", "musicstore") or die("Unable to connect");

if($con->connect_error)
{
    die("Connection Failed:" .$con->connect_error);
}

if($_SERVER["REQUEST_METHOD"] == "POST")
{
	// if(isset($_POST["updatetrigger"]))
	// {
		$songs = "SELECT * FROM songs;";
		$songs_result = $con->query($songs);
		while ($row = $songs_result->fetch_assoc()) 
		{
			$array[]=$row;
		}
		// $con->close();
		echo json_encode($array);

	// }
	
}


?>