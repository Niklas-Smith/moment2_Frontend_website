
let jobinfoapi = [] 
getJobs();

async function getJobs()  {
    const resp = await fetch("http://127.0.0.1:3000/api/jobs")

    jobinfoapi = await resp.json()

  


    loadJobs()


}

function loadJobs() {
    let jobs = jobinfoapi

 console.log(jobs)

 let joblistEl = document.querySelector(".ul_jobs");
 joblistEl.innerHTML= ""

 jobs.forEach(job => {
 let liEl = document.createElement("li")
 let jobinfoEl = document.createTextNode(`jobbade hos: ${job.companyname} som: ${job.jobtitle} i stad: ${job.location} `)

 joblistEl.appendChild(liEl)
liEl.appendChild(jobinfoEl)

 })
}