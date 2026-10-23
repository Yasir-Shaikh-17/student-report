// ================== SUPABASE CONFIGIRATION ==================
const SUPABASE_URL = "https://wjvhjslqtfvxiihydhat.supabase.co";
const SUPABASE_KEY = "sb_publishable_EmxUw0SKTUzt1rBMPtZ2YA_41dJGF7X";

// ================== CREATE SUPABASE CLIENT ==================
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ================== VARIABLE DECLERATIONS ==================
const profileName = document.querySelector("#profile-name");
const logoutBtn = document.querySelector("#logout-btn");
const username = document.querySelector("#user-name")

// ================= CHECK IF THE USER IS LOGGEDIN OR NOT =================
const checkUser = async () => {
  const { data } = await supabaseClient.auth.getUser();
  if (!data.user) {
    window.location.href = "../login/login.html";
  }

  let name = data.user.user_metadata.name
  username.innerHTML = `Hello, ${name} <span>👋</span>`;
};
checkUser();

const getData = async () => {
  const { data, error } = await supabaseClient.from("issues").select("*");
  console.log(data);
};
getData();

const logoutUser = async () => {
  const { error } = await supabaseClient.auth.signOut();
  if (error) {
    alert(error.message);
    return;
  }
  window.location.href = "../login/login.html";
};

logoutBtn.addEventListener("click", () => {
  logoutUser();
});
