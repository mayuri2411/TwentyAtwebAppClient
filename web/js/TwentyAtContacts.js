/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function TwentyAtContacts(strJson){
 
    this.contacts=new Array();
//alert(jsonString); 

 var arrayObj=eval("("+strJson+")").contacts;

//var arrayObj=jsonString.friends; 

var max=arrayObj.length;
for(i=0;i<max;i++){
    var obj=new TwentyAtContact(arrayObj[i]);
   // alert(JSONstring.make(TwentyAtFriend));
   // alert(obj.firstName);
    this.contacts[i]=obj;
}
 
}