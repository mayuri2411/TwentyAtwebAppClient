
$(document).ready(function(){
	$('.close').click(function() {
		$('.notification').toggle();
		});
	
	$('.send').live('touchend', function(){
		$('.notification').toggle();
		$('.send').css('background-image','url("images/navbar_buttons/send.png")');
	});
	$('.send').live('touchstart', function(){
		$('.send').css('background-image','url("images/navbar_buttons/send_selected.png")');
	});
	
	
	Chat.doConnection();
	Chat.doLogin("avinash","cloud");
});


$(document).ready(function(){
	$('.send').click(function(){
		var msg = document.getElementById("message").value;
		alert("Msg sent.");
		sendComposedMsg(msg);
	});
});

function sendComposedMsg(msg){
	var msg = document.getElementById("message").value;
	var frnds = new Array('bipin');
	Chat.addFriends(frnds);
	Chat.sendMessage("bipin",msg,null,null);
}

function acknowledge(msg){
	alert(msg);
}