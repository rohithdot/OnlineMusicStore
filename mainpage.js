$(document).ready(function(){
	//alert("js is working");
	var v="something";
    $("#message").hide();
    var admin = localStorage.getItem("administrator");
    //alert(admin);
    if(admin == "true")
    {
        var admincontrols = '<button type="button" class="btn btn-info" style="background-color: black;" id="admin">Admin Controls</button>';
        $("#menubar li button").before(admincontrols);
        // $("#admin").click(function(){
        //     window.location.replace("admin.html")
        // }):
        // 
    }
    $("#menubar").on('click','#admin',function(){
        window.location.replace("admin.html") 
     });
	 $.ajax({
                url: "mainpage.php",
                type: "POST",
                data: v,

                success:function (data) {
                	data=$.parseJSON(data);
        
                	$("#username").text("Welcome "+data["username"]);
                	$("#username").fadeOut(4000);
                	var i = 0;
                    var username=data["username"];
                	$("#menuuser").text(data["username"]);
                    
                    $.each(data["songlist"],function(key,value){
                    	
                        var eachsong = '<figure style="float:left; margin-right: 1%;" class="column" id="'+i +'"><img src="Covers/'+value.album+'.jpg" class="img-fluid" alt="albumart1" style="width:130px; height:130px; margin-right: 1%; margin-bottom: 0.5em;"><figcaption><strong>'+value.name+'</strong></figcaption><figcaption><strong>'+value.artist+'</strong></figcaption></figure>';
						i++;
						$("#latestreleases").append(eachsong);
					});


                     var j =0;
                     var l;
                    for(j=0; j<=i; j++)
                    {
                        l = i+(2*j)+1;
                        $("#"+j).popover({
                        placement: 'bottom',
                        html: 'true',
                        title : '<span class="text-info"><strong>Options</strong></span>',
                        content : '<button class="list-group-item btn-sm" id="'+l+'">Play</button>'+'<button class="list-group-item btn-sm" id="'+(l+1)+'">Add to MyMusic</button>'
                        });

                    }

                    $.each(data["genrelist"],function(key,value){
                        
                        var eachgenre = '<figure style="float:left; margin-right: 1%;" class="column" id="'+(l+2) +'"><img src="Covers/'+value.genre+'.jpg" class="img-circle" alt="albumart1" style="width:130px; height:130px; margin-right: 1%; margin-bottom: 0.5em;"><figcaption align="center"><strong>'+value.genre+'</strong></figcaption></figure>';
                        l++;
                        $("#genres").append(eachgenre);
                    });

                    $(".column").hover(
                        function(){
                            $(this).find(".img-fluid").css("opacity","0.5");

                        },
                        function(){
                            $(this).find(".img-fluid").css("opacity","1");

                    });

                    $(".column").hover(
                        function(){
                            $(this).find(".img-circle").css("opacity","0.5");

                        },
                        function(){
                            $(this).find(".img-circle").css("opacity","1");

                    });
                    //alert("hello");
                    
                    $(".column").click(function(e){

                        var id = $(this).attr("id"); //album id
                        //alert(id);
                        var k=0;

                        for(k=0; k<=i; k++)
                        {
                            if(id!=k)
                            {
                                $("#"+k).popover('hide');
                            }
                        }


                        $("#"+id).on('shown.bs.popover', function(){
                             $('*').not(this).click(function(){
                                $("#"+id).popover('hide');
                             });   
                        $(":button").click(function(){
                            var id1 = $(this).attr("id");
                            //alert(id1);
                            var remainder = (id1-i-1)%2;
                            // alert(id);
                            // alert(remainder);
                            if(remainder == 0)
                            {
                                var play = $(".column").eq(id).find("figcaption").eq(0).text();
                                var player='<audio controls autoplay id="footer"><source src="Music/'+play+'.mp3" type="audio/mpeg">Your browser does not support the audio tag.</audio>';
                                $("#player").html("");
                                $("#player").append(player);
                            }
                            if (remainder == 1) 
                            {
                                var songname=$(".column").eq(id).find("figcaption").eq(0).text();
                                var artist=$(".column").eq(id).find("figcaption").eq(1).text();
                                $.ajax({
                                    url:"insertmusic.php",
                                    type:"POST",
                                    data:{index1:username,index2:songname,index3:artist},

                                    success:function(data1){

                                        if(data1=="inserted"){
                                            //alert("Successfully added");
                                            var message = "Song successfully added to your music";
                                            $("#message").show();
                                            $("#message").attr("class", "alert alert-success");
                                            $("#message").text(message);
                                            $("#message").fadeOut(4000);


                                        }
                                        else if (data1=="song exists") 
                                        {
                                            var message = "Song already exists in your music list";
                                            $("#message").show();
                                            $("#message").attr("class", "alert alert-danger");
                                            $("#message").text(message);
                                            $("#message").fadeOut(4000);

                                        }
                                        else{
                                            alert("Failed to add");
                                        }
                                    }
                                });


                            }


                            });
                    });

                   

                    });

                    $("#genres .column").click(function(){

                        //var id = $(this).attr("id");
                        var genre = $(this).find("figcaption").text();
                        //alert(genre);

                        localStorage.setItem("genremainpage", genre);
                        window.location.replace("genre.html")

                    });



                        $("#yourmusic").click(function(){
                            localStorage.setItem("uname",username );
                            window.location.replace("yourmusic.html")
                        });

                        $("#searchbt").click(function(){
                            localStorage.setItem("uname",username );
                            window.location.replace("search.html")

                        });
                    

                    $(".column").click(function(e){
    					e.preventDefault();
    					var id=$(this).attr("id");
    					
    					var c=$(".column").eq(id).find("figcaption").text();
    					
    					var player='<audio controls autoplay id="footer"><source src="Music/'+c+'.mp3" type="audio/mpeg">Your browser does not support the audio tag.</audio>';
    					$("#player").html("");
    					$("#player").append(player);

    				});
                }


     });


    


});