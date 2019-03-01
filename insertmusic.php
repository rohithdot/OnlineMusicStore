<?php
	//echo "hi";
	$con = new mysqli("localhost", "root", "root", "musicstore") or die("Unable to connect");

if($con->connect_error)
{
    die("Connection Failed:" .$con->connect_error);
}

if($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["index1"]) && isset($_POST["index2"]) && isset($_POST["index3"]))
{
	$uname = $_POST["index1"];
	$song = $_POST["index2"];
	$artist = $_POST["index3"];
	// if($song == "Hello" && $artist == "Adele")
	// {
	// 	echo "inserted";
	// }

	$check = "SELECT * from usermusic where userid = (select userid from userinfo where username='$uname') and songid = (select id from songs where name = '$song' and artist = '$artist');";
	$check_result = $con->query($check);

	if($check_result->num_rows>0)
	{
		echo "song exists";
	}
	else
	{
		$insert_music = "INSERT INTO usermusic(userid, songid, favourite) VALUES ((SELECT userid from userinfo where username='$uname'),(SELECT id from songs where name= '$song' AND artist = '$artist'),'0');";
		$result = $con->query($insert_music);

		echo "inserted";
	}

}

else
{
	echo "failed";
}


?>