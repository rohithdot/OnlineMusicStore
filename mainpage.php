<?php
	
	session_start();
	$con = new mysqli("localhost", "root", "root", "musicstore") or die("Unable to connect");

	if($con->connect_error)
	{
	    die("Connection Failed:" .$con->connect_error);
	}

	if(isset($_SESSION['username']))
	{
		$temp=$_SESSION["username"];
		
		$song = "select * from songs where latest='1';";
		$songlist=$con->query($song);

		$genre = "select distinct genre from songs;";
		$genrelist=$con->query($genre);

		while($row1=$songlist->fetch_assoc()){

			$array1[]=$row1;
		}

		while($row2=$genrelist->fetch_assoc()){

			$array2[]=$row2;
		}

		//echo json_encode($array);
		$userinfo = array('username' =>$temp,"songlist"=>$array1, "genrelist"=>$array2);
		//$userinfo = array("songlist"=>$array1, "genrelist"=>$array2);
		echo json_encode($userinfo);



		
	}
	else{
		echo "usernamenotset";
	}



  ?>

  