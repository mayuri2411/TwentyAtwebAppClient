var uuid=null;
        
function createIndividualFriendElements(contact,index){
    //alert('creating** individual frnd elts');
    //  alert('*uuid=='+selectData("Profile").twentyatUserId);
    var fbfriendlist = document.createElement("div");
    fbfriendlist.setAttribute("id","fbfriendlist"+index);
    var radiobutton = document.createElement("div");
    radiobutton.setAttribute("id", "radiobutton"+index);
    var imgRadio=document.createElement("img");
    imgRadio.setAttribute("id", "imgRadio"+index);
    imgRadio.setAttribute("src", "images/radio_button_open.png");
    radiobutton.appendChild(imgRadio);     
    var fbfriendname = document.createElement("div");
    fbfriendname.setAttribute("id", "fbfriendname"+index);
    fbfriendname.innerHTML=contact.firstName +" "+contact.lastName;
    var fbfriendimage = document.createElement("div");
    fbfriendimage.setAttribute("id", "fbfriendimage"+index);   
    var imgProfile=document.createElement("img");
    imgProfile.setAttribute("id", "imgProfile"+index);
    imgProfile.setAttribute("src", contact.photoUrl); 
    fbfriendimage.appendChild(imgProfile);
    fbfriendlist.appendChild(radiobutton);
    fbfriendlist.appendChild(fbfriendname);
    fbfriendlist.appendChild(fbfriendimage);
   
    var basediv=document.getElementById("wrapper1");
    basediv.appendChild(fbfriendlist); 
      
    $('#fbfriendlist'+index).addClass("div-add-friend");
    $('#radiobutton'+index).addClass("radiobutton1");
    $('#fbfriendname'+index).addClass("btn-add-friend");
    $('#fbfriendimage'+index).addClass("FBF-Img");
    $('#radiobutton'+index).click( function(){
        //  alert("you clicked me"+index);
         var radiobtnImg=document.getElementById('imgRadio'+index);
        radiobtnImg.src="img/radio_button_selected.png";
        addContactToArray(contact);
    });           
}
 
  
var contactDetails=new Array();

//building data to send to review page
function addContactToArray(contact){  
    var personObj=new Object();
    personObj.firstName=contact.firstName;
    personObj.lastName=contact.lastName;
    personObj.contactPersonId=contact.contactPersonId;
    personObj.photo=contact.photoUrl;
    personObj.email="avinash@techingen.com";
    var cnt=contactDetails.length;
    contactDetails[cnt] = personObj;
    //alert("*+--"+contactDetails[cnt].firstName+"contactPersonId--"+contactDetails[cnt].contactPersonId);
    //alert("len"+contactDetails.length);
} 

                              
function callReviewFriends(){ 
    //alert('call add friends service');
    var contactlength=contactDetails.length;
    //   alert('contactlength'+contactlength);
    var objProfile=null;
    if(existsData("Profile")){
        objProfile=eval('('+selectData("Profile")+')');
        uuid=objProfile.twentyatUserId;
        //alert('**uuid=='+uuid);
    }


    var params = {
        uuid:uuid,
        contacts: [],
        twentyatuser:[]
    };
 
    for(var i in contactDetails) {
        var item = contactDetails[i];
        params.contacts.push({
            "email" : item.email,
            "contactPersonId":item.contactPersonId
        });
    }
                          
    var strJson=JSONstring.make(params);
    //alert('calling server for add friends service :::: '+strJson);
    $.ajax({ 
        type: "POST", 
        url: 'http://192.168.1.100:8080/twentyat-web/addFriend/',
      //  url: 'http://ec2-50-16-41-243.compute-1.amazonaws.com:8080/twentyat-web/addFriend/',
        data: strJson,
        contentType: 'application/json',
        success: function successdone(addFriendData){
            var statusMessage=addFriendData.status.message;
            //alert(addFriendData.toString());
            if(statusMessage=='ok'){
                //alert('status ok now calling insert data');
                var arrObj=new TwentyAtFriends(addFriendData);
                //alert('arrObj.friends[0].lastName==='+arrObj.friends[0].lastName);
                var strArray=JSONstring.make(arrObj); 
                //   alert(strArray);
                insertData("Friends",strArray);
                $(location).attr('href', '../../20S_ClientURL/index3.html');
            }
        },
        error: function erroroccoured(data){
            alert('error : '+data.status);
        },
        dataType: "json"
    });
            
 

//   for (var j=0;j<contactlength;j++){
//
//        var reviewfriendlist = document.createElement("div");
//        reviewfriendlist.setAttribute("id","reviewfriendlist"+j);
//
//        var deletebutton = document.createElement("div");
//        deletebutton.setAttribute("id", "deletebutton"+j);
//
//        var reviewfriendname = document.createElement("div");
//        reviewfriendname.setAttribute("id", "reviewfriendname"+j);
//        reviewfriendname.innerHTML=contactDetails.firstName +" "+contactDetails.lastName;
//
// 
//        var reviewfriendimage = document.createElement("div");
//        reviewfriendimage.setAttribute("id", "reviewfriendimage"+j);
//
//        reviewfriendlist.appendChild(reviewfriendimage);
//        reviewfriendlist.appendChild(reviewfriendname);
//        reviewfriendlist.appendChild(deletebutton);
//
//        var baseReviewDiv=document.getElementById("reviewFriends");
//        baseReviewDiv.appendChild(reviewfriendlist);
//
//
//        alert('blank divs creatin done');
//
//   }//end of for loop
//
//
}  
  
function createFriendElements(objJson){ 
    var mainAddFriendsDiv=document.getElementById('main-wrapper');
    mainAddFriendsDiv.style.display='block';
    //alert('create friend elements*=='+objJson);
    //alert(objJson.contacts.length);
    var max=objJson.contacts.length;
    for(var i=0;i<max;i++){
        var objContact=objJson.contacts[i];
        // alert('-----'+objContact.firstName);
        createIndividualFriendElements(objContact,i);
    }
}