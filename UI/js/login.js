const baseUrl = 'http://127.0.0.1:5000/';

const signinUrl = `${baseUrl}api/v2/auth/login`;




// Login
const logIn = document.getElementById('btn').addEventListener('click', async(event) => {
    event.preventDefault();
    password = document.getElementById("password").value
    email = document.getElementById("email").value

    formData = {
        password: password,
        email: email
    }
    fetch(signinUrl, {
      method: 'POST',
      headers: {"Content-type":"application/json" ,
                "Accept":"application/json",
                "Access-Control-Allow-Origin": "*",},
      body: JSON.stringify(
            formData)
    })
    .then(response => response.json().then(res => ({status_code: response.status, body:res})
    ))
    .then(data => {
       if(data.status_code == 200){
        window.localStorage.setItem('user_token', data.body.token);
        window.localStorage.setItem('user', JSON.stringify(data.body.user));

        window.location = 'home.html';
       }
       else{
           alert(data.body.message);
       }
    })
    .catch(err => {
        console.warn(`Fetch Error: ${err}`);
      });
});
