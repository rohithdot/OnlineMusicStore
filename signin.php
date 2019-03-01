<?php

session_start();

$con = new mysqli("localhost", "root", "root", "musicstore") or die("Unable to connect");

if($con->connect_error)
{
    die("Connection Failed:" .$con->connect_error);
}

 if($_SERVER["REQUEST_METHOD"] == "POST")
 {
    $uname = htmlspecialchars($_POST['uname']);
    $password = htmlspecialchars($_POST['password']);

    $_SESSION["username"]=$uname;

    $userinfo_query = "SELECT * FROM userinfo WHERE username = '$uname';";
    $userinfo_result = $con->query($userinfo_query);

    if($userinfo_result->num_rows == 0)
    {
        echo "nouser";
    }

    else {
        $salt_query = "SELECT * FROM userinfo where username = '$uname';";
        $salt_result = $con->query($salt_query);

        while ($row = $salt_result->fetch_assoc())
        {
            $array[] = $row["salt"];
            $pwd[] = $row["password"];
            $admin[] = $row["admin"];
        }

        $hash = hash("sha256", $array[0].hash("sha256",$password));

        if($hash != $pwd[0])
        {
            echo "wrongpwd";
        }
        else
        {
            if($admin[0] == 1)
            {
                echo "admin";

            }
            else
            {
                echo "success";
            }
            
        }

    }

}


?>