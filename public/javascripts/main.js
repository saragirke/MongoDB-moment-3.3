"use strict";


var baseURL = "http://localhost:3000/courses/";

// GET courses
document.addEventListener("DOMContentLoaded", function(){ 

    // Hämta kurser
        let url = baseURL;
        fetch(url, {method: 'GET'})
            .then(response => response.text())
                .then(data => {
                    var jsonData = JSON.parse( data );
                    var writeCourses = "<div class='divt'><h1>Kurser</h1><table><th>Namn</th><th>Kurskod</th><th>Kursplan</th><th>Progression</th><th>Termin</th><th>Radera</th><th>Uppdatera</th>";
                    for(var i=0; i < jsonData.length; i++){
                        writeCourses += "<tr><td id='courseName' + jsonData[i]._id  contenteditable>"+jsonData[i].name+"</td><td id='courseCode' contenteditable>"+jsonData[i].code+"</td><td id='courseSyll' contenteditable>"+ "<a href=" + jsonData[i].syllabus + "target='_blank'>Länk</a>" + "</td><td id='courseProg' contenteditable>"+jsonData[i].progression+"</td><td id='courseTerm' contenteditable>"+jsonData[i].term+
                            "</td><td><img src='images/trash.png' class='delete'  id=" + jsonData[i]._id + "/></td> <td><img src='images/pencil.png' alt='update course' class='update' id=" + jsonData[i]._id + "/></td> </tr>";    
                    }
                    writeCourses += "</table></div>";
                    
                    //Kurserna skrivs ut
                    document.getElementById("courses").innerHTML = writeCourses;
                    
                    //Variabler för knapparna
                    let updateBtn = document.getElementsByClassName("update");
                    let deleteBtn = document.getElementsByClassName("delete");

                        // Evenetlistener för knapparna, anropar funktioner för delete och update
                        for(let i = 0; i < updateBtn.length; i++) {
                        deleteBtn[i].addEventListener("click", deleteCourse);
                        updateBtn[i].addEventListener("click", updateCourse);
    }
                 })
            .catch(error => {
                alert('There was an error '+error);
            }
            
            );

/********************************************************************* */
// Create event handler for delete course
/********************************************************************* */
function deleteCourse(e) {
    let url=baseURL+e.target.id;
    fetch(url, {method: 'DELETE'})
        .then(response => response.text())
            .then(data => {
                location.reload();
             })
        .catch(error => {
            alert('There was an error '+error);
        });
}

/********************************************************************* */
// Create event handler for ADD course
/********************************************************************* */
document.getElementById("create").addEventListener("click", (e) => {
    
    var obj = {};
    obj.name = document.getElementById("name").value;
    obj.code = document.getElementById("code").value;
    obj.syllabus = document.getElementById("syllabus").value;
    obj.progression = document.getElementById("progression").value;
    obj.term = document.getElementById("term").value;

    fetch(url, {method: 'POST', 
                    body: JSON.stringify(obj), 	
                        headers: { 'Content-type': 'application/json; charset=UTF-8'} })
        .then(response => response.text())
            .then(data => {
                location.reload();
             })
        .catch(error => {
            alert('There was an error '+error);
        });
});



/********************************************************************* */
// Create event handler for UPDATE course
/********************************************************************* */
function updateCourse(e) {
    
    let url=baseURL+e.target.dataset.id;

    //Lagrad id som variabel
    let id = e.target.id;
    console.log("Hej ID: " + id);
    
    let Cname= document.getElementById("coursename"+ id).value;
    let Ccode= document.getElementById("courseCode"+ id);
    let Cprogression= document.getElementById("courseProg" + id);
    let Csyllabus= document.getElementById("courseSyll" + id);
    let Cterm= document.getElementById("courseTerm" + id); 

   console.log(Cname); 

    var obj = {};
    obj.name = Cname,
    obj.code = Ccode;
    obj.syllabus = Cprogression;
    obj.progression = Csyllabus;
    obj.term = Cterm; 
    obj.id = id; //??????
    

    /* Objektet som skall lagras i databasen
    var obj = {};
    obj.name = document.getElementById("courseName" + id).innerHTML;
    obj.code = document.getElementById("courseCode" + id).value;
    obj.syllabus = document.getElementById("courseSyll" + id).value;
    obj.progression = document.getElementById("courseProg" +id).value;
    obj.term = document.getElementById("courseTerm" + id).value; */

    fetch(url, {method: 'PUT', 
                    body: JSON.stringify(obj), 	
                        headers: { 'Content-type': 'application/json; charset=UTF-8'} })
        .then(response => response.text())
            .then(data => {
                location.reload();
             })
        .catch(error => {
            alert('There was an error '+error);
        });
}




   

}); 


