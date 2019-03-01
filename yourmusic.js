$(document).ready(function(){
	var uname = localStorage.getItem("uname");

	$("#menuuser").text(uname);
	$("#searchbt").click(function(){
		
		window.location.replace("search.html")

	});
	$("#yourmusic").click(function(){
		window.location.replace("yourmusic.html")
	});

	$.ajax({
		url:"yourmusic.php",
		method:"POST",
		data:{name:uname},

		success:function(data){
			data=$.parseJSON(data);
			var i=1;
			var oldcover;
			var id;

			$.each(data,function(key,value){
				var song=value.name;
				var artist=value.artist;
				var album=value.album;
				var genre=value.Genre;
				
				var rows = '<tr id="'+i+'"><th scope="row">'+i+'</th><td><img src="Covers/'+album+'.jpg" style="width:30px; height:30px; margin-right: 1%; margin-bottom: 0.5em;"/></td><td>'+song+'</td><td>'+artist+'</td><td>'+album+'</td><td>'+genre+'</td></tr>';
				$("tbody").append(rows);
				i++;
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

			
		}

	});

});