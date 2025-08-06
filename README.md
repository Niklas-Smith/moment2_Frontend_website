### Backend-baserad webbutveckling <br> Moment2 Introduktion till webbtjänster.<br> av: Niklas Smith <br>  student-id : nism2400 <br> Kurs: DT207G

Detta är frontend delen för mitt moment 2 Backend-baserad webbutveckling 
Detta repositories innhåller:  
1. index.html min startsida med en lista på mina job.
2. add.html sida där jag kan lägga till jobb.
3. about.html sida där jag beskriver hemsidan också slutsater/vad jag gjort
4. main.js Här finns mina javascript för sidan (hämtar in jobb, skriv ut jobb, lägg till jobb och ta bort jobb)
5. style.css här finns min css för hemsidan


min tabel för MYSQL:

| Tabel                    |      fält                                                                             |
|--------------------------|---------------------------------------------------------------------------------------|
| WorkexperienceSchema     | _id:INT, companyname:VARCHAR(150) , jobtitle:VARCHAR(150) , location:VARCHAR(150)     |


Hur man använder mitt api:

1. GET /api/jobs  hämtar alla job som finns tillagda.
2. POST /api/jobs  Lägg till nytt job. måste skicka med rätt information i object.
3. PUT /api/jobs/:id  uppdatera ett job baserat på id. måste skicka med rätt information i object.
4. DELETE /api/jobs/:id Ta bort ett job baserat på id. måste skicka med rätt information i object.

exempel på hur object kan se ut och ska har följade fält och uppbyggnad.   

   {
  "companyname" : "namn på företag",   
"jobtitle": "namn på jobtitle",   
    "location": "namn på location"  
}
