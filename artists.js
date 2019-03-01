$(document).ready(function(){
	var username = localStorage.getItem("uname");
	var artists = localStorage.getItem("artistname");
	$("#artistheading").text(artists);
    $("#searchbt").click(function(){
        
        window.location.replace("search.html")

    });
    $("#yourmusic").click(function(){
        window.location.replace("yourmusic.html")
    });
	$("#menuuser").text(username);

	$.ajax({
		url: "artists.php",
        type: "POST",
        data: {index1:artists},

        success:function(data){
        	
        		data=$.parseJSON(data);
				var i=1;
				var j=0;
				var k=0;
				var oldcover;
				var id;


				$.each(data,function(key,value){
                    	
                    	var eachalbum = '<figure style="float:left; margin-right: 1%;" class="column" id="'+i+'"><img src="Covers/'+value.album+'.jpg" class="img-fluid" alt="albumart1" style="width:130px; height:130px; margin-right: 1%; margin-bottom: 0.5em;"><figcaption><strong>'+value.album+'</strong></figcaption><figcaption><strong>'+artists+'</strong></figcaption></figure>';
						i++;
						$("#albums").append(eachalbum);
				});


				$(".column").hover(
                        function(){

                            $(this).find(".img-fluid").css("opacity","0.5");

                        },
                        function(){
                            $(this).find(".img-fluid").css("opacity","1");

                });


                $("#albums .column").click(function(){

                	//alert($(this).attr("id"));
                	var albumname = $(this).find("figcaption").eq(0).text();
                	localStorage.setItem("albumname", albumname);
                	window.location.replace("albums.html")


                });
                $("#yourmusic").click(function(){
                    //localStorage.setItem("uname",username );
                    window.location.replace("yourmusic.html")
                });
                $("#searchbt").click(function(){
                    // localStorage.setItem("uname",username );
                    window.location.replace("search.html")

                });



        	
        }
	});


});