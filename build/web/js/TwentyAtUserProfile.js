/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


//{"status":{"message":"ok","code":0},
//"profile":
//{"country":null,
//"twentyatUserId":"d5842f80-a84a-429a-ba3c-e38d69d6b634",
//"middleName":null,
//"photo":"http://graph.facebook.com/717183823/picture?type=large",
//"locality":null,"postalCode":null,"region":null,
//"streetAddress":null,
//"email":"mayuri2411@gmail.com",
//"facebookId":717183823,
//"isActive":true,
//"firstName":"Mayuri",
//"lastName":"Ruparel",
//"mobilePhone":null,
//"friendlyName":"Mayuri Ruparel", 
//"twentyatGroups":[{"twentyatUserId":"d5842f80-a84a-429a-ba3c-e38d69d6b634","twentyatGroupId":1,"groupName":"20@ Group","friendsMappings":[]}],"contactPersons":[],"messages":[]}}

function TwentyAtUserProfile(loginData){
   // alert('extractTwentyAtUserDat'+loginData)

    this.firstName=loginData.profile.firstName;
    this.lastName=loginData.profile.lastName;
    this.middleName=loginData.profile.middleName;
    this.email=loginData.profile.email;
    this.country=loginData.profile.country;
    this.twentyatUserId=loginData.profile.twentyatUserId;
    this.photo=loginData.profile.photo;
    this.locality=loginData.profile.locality;
    this.streetAddress=loginData.profile.streetAddress;
    this.facebookId=loginData.profile.facebookId;
    this.isActive=loginData.profile.isActive; 
    this.mobilePhone=loginData.profile.mobilePhone;
    this.friendlyName=loginData.profile.friendlyName;

    



}
