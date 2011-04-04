          
function TwentyAtFriends(jsonString){ 
    this.friends=new Array();
    //alert(jsonString);
    // var arrayObj=eval("("+jsonString+")").friends;
    //alert('jsonString.friends===='+jsonString.friends);
    var arrayObj=jsonString.friends; 
    var max=arrayObj.length;
    for(i=0;i<max;i++){
        var obj=new TwentyAtFriend(arrayObj[i]);
        // alert(JSONstring.make(TwentyAtFriend));
        //alert(obj.firstName);
        this.friends[i]=obj;
    }
}