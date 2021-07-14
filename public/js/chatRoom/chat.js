let socket = io();
let messages = document.getElementById("messages");

$("#form").submit(function(e) {
  let li = document.createElement("li");
  e.preventDefault(); // prevents page reloading
  socket.emit("chat message", $("#message").val(),username,groupid);
  scrollToBottom();
  $("#message").val("");
});


socket.on("received", data => {
  console.log("received");
  messages.innerHTML =
  messages.innerHTML +
    `<li class="msg ${
          username == data.sender ? 'me' : 'other'
        }" style="list-style-type:none; ">
        <p><b>${
          username == data.sender ? "me" : data.sender
        }</b></p>
        <p >${data.message}</p>
    </li>`;

  scrollToBottom();
});
 

$('.create').submit(function(e){
	e.preventDefault();
	socket.emit("create-group",$('#grpname').val(), username);
});

$(".call").on("click",(e)=>{
	let grp= e.currentTarget.classList[4];
  socket.emit('starting-call',grp,username);
	window.location.href =`/room/${grp}`;

})
socket.on("incoming-call",(caller)=>{
  console.log("calling...");
  document.querySelector(".modal").style.display="block";
});
 $(".answer").on("click",(e)=>{
    let grp= e.currentTarget.classList[4];
    window.location.href =`/room/${grp}`;
 });

 $(".decline").on("click",(e)=>{
   
    window.location.href =`/users`;
 });

$("h4").on("click",(e)=>{
	$(".chat-title").innerHTML= `${e.currentTarget.innerHTML}`;
	socket.emit("select",e.currentTarget.classList[0]);
});

socket.on('redirect', function(destination,grp) {
    window.location.href = destination;
});



socket.on('user-group',function(name){
	let newgroup= document.createElement("h4");
	let i= name.indexOf("---");
	let nn= name.substring(0,i)
	newgroup.innerHTML=nn;
	document.querySelector(".groups").append(newgroup);
	window.location.href ='/users';
})
const scrollToBottom = () => {
  let d = $('#messages');
  d.scrollTop(d.prop("scrollHeight"));
}
scrollToBottom();


$(".add").on('click',(e)=>{
	let grp= e.currentTarget.classList[4];
	let nm= prompt("New member");
	socket.emit('add-member',grp,nm);
});

$(".leave").on('click',(e)=>{
  let grp= e.currentTarget.classList[3];
  socket.emit("leave-group",grp,username);

});