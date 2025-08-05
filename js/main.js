//skapar varible med en tom array 
let jobinfoapi = [] 
//skapar variabler 
 let joblistEl = document.querySelector(".ul_jobs");
let addJobForm = document.getElementById("addJobb");



//när sidan laddar kör function init
window.onload = init; 

function init() {
    //när sidan läser in anropa function getJobs()
getJobs();
//om carslist finns anropa function createWork()
if (addJobForm) {

addJobForm.addEventListener("submit", createWork)
}


 } 

//function som hämtar data från http://127.0.0.1:3000/api/jobs och lagra i tom array jobinfoapi
async function getJobs()  {
    const resp = await fetch("http://127.0.0.1:3000/api/jobs")

    jobinfoapi = await resp.json()

  


    loadJobs()


}


/*function som skrivar ut data från jobinfoapi och skapar en knapp med id i en lista och loppar igenom alla entries som finns.
Detta blir:
<section class="section_jobs">
<ul class="ul_jobs">
<li> Jobbade hos ${jobb.companyname} som ${jobb.jobtitle} i staden ${jobb.location}. 
<button id="jobb.id">ta bort</button>
</li>

</ul>
</section>
*/
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






//function som gör att man kan lagra ett nytt jobb i en lista  ett post begären till ett api
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
//function som gör att man kan ta bort ett jobb i listen me ett DELETE begäran till ett api (som target id)
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



