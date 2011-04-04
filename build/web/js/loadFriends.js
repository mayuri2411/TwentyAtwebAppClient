

function extractFriends() {
	
	var friendsArray=selectData("Friends");
	var friendsobj=eval("("+friendsArray+")");
	var name = "";
	//alert(friendsobj.friends.length);
	var totalFriends = friendsobj.friends.length;
	
	javascript:void($('<img/>').attr('src', friendsobj.friends[0].photo).load(function() { $('#friendimg1').css('background-image', 'url('+friendsobj.friends[0].photo+')'); }));
	

	for (i=0; i<totalFriends; i++) {
		//if (i < totalFriends) {
			//var urlString = "'url(" + friendsobj.friends[i].photo + ")'";
			//alert(friendsobj.friends[i]);
			/*if(friendsobj.friends[i] != 'undefined')
			  {*/
				var name = friendsobj.friends[i].firstName + " " + friendsobj.friends[i].lastName;
				
				if (name.length > 8) {
					name=friendsobj.friends[i].firstName
				}
				isFriendSet[i] = "true"; 
				
				if (i===0) {
					javascript:void($('<img/>').attr('src', friendsobj.friends[0].photo).load(function() { 
						$('#friendimg1').css('background-image', 'url('+friendsobj.friends[0].photo+')'); 
					}));
					
					$('#friendname1').text(name);
					
					//alert("line above me didn't work");
				}
				else if (i===1) {
					javascript:void($('<img/>').attr('src', friendsobj.friends[1].photo).load(function() { 
						$('#friendimg2').css('background-image', 'url('+friendsobj.friends[1].photo+')'); 
					}));
					$('#friendname2').text(name);
				}
				else if (i===2) {
					javascript:void($('<img/>').attr('src', friendsobj.friends[2].photo).load(function() { 
						$('#friendimg3').css('background-image', 'url('+friendsobj.friends[2].photo+')'); 
					}));
					$('#friendname3').text(name);
				}
				else if (i===3) {
					javascript:void($('<img/>').attr('src', friendsobj.friends[3].photo).load(function() { 
						$('#friendimg4').css('background-image', 'url('+friendsobj.friends[3].photo+')'); 
					}));
					$('#friendname4').text(name);
				}
				else if (i===4) {
					javascript:void($('<img/>').attr('src', friendsobj.friends[4].photo).load(function() { 
						$('#friendimg5').css('background-image', 'url('+friendsobj.friends[4].photo+')'); 
					}));
					$('#friendname5').text(name);
				}
				else if (i===5) {
					javascript:void($('<img/>').attr('src', friendsobj.friends[5].photo).load(function() { 
						$('#friendimg6').css('background-image', 'url('+friendsobj.friends[5].photo+')'); 
					}));
					$('#friendname6').text(name);
				}
				else if (i===6) {
					javascript:void($('<img/>').attr('src', friendsobj.friends[6].photo).load(function() { 
						$('#friendimg7').css('background-image', 'url('+friendsobj.friends[6].photo+')'); 
					}));
					$('#friendname7').text(name);
				}
				else if (i===7) {
					javascript:void($('<img/>').attr('src', friendsobj.friends[7].photo).load(function() { 
						$('#friendimg8').css('background-image', 'url('+friendsobj.friends[7].photo+')'); 
					}));
					$('#friendname8').text(name);
				}
				else if (i===8) {
					javascript:void($('<img/>').attr('src', friendsobj.friends[8].photo).load(function() { 
						$('#friendimg9').css('background-image', 'url('+friendsobj.friends[8].photo+')'); 
					}));
					$('#friendname9').text(name);
				}
				else if (i===9) {
					javascript:void($('<img/>').attr('src', friendsobj.friends[9].photo).load(function() { 
						$('#friendimg10').css('background-image', 'url('+friendsobj.friends[9].photo+')'); 
					}));
					$('#friendname10').text(name);
				}
				else if (i===10) {
					javascript:void($('<img/>').attr('src', friendsobj.friends[10].photo).load(function() { 
						$('#friendimg11').css('background-image', 'url('+friendsobj.friends[10].photo+')'); 
					}));
					$('#friendname11').text(name);
				}
				else if (i===11) {
					javascript:void($('<img/>').attr('src', friendsobj.friends[11].photo).load(function() { 
						$('#friendimg12').css('background-image', 'url('+friendsobj.friends[11].photo+')'); 
					}));
					$('#friendname12').text(name);
				}
				else if (i===12) {
					javascript:void($('<img/>').attr('src', friendsobj.friends[12].photo).load(function() { 
						$('#friendimg13').css('background-image', 'url('+friendsobj.friends[12].photo+')'); 
					}));
					$('#friendname13').text(name);
				}
				else if (i===13) {
					javascript:void($('<img/>').attr('src', friendsobj.friends[13].photo).load(function() { 
						$('#friendimg14').css('background-image', 'url('+friendsobj.friends[13].photo+')'); 
					}));
					$('#friendname14').text(name);
				}
				else if (i===14) {
					javascript:void($('<img/>').attr('src', friendsobj.friends[14].photo).load(function() { 
						$('#friendimg15').css('background-image', 'url('+friendsobj.friends[14].photo+')'); 
					}));
					$('#friendname15').text(name);
				}
				else if (i===15) {
					javascript:void($('<img/>').attr('src', friendsobj.friends[15].photo).load(function() { 
						$('#friendimg16').css('background-image', 'url('+friendsobj.friends[15].photo+')'); 
					}));
					$('#friendname16').text(name);
				}
				else if (i===16) {
					javascript:void($('<img/>').attr('src', friendsobj.friends[16].photo).load(function() { 
						$('#friendimg17').css('background-image', 'url('+friendsobj.friends[16].photo+')'); 
					}));
					$('#friendname17').text(name);
				}
				else if (i===17) {
					javascript:void($('<img/>').attr('src', friendsobj.friends[17].photo).load(function() { 
						$('#friendimg18').css('background-image', 'url('+friendsobj.friends[17].photo+')'); 
					}));
					$('#friendname18').text(name);
				}
				else if (i===18) {
					javascript:void($('<img/>').attr('src', friendsobj.friends[18].photo).load(function() { 
						$('#friendimg19').css('background-image', 'url('+friendsobj.friends[18].photo+')'); 
					}));
					$('#friendname19').text(name);
				}
				else if (i===19) {
					javascript:void($('<img/>').attr('src', friendsobj.friends[19].photo).load(function() { 
						$('#friendimg20').css('background-image', 'url('+friendsobj.friends[19].photo+')'); 
					}));
					$('#friendname20').text(name);
				}
			//}
		/*}
		else {
			isFriendSet[i] = "false";
		}*/
	}
}



