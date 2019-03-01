<?php

$con = new mysqli("localhost", "root", "root", "musicstore") or die("Unable to connect");

if($con->connect_error)
{
    die("Connection Failed:" .$con->connect_error);
}

if($_SERVER["REQUEST_METHOD"] == "POST")
{
    $fname = htmlspecialchars($_POST['fname']);
    $lname = htmlspecialchars($_POST['lname']);
    $uname = htmlspecialchars($_POST['uname']);
    $email = htmlspecialchars($_POST['email']);
    $password = htmlspecialchars($_POST['password']);

    $salt = password_hash($password, PASSWORD_DEFAULT);
    $hash_pwd = hash("sha256", $salt.hash("sha256", $password));



    $user_exists = "select * from userinfo where username = '$uname';";
    $user_exists_result = $con->query($user_exists);
    
    if($user_exists_result->num_rows > 0)
    {
        echo "User exists";
    }

    else
    {
        $user_insert = "INSERT INTO userinfo (firstname, lastname, username, email, password, salt) VALUES ('$fname', '$lname', '$uname', '$email', '$hash_pwd', '$salt');";
        $con->query($user_insert);
        echo "Successful";
    }

}

?>