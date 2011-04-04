/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function TwentyAtContact(objJson){


//firstName" : "Himanshu",
//   "lastName" : "Khona",
//   "contactPersonId" : "69d868bd-0871-4c94-a530-34effb497a50",
//   "photoUrl" : "http://graph.facebook.com/835808279/picture?type=normal"
    this.firstName=objJson.firstName;
    this.lastName=objJson.lastName;
    this.photoUrl=objJson.photoUrl;
    this.contactPersonId=objJson.contactPersonId;

    


}