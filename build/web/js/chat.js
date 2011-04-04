/**
 * This script will be used for one-to-one and multiuser chat
 * 
 */

var Chat = {
	CONFERENCE_SERVICE : "conference.ec2-50-16-41-243.compute-1.amazonaws.com",
	DOMAIN : "ec2-50-16-41-243.compute-1.amazonaws.com",
	BOSH_SERVICE : "http://ec2-50-16-41-243.compute-1.amazonaws.com:7070/http-bind/",
	NS_MUC : "http:// jabber.org/protocol/muc",
	
	connection : null,
	friendlyName : null,
	
	jid : null,
	sid : null,
	rid : null,
	
	/**
	 * This function will be used to connect with bosh service
	 * 
	 */
	doConnection : function()
	{
		
		var conn = new Strophe.Connection(Chat.BOSH_SERVICE);
		Chat.connection = conn;	
		Chat.connection.rawInput = rawInput;
		Chat.connection.rawOutput = rawOutput;
	},
	
	doAttachConnection : function()
	{
		Chat.connection.attach(Chat.jid, Chat.sid, parseInt(Chat.rid, 10) + 1, function(status){
			if (status === Strophe.Status.ATTACHED) {	
				//setting own presence as online
				Chat.connection.send($pres().c('priority').t('0').tree());	

				//Setting variables
				Chat.friendlyName = username;
				Chat.jid = Chat.connection.jid;	
				Chat.sid = Chat.connection.sid;
				Chat.rid = Chat.connection.rid;
				
				//Setting listener for message, group message, invitation etc
				Chat.setUpHandler();
				
			} else if (status === Strophe.Status.DISCONNECTED) {
				//trigger UI to disable chat
			}	
		});
	},

	/**
	 * This method will be used to connect XMPP service using usrname(JID) and password
	 * 
	 * @param username
	 * @param password
	 * @returns {Boolean}
	 */
	doLogin : function(username, password)
	{
		
		Chat.connection.connect(username+"@"+Chat.DOMAIN, password, function(status){	
			
			if (status === Strophe.Status.CONNECTED) {	
				//setting own presence as online
				Chat.connection.send($pres().c('priority').t('0').tree());	

				//Setting variables
				Chat.friendlyName = username;
				Chat.jid = Chat.connection.jid;	
				Chat.sid = Chat.connection.sid;
				Chat.rid = Chat.connection.rid;
				
				//Setting listener for message, group message, invitation etc
				Chat.setUpHandler();
				
			} else if (status === Strophe.Status.DISCONNECTED) {
				//trigger UI to disable chat
			}	
		});	
		
		return true;
	},
	
	/**
	 * This function will setup all handler for strophe like onMessage, onGroupMessage etc
	 * 
	 * @returns {Boolean}
	 */
	setUpHandler : function()
	{		
		
		Chat.connection.addHandler(Chat.onPresence, null, "presence");
		
		Chat.connection.addHandler(Chat.onGroupMessage, null, "message", "groupchat");
		
		Chat.connection.addHandler(Chat.onMessage, null, "message", "chat");
		
		Chat.connection.addHandler(Chat.onMUCInvitation, null, "message", Strophe.NS.MUC_USER);
		  
	},
	
	/**
	 * This method will be used when user update his/her 20@list
	 * 
	 * @param friendsToAdd (Array)
	 */
	addFriends : function(friendsToAdd)
	{
		var friendsLenght = friendsToAdd.lenght;
		for(i=0;friendsLenght;i++)
		{
			var friendJID = friendsToAdd[i];
			var pres = $pres({to: friendJID+"@"+Chat.DOMAIN, type: "subscribe"});
			Chat.connection.send(pres);
		}
	},
	
	/**
	 * This method will be used when user update his/her 20@list
	 * 
	 * @param friendsToDelete (Array)
	 */
	deleteFriends : function(friendsToDelete)
	{
		var friendsLenght = friendsToDelete.lenght;
		for(i=0;friendsLenght;i++)
		{
			var friendJID = friendsToDelete[i];
			var pres = $pres({to: friendJID+"@"+Chat.DOMAIN, type: "unsubscribe"});
			Chat.connection.send(pres);
		}
	},
	
	/**
	 * This function(handler) will be called for auth accept MUC invitation
	 * 
	 * @param message
	 * @returns {Boolean}
	 */
	onMUCInvitation : function(message)
	{
		var invite = $(message).find('invite');
		 if (invite.length) {
		        
			 room= $(message).attr('from');
		     reason= $(message).find('reason').text();
		     body= $(message).find('body').text();
		     from= $(message).find('invite').attr('from');
		     Chat.joinRoom(room);
		 }
		return true;
	},
	
	/**
	 * This function(handler) will be called when there is presence changed for any contact
	 * 
	 * @param presence
	 * @returns {Boolean}
	 */
	onPresence : function(presence)
	{	
		
		var from = $(presence).attr("from");
	    var jid = Strophe.getBareJidFromJid(from);
	    var resource = Strophe.getResourceFromJid(from);
	    var ptype = $(presence).attr("type") || "available";
	
	    var status = null;
	    var show = null;
	   
	    if (ptype === "error") {
	        // ignore presence updates from things not on the roster
	        // as well as error presence
	        return true;
	    }
	    if (ptype === 'subscribe') {
	    	// Auto Accept Add friend request  
	    	alert("Approve Request");
	        var approveJID = Strophe.getBareJidFromJid(from);
	        Chat.connection.send($pres({to: approveJID, "type": "subscribed"}));
	        Chat.connection.send($pres({to: approveJID, "type": "subscribe"}));	        
	    }
	    if (ptype === "unavailable") {
	        //user is offline
	        status = "offline";
	    } else {    	
	    	//user is online (chatty, away DnD etc)
	    	show = $(presence).find("show").text();    	
	    	if(show === ""  || show === "chat")
	    	{
	    		status = "online";
	    	}
	    }
	    
	    alert(jid+" is now "+status);
	    
	    // notify user code of roster changes
	    return true;
	},
	
	/**
	 * This function(handler) will be called when user recieve any private message
	 * 
	 * @param message
	 */
	onMessage : function(message)
	{	
		
		var from = $(message).attr('from');
	    var room = Strophe.getBareJidFromJid(from);
	    var nick = Strophe.getResourceFromJid(from);
	     
	    var body = $(message).children('body').text();
	    
	    if(body != "" || body.lenght > 0)
	    {
	    	var bodyArray = body.split("!@#");
	    	acknowledge(bodyArray[0]);
	    	
	    }	
	    return true;
	},
	/**
	 * This function(handler) will be callec when user recieve group message
	 * 
	 * @param message
	 * @returns {Boolean}
	 */
	onGroupMessage : function(message)
	{	
		var body = $(message).find("html > body");
		var from = $(message).attr('from');
		
		if (body.length === 0) {
			body = $(message).find('body');
			if (body != "" || body.length > 0) {
				body = body.text();	
				
				if(body === "This room is locked from entry until configuration is confirmed." || 
						body === "This room is now unlocked.")
				{
					
				}
				else
				{
					var bodyArray = body.split("!@#");
					alert("FROM : "+from);
			    	alert("MESSAGE : "+bodyArray[0]);
			    	alert("ETA : "+bodyArray[1]);
				}
			} else {
				body = null;
			}			
		} 
		return true;
	},
	
	/**
	 * This fuction will be called to join room
	 * 
	 * @param roomName
	 * @returns
	 */
	joinRoom : function(room)
	{
		alert("ROOM : "+room+"/"+Chat.friendlyName);
		var stanza = $pres({"to":room+"/" + Chat.friendlyName})
							.c('priority').t("1")
							.c('show').t('true')						
							.up()                                                                                    
							.c('x', {'xmlns':'http://jabber.org/protocol/muc'});                                     
		Chat.connection.send(stanza.tree());
		return true;
	},
	
	/**
	 * This function will be called to create new room
	 * 
	 * @param roomName
	 */
	createRoom : function(room)
	{
		room = room+"@"+Chat.CONFERENCE_SERVICE;
		Chat.joinRoom(room);
	},
	
	/**
	 * This function will be used to diconnect user from XMPP
	 * 
	 */
	doDisconnect : function()
	{
	
			Chat.connection.sync = true; // Switch to using synchronous requests since this is typically called onUnload.
			Chat.connection.flush();
			Chat.connection.disconnect();
	
	},
	
	/**
	 * This function will be called to send message to online user
	 * 
	 * @param to
	 * @param msg
	 */
	sendMessage : function(to, msg, eta, photo)
	{		
		
		if(msg == null || msg == 'undefined' || msg == '')
		{
			return;
		}
		
		if(eta != null || eta != '' || eta != 'undefined')
		{
			msg = msg + "!@#" + eta;
		}
		
		var message = $msg({
			to : to+"@"+Chat.DOMAIN,
			"type" : "chat"
		}).c('body')
		  .t(msg)
		  .up()
		  .c('active',
			{
			  xmlns : "http://jabber.org/protocol/chatstates"
			});
		
		Chat.connection.send(message);
		
	},
	
	/**
	 * This function will be called when user send message to group(room)
	 * 
	 * @param to
	 * @param msg
	 */
	sendGroupMessage : function(to, msg, eta, photo)
	{
		if(msg == null || 'undefined')
		{
			return;
		}
		
		if(eta != null || eta != '' || eta != 'undefined')
		{
			msg = msg + "!@#" + eta;
		}
		
		var message = $msg({
			to : to+"@"+Chat.CONFERENCE_SERVICE,
			"type" : "groupchat"
		}).c('body')
		  .t(msg)
		  .up()
		  .c('active',
			{
			  xmlns : "http://jabber.org/protocol/chatstates"
			});
		
		Chat.connection.send(message);
	},
	
	/**
	 * This function will be called when user wants to invite users for group chat
	 * 
	 * @param roomName
	 * @param users (Array)
	 */
	sendInvitation : function(roomName, users)
	{	
		roomName = roomName+"@"+Chat.CONFERENCE_SERVICE;
		for (var i=0; i<users.length; i++)
		{
			var to = users[i];
			Chat.connection.send($msg({from: Chat.jid,to: roomName}).c('x', {xmlns: "http://jabber.org/protocol/muc#user"}) 
										            .c("invite",{to:to+"@"+Chat.DOMAIN}) 
								            .c("reason").t("Lets chat"));
		}
	},
	
	/**
	 * Pausing connection so user can re-attach to same session
	 */
	pauseConnection : function()
	{
		Chat.connection.pause();
	}
};
$(document).ready(function () {
	    $('#reply').bind('click', function () {
	    	var msg = $('#replyTxt').get(0).value;
	    	to = "sagar";
	    	var eta = "15";	    	
	    	Chat.sendMessage(to, msg, eta);
	    });
});
$(document).ready(function () {
	    $('#advReply').bind('click', function () {
	    	var msg = $('#replyTxt').get(0).value;
	    	var to = "bipin-room";	    	
	    	Chat.sendGroupMessage(to, msg, eta, photo);
	    });
});
	
$(document).ready(function () {
	    $('#createRoom').bind('click', function () {
	    	roomName = "bipin-room";
	    	Chat.createRoom(roomName);
	    	var users = new Array('sagar', 'himanshu');
	    	Chat.sendInvitation(roomName, users);
	    });
});
	
$(window).unload(function() {  
	Chat.doDisconnect();
//	Chat.pauseConnection();
//	storeConnectionInfo();
});

function storeConnectionInfo()
{	
	localStorage.setItem("sid", Chat.connection.sid);
	localStorage.setItem("rid", Chat.connection.rid);
	localStorage.setItem("jid", Chat.connection.jid);
	
}

function rawInput(data)
{
    log('RECV: ' + data);
}

function rawOutput(data)
{
    log('SENT: ' + data);
}
function log(msg) 
{
    $('#log').append('<div></div>').append(document.createTextNode(msg));
}
$(window).load(function() {

});

