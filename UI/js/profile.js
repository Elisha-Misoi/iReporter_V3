const baseUrl = 'http://127.0.0.1:5000/api/v2';

const getAllIncidentsUrl = `${baseUrl}/incidents`;

let deleteRedflagUrl = `${baseUrl}/redflags/`;

let deleteInterventionUrl = `${baseUrl}/interventions/`;

const token = localStorage.getItem('user_token');

let incidents = [];

const getAllIncidents = () => {

    config = {
        method: 'GET',
        headers: {
            "Content-type":"application/json" ,
            "Accept":"application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": token,
        }
    }

    fetch(getAllIncidentsUrl, config)
    .then(response => response.json().then(res => ({status_code: response.status, body:res})
      ))
      .then(data => {
        incidents = data.body.data;
       mapIncidents(data);
     })
     .catch(err => {
         console.warn(`Fetch Error: ${err}`);
       });
}


const mapIncidents = (data) => {
    console.log(data);

    const user= JSON.parse(localStorage.getItem('user'));

    data.body.data.forEach(incident => {

        if(incident.status === 'under investigation'){
            incident.status = 'investigating';
        }

        const element = ` 
        <div class="post-card flag mycard" id=${incident.id}>
        <span class="status + ${incident.status} mycard">${incident.status}</span>
        <div class="author mycard">
                <img src="UI/css/images/dummy.jpg">
                <span class="user">${user.username}</span>
        </div> 
        <h4 class="title" id="title">${incident.title}</h4>
        <p class="description" id="description">${incident.comment}</p>
        </div>
        `
        ;
    let div = document.createElement("div");
    div.innerHTML=element;
      document.getElementById('incident-card').appendChild(div);  
    });
}


document.addEventListener('click', function (event) {

	// If the clicked element doesn't have the right selector, bail
	if (event.target.matches('.post-card')) {
        displayCard(event.target);
    }

	// Log the clicked element in the console
    console.log(event.target);

}, false);


const displayCard = (element) =>{
    let doc = element;
   
    let incident_id = element.id;

    window.localStorage.setItem('incident_id', incident_id);

   let title_text = "";
   let detail_text = "";

    for (var i = 0; i < doc.childNodes.length; i++) {
        if (doc.childNodes[i].className == "title") {
          title_text = doc.childNodes[i].innerHTML;
        }   
        if (doc.childNodes[i].className == "description") {
            detail_text = doc.childNodes[i].innerHTML;
        }    
    }

   document.getElementById('complaint-title').innerHTML = title_text;
   document.getElementById('complaint-details').innerHTML = detail_text;
}

const populateProfile = () => {
    const user= JSON.parse(localStorage.getItem('user'));

    document.getElementById("profile_fname").innerHTML = user.firstname;
    document.getElementById("profile_lname").innerHTML = user.lastname;
    document.getElementById("profile_username").innerHTML = user.username;
    document.getElementById("profile_email").innerHTML = user.email;
    document.getElementById("profile_phone").innerHTML = user.phoneNumber;

}


const editOnClicked = document.getElementById("edit").addEventListener('click', async(event) => {
    event.preventDefault();
    document.getElementById('complaint').style.display = 'none';
    document.getElementById('edit_form').style.display = 'inline';
});


const cancelOnClicked = document.getElementById("cancel").addEventListener('click', async(event) => {
    event.preventDefault();
    document.getElementById('complaint').style.display = 'inline';
    document.getElementById('edit_form').style.display = 'none';
});


const deleteOnClicked = document.getElementById("delete").addEventListener('click', async(event) => {
    event.preventDefault();
    incident = incidents[window.localStorage.getItem('incident_id') - 1];

    incident_id = incident.id;
    incident_type = incident.type;

    if(incident_type === 'red-flag'){
        deleteRedflagUrl = deleteRedflagUrl + incident_id;
        deleteIncident(deleteRedflagUrl);
    }
    else if(incident_type === 'intervention'){
        deleteInterventionUrl = deleteInterventionUrl + incident_id;
        deleteIncident(deleteInterventionUrl);
    }
});


const submitOnClicked = document.getElementById("submit").addEventListener('click', async(event) => {
    event.preventDefault();
    incident = incidents[window.localStorage.getItem('incident_id') - 1];

    console.log(incident);

    incident_id = incident.id;

    incident.location = document.getElementById('location_input').value;
    incident.comment = document.getElementById('comment_input').value;

    url = `${baseUrl}/incidents/${incident_id}`;
    console.log(url);

    postEditedIncident(url, incident);
});

const deleteIncident = (url) => {

    config = {
        method: 'DELETE',
        headers: {
            "Content-type":"application/json" ,
            "Accept":"application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": token,
        },    
    }

    fetch(url, config)
      .then(response => response.json().then(res => ({status_code: response.status, body:res})
      ))
      .then(data => {
        if(data.status_code == 200){
            console.log(data.body.data);
            window.location.reload();
        }
        else{
            console.warn(data.body.message);
        }
     })
     .catch(err => {
         console.warn(`Fetch Error: ${err}`);
       });
    }


const postEditedIncident = (url, data) => {
    config = {
        method: 'PATCH',
        headers: {
            "Content-type":"application/json" ,
            "Accept":"application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": token,
        },
        body: JSON.stringify(data)
      }

    fetch(url, config)
      .then(response => response.json().then(res => ({status_code: response.status, body:res})
      ))
      .then(data => {
        if(data.status_code == 200){
            window.location.reload();
            console.log(data.body.data);
        }
        else{
            alert(data.body.message);
        }
     })
     .catch(err => {
         console.warn(`Fetch Error: ${err}`);
       });
    }


window.onload( populateProfile(), getAllIncidents());
