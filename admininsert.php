<?php

$con = new mysqli("localhost", "root", "root", "musicstore") or die("Unable to connect");

if($con->connect_error)
{
    die("Connection Failed:" .$con->connect_error);
}

if($_SERVER["REQUEST_METHOD"] == "POST")
{
	
	// if(isset($_POST["index1"]) && isset($_POST["index2"]))
	// {
		$insertdata = $_POST["index1"];
		$numrows=$_POST["index2"];
		$k = $numrows*5;

		for($i=0; $i<$k; $i+=5)
		{
			$i1 = $i;
			$i2 = 1 + $i;
			$i3 = 2 + $i;
			$i4 = 3 + $i;
			$i5 = 4 + $i;
			$rowquery= "INSERT INTO songs (name,artist,album,latest,genre) VALUES ('$insertdata[$i1]','$insertdata[$i2]','$insertdata[$i3]','$insertdata[$i4]','$insertdata[$i5]');";
			$con->query($rowquery);
			
		}

		$con->close();
		echo "success";

	// }
	
}


?>