function existsData(key){
	var result= (selectData(key)!=null);
	return result;
}
function selectData(key){
	return window.localStorage.getItem(key);
}
 
function insertData(key,value){
 
        alert('insert data'); 
	window.localStorage.setItem(key,value);
        alert('exist data profile===='+existsData('Profile'));

        alert('exist data Friends===='+existsData('Friends'));
        
}

function updateData(key,value){
	window.localStorage.setItem(key,value);
}

function deleteData(key){
	window.localStorage.removeItem(key);
}

function clearData(){
	window.localStorage.clear(); 
}

