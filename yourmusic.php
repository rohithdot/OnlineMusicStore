<?php
	$con = new mysqli("localhost", "root", "root", "musicstore") or die("Unable to connect");

	if($con->connect_error)
	{
	    die("Connection Failed:" .$con->connect_error);
	}

	if($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["name"]) ){

		$uname=$_POST["name"];

		$songslist="select * from songs where id in (select songid from usermusic where userid=(select userid from userinfo where username='$uname'));";

		$songsresult=$con->query($songslist);

		while($row=$songsresult->fetch_assoc()){

			$array[]=$row;
		}

		echo json_encode($array);
	}
?>