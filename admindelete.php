<?php
	
	$con = new mysqli("localhost", "root", "root", "musicstore") or die("Unable to connect");

	if($con->connect_error)
	{
	    die("Connection Failed:" .$con->connect_error);
	}

	if($_SERVER["REQUEST_METHOD"] == "POST")
	{
			$id = $_POST["index"];
			
			$updatequery = "delete from songs where id='$id';";
			$con->query($updatequery);

			$con->close();
			echo "deleted";

		// }
		
	}
?>