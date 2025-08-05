
let jobinfoapi = [] 

 let joblistEl = document.querySelector(".ul_jobs");
let addJobForm = document.getElementById("addJobb");



window.onload = init; 
function init() {
getJobs();
if (addJobForm) {

addJobForm.addEventListener("submit", createWork)
}



 } 

async function getJobs()  {
    const resp = await fetch("http://127.0.0.1:3000/api/jobs")

    jobinfoapi = await resp.json()

  


    loadJobs()


}

function loadJobs() {
    let jobs = jobinfoapi

 console.log(jobs)

   

 if(joblistEl) {
     joblistEl.innerHTML = ""
 jobs.forEach(jobb => {
 let liEl = document.createElement("li")
 let jobinfoEl = document.createTextNode(`Jobbade hos ${jobb.companyname} som ${jobb.jobtitle} i staden ${jobb.location}. `)

 const removeButton = document.createElement("button")
 removeButton.textContent = "Ta bort"
 removeButton.id = jobb.id
 joblistEl.appendChild(liEl)
liEl.appendChild(jobinfoEl)
liEl.appendChild(removeButton)
 removeButton.addEventListener("click", removeJob)
 })


}
}







async function createWork(event) {
    
 // gör att form inte ladda om sida
  event.preventDefault();
   // skapar varibler som tar input value 

    let companynameInput = document.getElementById("companyname").value;
    let jobtitleInput =  document.getElementById("jobtitle").value;
    let locationInput =  document.getElementById("location").value;

    if(!companynameInput || !jobtitleInput || !locationInput  ) {
       console.log("måste fylla i alla fält")
     return
    }
          // skapar ett object med companyname,jobtitle och location

    let job = {
      companyname: companynameInput,
      jobtitle: jobtitleInput, 
      location: locationInput
    }

// gör ett post begäran till http://127.0.0.1:3000/api/jobs som är ett api i backend delen
    try{
    const resp = await fetch ("http://127.0.0.1:3000/api/jobs", {
method : "POST",
headers:{
"content-type": "application/json",

} ,   // skapar en Json sträng av job object
body: JSON.stringify(job) 
    })
     // om skapar jobb skickar dig till index sidan
if(resp.ok) {
    const data = await resp.json();

   window.location.href = "index.html";

} else {

    throw error;
}

 
    } catch (error){
        console.log("Något blev fel" + error );

    }



}

async function removeJob(event) {
  const removeId = event.target.id
    

 try{
    const resp = await fetch (`http://127.0.0.1:3000/api/jobs/${removeId}  `, {
method : "DELETE",
  

    })
 
if(resp.ok) {
    const data = await resp.json();

} else {
    throw error;
}


    } catch (error){
        console.log("Något blev fel" + error );

    }

getJobs()


}



