<?php
		$con = new mysqli("localhost", "root", "root", "musicstore") or die("Unable to connect");

		if($con->connect_error)
		{
		    die("Connection Failed:" .$con->connect_error);
		}

		if($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["index1"]))
		{
			$search = $_POST["index1"];

			$songquery="select * from songs where name like '%$search%';";

			$albumquery="select distinct album, artist from songs where album like '%$search%';";

			$artistquery="select distinct artist from songs where artist like '%$search%';";

			$songresult=$con->query($songquery);
			$albumresult=$con->query($albumquery);
			$artistresult=$con->query($artistquery);



				while($row1=$songresult->fetch_assoc()){

					$array1[]=$row1;
				}

				while ($row2=$albumresult->fetch_assoc()) {
					# code...
					$array2[]=$row2;
				}

				while ($row3=$artistresult->fetch_assoc()) {
					# code...
					$array3[]=$row3;
				}





				$mainarray = array("trackres"=>$array1, "albumres"=>$array2, "artistres"=>$array3);

				echo json_encode($mainarray);
			
		 }

?>