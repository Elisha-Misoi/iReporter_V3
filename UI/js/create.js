
const changeTypeIntervention = () => {
    document.getElementById('dropbtn').innerHTML= "intervention";

}

const changeTypeRedflag = () => {
    document.getElementById('dropbtn').innerHTML= "red-flag";
}


const loadIndexPage = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if(user === null){
        window.location = 'signup.html';
    }
    else if(user.isAdmin === true){
        document.getElementById('admin_button').style.display = 'inline';
        document.getElementById('profile_button').style.display = 'none';
    }
    else{
        document.getElementById('profile_button').style.display = 'inline';
        document.getElementById('admin_button').style.display = 'none';
    }
}

const logout = document.getElementById('logoutBtn').addEventListener('click', async(event) => {
    window.localStorage.setItem('user', null);
    window.localStorage.removeItem('user_token', null);
})

window.onload(loadIndexPage());