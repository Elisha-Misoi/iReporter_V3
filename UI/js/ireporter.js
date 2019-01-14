
window.onload = function(){
/*display card content*/
            var classname = document.getElementsByClassName("post-card");
            var myFunction = function() {
            var title = event.currentTarget.querySelector('.title').innerHTML;
            var details = event.currentTarget.querySelector('.description').innerHTML;
            document.getElementById("complaint-details").innerHTML = details;
            document.getElementById("complaint-title").innerHTML = title;
        
        };
        for(i=0;i<classname.length;i++){
        classname[i].addEventListener('click', myFunction, false);
        }
    /*display card content*/

/*filter flags/interventions*/
        //show flags
        document.getElementById("flags").onclick = function filter(){
        var interventions = document.querySelectorAll('.intervention');
        var flags = document.querySelectorAll('.flag');

        for(i=0; i< interventions.length;i++){
            interventions[i].style.display = 'none';

        }
        for(i=0; i< flags.length;i++){
            flags[i].style.display = '';

        }
            
        }
        //show interventions
document.getElementById("interventions").onclick = function filter(){
        var interventions = document.querySelectorAll('.intervention');
        var flags = document.querySelectorAll('.flag');

        for(i=0; i< interventions.length;i++){
            interventions[i].style.display = '';

        }
        for(i=0; i< flags.length;i++){
            flags[i].style.display = 'none';

        }
        }

/*filter flags/interventions*/
        }


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



