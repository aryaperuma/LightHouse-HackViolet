<?php 
/*
 The database details are hidden to maintain safety of the database.
 The site is hosted on https://testa1234.000webhostapp.com/query.php
 Created by Arnab Kundu
*/
 header("Access-Control-Allow-Origin: *");
 error_reporting(E_ERROR | E_PARSE);
$query=$_GET["query"];
$servername = "localhost";
$username ="hidden";
$password = "hidden";
$dbname =  "hidden";
$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn)
{
    die("Connection failed: " . mysqli_connect_error());
}

if($query=="send_mail")
{
        $email=$_GET["email"];
    
        $to = $email;
        $subject = $_GET["subject"];
        $headers = $_GET['headers'];
        $txt=$_GET['text'];
    
        mail($to,$subject,$txt,$headers);

}

if($query=="signup_request")
{
    $email=$_GET["email"];
    $name=$_GET["username"];
    $password=$_GET["password"];
    //$ip=$_GET["ip"];

    $sql = "select * from registered_users where username = '".$name."'";
    $result = $conn->query($sql);

    if (!empty($result) &&$result->num_rows > 0) 
    {
        $obj->message="User already exists";
        $myJSON = json_encode($obj);
        echo $myJSON;
    }
    else
    {
        
        $to = $email;
        $subject = "Otp for test";
        $txt = rand(100000,999999);
        
        $sql = "DELETE FROM signup_request WHERE name='".$name."'";
        $result = $conn->query($sql);
        $sql = "INSERT INTO signup_request( name, email, otp) VALUES ('".$name."','".$email."','".$txt. "')";
        $result = $conn->query($sql);
        $headers = "hidden";
    
        mail($to,$subject,$txt,$headers);

        $obj->message="Otp sent";
        $myJSON = json_encode($obj);
        echo $myJSON;
    }
}
    if($query=="signup_authenticate")
    {
    $email=$_GET["email"];
    $username=$_GET["username"];
    $password=$_GET["password"];
    $name=$_GET["name"];
    $ip=$_GET["ip"];
    $otp=$_GET["otp"];

    $sql = "select * from signup_request where name = '".$username."'";
    $otp_check="op";
    $result = $conn->query($sql);
    if (!empty($result) &&$result->num_rows > 0) {
        while($row = $result->fetch_assoc())
         {
            $otp_check=$row["otp"];
         }
        }
        if($otp_check==$otp)
        {

            $sql = "DELETE FROM registered_users WHERE username='".$username."'";
            $result = $conn->query($sql);

            $sql = "DELETE FROM current_users WHERE username='".$username."'";
            $result = $conn->query($sql);

            $sql = "INSERT INTO registered_users( username,name, email, pass) VALUES ('".$username."','".$name."','".$email."','".$password. "')";
            echo $sql;
            $result = $conn->query($sql);    
            $sql = "INSERT INTO current_users( username,ip) VALUES ('".$username."','".$ip. "')";
            $result = $conn->query($sql);    
            
            $obj->message="signup complete user logged in";
            $myJSON = json_encode($obj);
            echo $myJSON;
        }
        else
        {
            echo $otp." ".$otp_check;
            $obj->message="wrong otp";
            $myJSON = json_encode($obj);
            echo $myJSON;
        }

    }

    if($query=="login_authenticate")
    {
    $username=$_GET["username"];
    $password=$_GET["password"];
    $ip=$_GET["ip"];
    
    $sql = "select * from current_users where username = '".$username."'";
    
    $result = $conn->query($sql);
    if (!empty($result) &&$result->num_rows > 0)
     {
        $obj->message="User already logged in";
        $myJSON = json_encode($obj);
        echo $myJSON;
    }
    else
    {
        $sql = "SELECT * FROM  registered_users WHERE  username ='".$username. "'";
        $result = $conn->query($sql);    
        $password_match="op";
        if (!empty($result) &&$result->num_rows > 0) {
            while($row = $result->fetch_assoc())
             {
                $password_match=$row['pass'];
             }
        }
        if($password_match==$password)
        {
                
            $sql = "INSERT INTO current_users( username,ip) VALUES ('".$username."','".$ip. "')";
            $result = $conn->query($sql);
            $obj->message="login successful";
            $myJSON = json_encode($obj);
            echo $myJSON;
        }
        else
        {
            $obj->message="password dosent match";
            $myJSON = json_encode($obj);
            echo $myJSON;
        }
     
    }
        

    }

    if($query=="session_info")
    {
    $username="user";
    $ip=$_GET["ip"];
    
    $sql = "select * from current_users where ip = '".$ip."'";
    $obj=NULL;
    $result = $conn->query($sql);
    if (!empty($result) &&$result->num_rows > 0)
     {
        while($row = $result->fetch_assoc())
        {
            $obj->username=$row['username'];
            $obj->ip=$row['ip'];
            $obj->loginTime=$row['reg_date'];
        }
     }

        $sql = "select * from registered_users where username = '".$obj->username."'";

        $result = $conn->query($sql);
        if (!empty($result) &&$result->num_rows > 0)
        {
           while($row = $result->fetch_assoc())
           {
               $obj->name=$row['name'];
               $obj->email=$row['email'];
               $obj->regTime=$row['reg_date'];
           }
        }
        echo json_encode($obj);

    }
    if($query=="session_expire")
    {
        $ip=$_GET["ip"];
        
        $sql = "DELETE FROM current_users WHERE ip='".$ip."'";
        $result = $conn->query($sql);
    }
   
  $conn->close();
//  echo $basic;
?> 
