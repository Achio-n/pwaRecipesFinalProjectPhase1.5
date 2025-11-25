import { auth } from "./firebaseConfig.js"
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { loadTasks, syncTasks } from "./ui.js";
export let currentUser = null;

document.addEventListener("DOMContentLoaded", ()=>{
    const logoutBtnDesktop = document.getElementById("log-out-btn-desktop")
    const logoutBtnMobile = document.getElementById("log-out-btn-mobile")
    onAuthStateChanged(auth, (user)=>{
        if(user){
            currentUser = user;
            console.log("UserId: ", user.uid);
            console.log("Email: ", user.email);
            logoutBtnDesktop.style.display = "";
            logoutBtnMobile.style.display = "";
            loadTasks();
            syncTasks();
        } else{
            console.log("no user is currently logged in");
            window.location.href = "/pages/auth.html";
        }


    });
    
    logoutBtnDesktop.addEventListener("click", async ()=>{
        try{
            await signOut(auth);
            M.toast({html: "Logout successful!"});
            logoutBtnDesktop.style.display = "none";
            //SignInBtn.style.display = "block"; //if there is a problem, come back to this
            window.location.href = "/pages/auth.html"

            } catch(e){
                M.toast({html: e.message})
            }
    });
    logoutBtnMobile.addEventListener("click", async ()=>{
        try{
            await signOut(auth);
            M.toast({html: "Logout successful!"});
            logoutBtnMobile.style.display = "none";
            //SignInBtn.style.display = "block"; //if there is a problem, come back to this
            window.location.href = "/pages/auth.html"

            } catch(e){
                M.toast({html: e.message})
            }
    });
});
// export { currentUser };


