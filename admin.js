$(document).ready(function(){

	var username = localStorage.getItem("uname");
	$("#menuuser").text(username);
	$("#searchbt").click(function(){
		
		window.location.replace("search.html")

	});
	$("#yourmusic").click(function(){
		window.location.replace("yourmusic.html")
	});
	$.ajax({
		url:"adminupdate.php",
		method:"POST",
		data:{index:"one"},

		success:function(data){

			data = $.parseJSON(data);
			
			$.each(data,function(key,value){
				var id = value.id;
				var song=value.name;
				var artist=value.artist;
				var album=value.album;
				var latest = value.latest;
				var genre=value.Genre;
				
				var rows1 = '<tr id="'+id+'"><td scope="row">'+id+'</td><td>'+song+'</td><td>'+artist+'</td><td>'+album+'</td><td>'+latest+'</td><td>'+genre+'</td><td><button type="button" class="btn btn-info">Edit</button></td></tr>';
				var rows2 = '<tr id="'+id+'"><td scope="row">'+id+'</td><td>'+song+'</td><td>'+artist+'</td><td>'+album+'</td><td>'+latest+'</td><td>'+genre+'</td><td><button type="button" class="btn btn-info">Delete</button></td></tr>';

				$("#update tbody").append(rows1);
				$("#delete tbody").append(rows2);
			
			});

			$("#update tbody").on("click","button",function(){
				$(this).text("Update");
				var id = $(this).parent().prevAll().eq(5).text();
				var song = $(this).parent().prevAll().eq(4).text();
				var artist = $(this).parent().prevAll().eq(3).text();
				var album = $(this).parent().prevAll().eq(2).text();
				var latest = $(this).parent().prevAll().eq(1).text();
				var genre = $(this).parent().prevAll().eq(0).text();
				// alert(song);

				var input4 = "<p><input type='text' value= " +song+ " /></p>";
				var input3 = "<p><input type='text' value= " +artist+ " /></p>";
				var input2 = "<p><input type='text' value= " +album+ " /></p>";
				var input1 = "<p><input type='text' value= " +latest+ " /></p>";
				var input0 = "<p><input type='text' value= " +genre+ " /></p>";

				$(this).parent().prevAll().eq(0).html(input0);
				$(this).parent().prevAll().eq(1).html(input1);
				$(this).parent().prevAll().eq(2).html(input2);
				$(this).parent().prevAll().eq(3).html(input3);
				$(this).parent().prevAll().eq(4).html(input4);

				$(this).click(function(){
					// var id = $(this).parent().prevAll().eq(5).text();
					var song = $(this).parent().prevAll().eq(4).children().children().val();
					var artist = $(this).parent().prevAll().eq(3).children().children().val();
					var album = $(this).parent().prevAll().eq(2).children().children().val();
					var latest = $(this).parent().prevAll().eq(1).children().children().val();
					var genre = $(this).parent().prevAll().eq(0).children().children().val();

					$.ajax({
						url: "adminupdate1.php",
			            type: "POST",
			            data: {index1:id,index2:song,index3:artist,index4:album,index5:latest,index6:genre},

			            success:function(data2)
			            {	
			            	if(data2=="updated")
			            	{	var msg="<div class='alert alert-success' role='alert'>Successfully updated</div>";
			            		$("#msginfo").append(msg);
			            		$("#msginfo").fadeOut(4000,function(){
			            			//window.location.replace()
			            		});

			            	}
			            }
					});

				});
			});

			$("#delete tbody").on('click','button',function(){
				$(this).text("Sure?");
				$(this).attr("class","btn btn-danger");
				// $("#delete tbody").on('click','.(btn btn-danger)',function(){
				// 	alert("hello");
				// });
				// $("button:contains('Sure?')").click(function(){

				// });
				var id= $(this).parent().prevAll().eq(5).text();
				
				$(this).click(function(){
					$.ajax({
						url:"admindelete.php",
						type:"POST",
						data:{index:id},

						success:function(data3){
							if(data3=="deleted")
							{
								var msg="<div class='alert alert-success' role='alert'>Successfully Deleted</div>";
			            		$("#msginfo").append(msg);
			            		$("#msginfo").fadeOut(4000,function(){
			            			//window.location.replace()
			            		});
							}
							
						}

					});
				});
			});

		}

	 });

	$("#insertrow").click(function(){
		var newrow = '<tr><td><input type="text" name="name"></td><td><input type="text" name="artist"></td><td><input type="text" name="album"></td><td><input type="text" name="latest"></td><td><input type="text" name="genre"></td></tr>';
		$("#inserttable tbody").append(newrow);
	});

	$("#insertbt").click(function(){
		var name = $("#inserttable tr td input").eq(0).val();

		var tablelength = $("#inserttable tbody tr").length;
		var eachdata = [];

		for(var i = 0; i < tablelength*5 ; i++)
		{
			var tddata = $("#inserttable tbody tr td input").eq(i).val();
			
			eachdata.push(tddata);


		}

		var contains=jQuery.inArray("",eachdata);
		if(contains!=-1){
			$("#msginfo").text("All fields are mandatory");
			$("#msginfo").css("color", "red");
			$("#msginfo").fadeOut(5000);
			
		}
		else{

			$.ajax({
				url: "admininsert.php",
	            type: "POST",
	            data: {index1:eachdata,index2:tablelength},

	            success:function(data1){
	            	//data = $.parseJSON(data);
	            	if(data1=="success"){
	            		var msg="<div class='alert alert-success' role='alert'>Successfully updated</div>";
	            		$("#msginfo").append(msg);
			            $("#msginfo").fadeOut(4000);

	            	}
	            	else{
	            		alert(data1);
	            	}
	            }
			});
		}
	});

});