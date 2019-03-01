$(document).ready(function () {
    $("#submit").click(function (e) {
        e.preventDefault();
        $("#message").text("");
        var uname = $("#uname").val();
        var pwd = $("#password").val();

        // var unameMsg = $("<span></span>");
        // $("#uname").after(unameMsg);

        if(uname == "" || pwd == "")
        {
            // alert("All fields are mandatory");
            $("#message").html("Error: All fields are mandatory");
            $("#message").css("color","red");
        }

        else
        {
            var v = $("#signin").serialize();
            $.ajax({
                url: "signin.php",
                type: "POST",
                data: v,

                success:function (data) {
                    // alert(data);
                    if(data == "nouser")
                    {
                        // alert("message");
                        $("#message").append("<p>No User exists with given username</p>");
                        $("#message").css("color","red");
                    }
                    else if(data == "wrongpwd")
                    {
                        $("#message").append("<p>Password doesn't match</p>");
                        $("#message").css("color","red");
                    }
                    else if(data == "success")
                    {
                       // alert("Signin Successful");
                       localStorage.setItem("uname",uname);
                       localStorage.setItem("administrator","false");
                        window.location.replace("mainpage.html")
                    }
                    else if(data == "admin")
                    {   
                        //alert(data);
                        localStorage.setItem("uname",uname);
                        localStorage.setItem("administrator","true");
                        window.location.replace("mainpage.html")
                    }
                    else
                    {
                        alert("Final else loop");

                    }

                }


            });
        }
        // alert("Working");

    });

});