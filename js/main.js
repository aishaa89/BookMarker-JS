

var siteNameInput=document.getElementById("siteName");
var siteUrl=document.getElementById("siteurl");
var tablBody=document.getElementById("tableContent");
var modalError=document.getElementById("modalError");
var addBtn=document.getElementById("submitbtn");
var sites=[];

if(localStorage.getItem("Sites")!=null){
    sites=JSON.parse(localStorage.getItem("Sites"));
    displaySites();
    
}

//////////////add site//////////////////

function addSite(){

   if(validateName()==true&&validateUrl()==true){
     var site={
        name:siteNameInput.value,
        url:siteUrl.value
    }
    sites.push(site);
    localStorage.setItem("Sites",JSON.stringify(sites));
    displaySites();
    clearForm();

   }else{
    $("#modalError").modal('show');
    
   }
}

//Function To display Data in the table
function displaySites(){
    var sitecontent=``; 
    for(var i=0;i<sites.length;i++){
    sitecontent+=`
       <tr>
       <td>${i+1}</td>
       <td>${sites[i].name}</td>              
      <td>
      <button class="btn btn-visit" onclick="visiteSite(${i})">
        <i class="fa-solid fa-eye pe-2"></i>Visit
      </button>
     </td>
     <td>
      <button class="btn btn-delete pe-2" onclick="deleteSite(${i})" >
        <i class="fa-solid fa-trash-can"></i>
        Delete
      </button>
    </td>
</tr>
    `
    }
    tablBody.innerHTML=sitecontent;
}
//Clear data from inputs
function clearForm(){
    siteNameInput.value='';
    siteUrl.value='';
}


//Delete the data 
function deleteSite(siteId){
     sites.splice(siteId,1);
     localStorage.setItem("Sites",JSON.stringify(sites));
    displaySites()

}


/////Visite URL////

function visiteSite(siteid){
     var visitUrl=sites[siteid].url;
     window.open(visitUrl);
}

////////////////validation code////////////////////

 var validNameMessage=document.getElementById("message");
var  urlMessage=document.getElementById("urlMessage");
function validateName(){
    var siteName=siteNameInput.value;
    var regexName=/^([A-Z]|[0-9]){3,10}$/i;

    if(regexName.test(siteName)){
        siteNameInput.classList.add("is-valid");
        siteNameInput.classList.remove("is-invalid");
        validNameMessage.classList.add("d-none");
        return true

    }else{
        siteNameInput.classList.add("is-invalid");
        siteNameInput.classList.remove("is-valid");
        validNameMessage.classList.remove("d-none");

      return false;

    }


}



function validateUrl(){
    var validsiteUrl=siteUrl.value;
    var regexUrl=  /^(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;
    ;

    if(regexUrl.test(validsiteUrl)){
        siteUrl.classList.add("is-valid");
        siteUrl.classList.remove("is-invalid");
        urlMessage.classList.add("d-none");
        return true

    }else{
        siteUrl.classList.add("is-invalid");
        siteUrl.classList.remove("is-valid");
        urlMessage.classList.remove("d-none");

      return false;

    }


}

