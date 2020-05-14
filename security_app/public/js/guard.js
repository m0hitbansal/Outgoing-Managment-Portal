var roll_no="";
var date= new Date();
	var exittime= date.toISOString().split('T')[0] + ' '  
                        + date.toTimeString().split(' ')[0]; 
	console.log(exittime);
$("#menu-toggle").click(function(e) {
  e.preventDefault();
  $("#wrapper").toggleClass("toggled");
});
function my_signout() {

  window.location.href='/login';
}
function hideall(){
      homepage.style.display="none";
      inout.style.display="none";
      $("#stud_details").fadeOut();
	$('#entry').val('');
}
function showup(id) {
  var x=document.getElementById(id);
  hideall();
  x.style.display="block";
}
function showdetails(){
  var val=$("#entry").val();
  console.log(val);
  $.ajax({
   method: "POST",
   url: "/userdetails",
   data: {roll:val},
    success:function( result ) {
    	$.ajax({
    		method: "POST",
		   url: "/checkinout",
		   data: {roll:val},
		    success:function( data ){
		    	console.log(typeof(data));
		    	roll_no=result[0]['roll_no'];
		    	  var str="";
		    	if(data=="OUT"){
			       str='<div class="card card-body"><p>Roll : '+result[0]['roll_no']+ '</p><p>Name : '+ result[0]['name']+'</p><p>Hostel : '+result[0]['hostel_name']+'</p><p>Room No : '+result[0]['room_no']+'</p><button id="incoming" class="btn btn-primary" type="submit"  disabled>In</button><button id="outgoing" class="btn btn-warning" type="submit"  onclick="OUT()" >Out</button></div>';
       		    }
       		    else{
       		    	str='<div class="card card-body"><p>Roll : '+result[0]['roll_no']+ '</p><p>Name : '+ result[0]['name']+'</p><p>Hostel : '+result[0]['hostel_name']+'</p><p>Room No : '+result[0]['room_no']+'</p><button id="incoming" class="btn btn-primary" type="submit"  onclick="IN('+data[0]['id']+')" >In</button><button id="outgoing" class="btn btn-warning" type="submit" disabled>Out</button></div>';
       		    }
       		    $("#stud_details").fadeIn();
	            $("#stud_details").html(str);
		    }
    	});
    },
     error: function (request, status) {
        alert("Roll Number not found");
        $('#entry').val('');
    }
  });
 
}
function IN(id){
	$.ajax({
   method: "POST",
   url: "/localcheckin",
   data: {id:id},
    success:function( result ) {
      $('#entry').val('');
    	$("#stud_details").fadeOut();
    }
});
 }
function OUT(){
	$.ajax({
   method: "POST",
   url: "/localcheckout",
   data: {roll:roll_no},
    success:function( result ) {
       $('#entry').val('');
    	$("#stud_details").fadeOut();
    }
});
	
}