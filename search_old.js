$(document).ready(function(){
	var username = localStorage.getItem("uname");
	var search = localStorage.getItem("search");

	var messageinfo = "<p>Showing results for '"+search+"'</p>";

	$("#menuuser").text(username);
	$("#resultsof").append(messageinfo);

	$.ajax({
		url: "search.php",
        type: "POST",
        data: {index1:search},

        success:function(data){
        	
        		data=$.parseJSON(data);
				var i=1;
				var j=0;
				var k=0;
				var oldcover;
				var id;

				$.each(data["trackres"],function(key,value){
					var song=value.name;
					var artist=value.artist;
					var album=value.album;
					var genre=value.Genre;
					
					var rows = '<tr id="'+i+'"><th scope="row">'+i+'</th><td><img src="Covers/'+album+'.jpg" style="width:30px; height:30px; margin-right: 1%; margin-bottom: 0.5em;"/></td><td>'+song+'</td><td>'+artist+'</td><td>'+album+'</td><td>'+genre+'</td></tr>';
					$("tbody").append(rows);
					i++;
				});

				$.each(data["albumres"],function(key,value){
                    	
                    	var eachalbum = '<figure style="float:left; margin-right: 1%;" class="column" id="'+(i+1)+'"><img src="Covers/'+value.album+'.jpg" class="img-fluid" alt="albumart1" style="width:130px; height:130px; margin-right: 1%; margin-bottom: 0.5em;"><figcaption>'+value.album+'</figcaption><figcaption><strong>'+value.artist+'</strong></figcaption></figure>';
						i++;
						$("#albumlist").append(eachalbum);
				});

				$.each(data["artistres"],function(key,value){
                    	
                    	var eachartist = '<figure style="float:left; margin-right: 1%;" class="column" id="'+(i+1)+'"><img src="Covers/'+value.artist+'.jpg" class="img-circle" alt="albumart1" style="width:130px; height:130px; margin-right: 1%; margin-bottom: 0.5em;"><figcaption align="center"><strong>'+value.artist+'</strong></figcaption></figure>';
						i++;
						$("#artistlist").append(eachartist);
				});


				var trackslength = $("tbody tr").length;
				if(trackslength==0)
				{
					$("#msginfo").text("No Tracks Found");
        			$("#msginfo").css("color","red");
				}

				$("#albumtab").click(function(){
					var albumslength = $("#albumlist figure").length;
					if(albumslength==0)
					{
						$("#msginfo").text("No Albums Found");
        				$("#msginfo").css("color","red");
					}

				});

				$("#tracktab").click(function(){
					
					if(trackslength==0)
					{
						$("#msginfo").text("No Tracks Found");
        				$("#msginfo").css("color","red");
					}

				});

				


				$("tbody tr").hover(
				function(){
					oldcover = $(this).find("img").attr("src");
					$(this).find("img").attr("src","Covers/play.jpg");
					var song = $(this).find("td:eq(1)").text();

					$(this).find("img").click(function(){
						var player='<audio controls autoplay id="footer"><source src="Music/'+song+'.mp3" type="audio/mpeg">Your browser does not support the audio tag.</audio>';
                        $("#player").html("");
                        $("#player").append(player);  

					});


				}, 
				function(){
					$(this).find("img").attr("src",oldcover);
					
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

                $("#artists .column").click(function(){

                	// alert($(this).attr("id"));
                	var artistname = $(this).find("figcaption").text();
                	localStorage.setItem("artistname", artistname);
                	window.location.replace("artists.html")

                });

                $("#albums .column").click(function(){

                	//alert($(this).attr("id"));
                	var albumname = $(this).find("figcaption").eq(0).text();
                	localStorage.setItem("albumname", albumname);
                	window.location.replace("albums.html")


                });



        	
        }
	});


});