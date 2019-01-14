const baseUrl = 'https://ireporter-v2.herokuapp.com/api/v2';

const createRedlagUrl = `${baseUrl}/redflags`;

const createInterventionUrl = `${baseUrl}/interventions`;

const token = localStorage.getItem('user_token');


const createIncident = document.getElementById('submitBtn').addEventListener('click', async(event) => {
    event.preventDefault();
    let incident_type = document.getElementById('dropbtn').innerHTML

    formData = {
        location: document.getElementById('location').value,
        comment: document.getElementById('description').value,
        title: document.getElementById('subject').value,
        Videos: '',
        Images: ''
    }

    if(incident_type === 'red-flag'){
        postIncident(createRedlagUrl, formData);
    }
    else if(incident_type === 'intervention'){
        postIncident(createInterventionUrl, formData);
    }
    else{
        console.warn("not a valid incident type")
    }
});


const postIncident = (url, data) => {

    config = {
        method: 'POST',
        headers: {
            "Content-type":"application/json" ,
            "Accept":"application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": token,
        },
        body: JSON.stringify(data)
      }

      console.log('this',data);

    fetch(url, config)
      .then(response => response.json().then(res => ({status_code: response.status, body:res})
      ))
      .then(data => {
        if(data.status_code == 201){
            console.log(data.body.data);
            window.location = 'user_profile.html';
        }
        else{
            alert(data.body.message);
        }
     })
     .catch(err => {
         console.warn(`Fetch Error: ${err}`);
       });
    }




