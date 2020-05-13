$("#menu-toggle").click(function(e) {
  e.preventDefault();
  $("#wrapper").toggleClass("toggled");
});

$('.vanish1').click(function(){
  this.innerHTML="Allowed";
  this.style.background = "green";
  var $target = $(this).parents('li');
  $target.hide(1000,'swing', function(){ $target.remove(); });
});

$('.vanish2').click(function(){
  this.innerHTML="Rejected";
  this.style.background = "red";
  var $target = $(this).parents('li');
  $target.hide(1000,'swing', function(){ $target.remove(); });
});


// function vanish1(id){
//   var x=document.getElementById(id);
//   x.innerHTML="Allowed";
//   x.style.background = "green";
//   var $target = $(this).parents('li');
//   $target.hide(1000,'swing', function(){ $target.remove(); });
// }




   function hideall(){
      homepage.style.display="none";
      requestbox.style.display="none";
    }
    function showup(id) {
      var x=document.getElementById(id);
      hideall();
      x.style.display="block";
    }

var name="",room="",hostel="";
$.ajax({
   method: "GET",
   url: "/getLeaves",

    success:function( data ) {

     for(let i=0;i<data.length;i++){
        $.ajax({
           method: "POST",
           url: "/userdetails",
           data: {roll: data[i]['roll_no']},
            success:function( result ) {
              console.log(data[i].reason);
            console.log(data);
               
             name=result[0]['name'];
             room=result[0]['room_no'];
             hostel=result[0]['hostel_name'];
             var str='<li class="col-md-12 no-bullets"><div class="card" id="'+data[i]['id']+'" name="'+data[i]['id']+'"><h3 style="text-align: center;">'+name+'</h3><fieldset>';
                str+='<label for="roll">Roll Number : </label><input type="text"  tabindex="1" value="'+data[i]['roll_no']+'" disabled></fieldset>';
                str+='<fieldset><label for="hostel">Hostel : </label><input type="text" tabindex="2" value="'+hostel+'" disabled></fieldset>';
                str+='<fieldset><label for="room">Room Number : </label><input type="number"  tabindex="3" value="'+room+'" disabled></fieldset>';
                str+='<fieldset><label for="date">Departure Date : </label><input type="date"  tabindex="4" value="" disabled></fieldset>';
                str+='<fieldset><label for="reason">Reason for Leave : </label><textarea  tabindex="5"  disabled>'+data[i]['reason']+'</textarea></fieldset>';
                str+='<a id="yesbtn" class="vanish1 btn btn-info waves-effect waves-light" onclick="allow('+data[i]['id']+')">Allow</a><a id="nobtn" class="vanish2 btn btn-outline-info waves-effect" onclick="reject('+data[i]['id']+')">Reject</a></div></li>';
           $('#showRequest').append(str);

           }
           
        });
         
   }
 }
});

function allow(id){
  $.ajax({
           method: "POST",
           url: "/allow_leave",
           data: {request_no: id},
            success:function( result ) {
              console.log('allowed');
              $('#'+id).hide(1000,'swing', function(){ $('id').remove(); 
          }); 
            }
          });

}
function reject(id){
$.ajax({
           method: "POST",
           url: "/reject_leave",
           data: {request_no: id},
            success:function( result ) {
             $('#'+id).hide(1000,'swing', function(){ $('id').remove(); 
              }); 
            }
          });
}