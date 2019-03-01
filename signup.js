$(document).ready(function () {
    $("#submit").click(function (e) {
        e.preventDefault();
        $("#message").text("");
        var fname = $("#fname").val();
        var lname = $("#lname").val();
        var uname = $("#uname").val();
        var email = $("#email").val();
        var pwd = $("#password").val();
        var cpwd = $("#cpassword").val();

        // var unameMsg = $("<span></span>");
        // $("#uname").after(unameMsg);


        if (pwd != cpwd || !email.match(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{3})+$/))
        {
            if(pwd != cpwd)
            {
                $("#message").append("<p>Error: Password and Confirm password should match</p>");
                $("#message").css("color","red");
            }

            if(!email.match(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{3})+$/))
            {
                $("#message").append("<p>Error: Please enter a valid email address</p>");
                $("#message").css("color","red");
            }

            // if(!pwd.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}+$/))
            // {
            //     $("#message").append("<p>Error: Please enter a valid email password</p>");
            //     $("#message").css("color","red");
            // }
        }

        else
        {
            var v = $("#signup").serialize();
            $.ajax({
                url: "signup.php",
                type: "POST",
                data: v,

                success:function (data) {
                    // alert(data);
                    if(data == "User exists")
                    {
                        // alert("message");
                        $("#message").append("<p>User name already exists. Please select different name.</p>");
                        $("#message").css("color","red");
                    }

                    if(data == "Successful")
                    {
                        $("#message").append("<p>Signup Successful. <a href="signin.html">Please login here</a></p>");
                        $("#message").css("color","green");
                    }

                }


            });
        }
        // alert("Working");

    });

});