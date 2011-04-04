
function callLoginFromServer(token){ 
  
       $.ajax({ 
           type: "POST",  
           url: 'http://192.168.1.100:8080/twentyat-web/login/',           
         //  url: 'http://ec2-50-16-41-243.compute-1.amazonaws.com:8080/twentyat-web/login/',
           data: '{"token": "'+token+'"}', 
           contentType: 'application/json',
           success: function successdone(loginData){ 
                   //alert('SUCCESS'+loginData);
                    var statusMessage=loginData.status.message;   
                   if(statusMessage=='ok'){   
                            //alert('statusMessage of login'+statusMessage);
                            var user=  new TwentyAtUserProfile(loginData);
                            var obj=JSONstring.make(user);
                            insertData("Profile",obj.toString());
                 //alert('loginData.isUserRegistered==='+loginData.isUserRegistered);
                  if (loginData.isUserRegistered==true){
                            alert('registered user true');

                         
                         var friendFromLoginData=loginData.friends; 
                         alert('friendFromLoginData'+friendFromLoginData);
                         if(!friendFromLoginData==undefined || !friendFromLoginData.length==0)
                         {//alert('user is registered loading grid view');
                         var friendsArray=new TwentyAtFriends(loginData);  
                         insertData("Friends",JSONstring.make(friendsArray)); 
                         }
                         
                         window.location = "../../20S_ClientURL/index3.html";

                  } else if (loginData.isUserRegistered==false){
                            //alert('new user, ask for add friends');
                            contactsArray=new TwentyAtContacts(JSONstring.make(loginData));
                            createFriendElements(contactsArray);
                  }
                }
                },
           error: function erroroccoured(data){
             alert('Service ERROR : '+data.status);
           },
           dataType: "json"
       });

    }
 


           



