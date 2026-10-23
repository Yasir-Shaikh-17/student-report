// ================== SUPABASE CONFIGIRATION ==================
const SUPABASE_URL = "https://wjvhjslqtfvxiihydhat.supabase.co";
const SUPABASE_KEY = "sb_publishable_EmxUw0SKTUzt1rBMPtZ2YA_41dJGF7X";

// ================== CREATE SUPABASE CLIENT ==================
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ================== VARIABLE DECLERATIONS ==================
let emailInput = document.querySelector("#email");
let passwordInput = document.querySelector("#password");
let form = document.querySelector(".login-form");
let createBtn = document.querySelector("#login-btn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  createBtn.disabled = true;
  createBtn.innerHTML = "Creating Your Account...";

  await logoutUser();

  createBtn.disabled = false;
  createBtn.innerHTML = "Create Account";
});

const logoutUser = async () => {
  let email = emailInput.value;
  let password = passwordInput.value;

  if (!email || !password) {
    alert("Please fill all fields");
    return;
  }

  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    console.log("Error: ", error);
  } else {
    window.location.href = "../reportPage/report.html"
  }
};