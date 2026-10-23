// ================== SUPABASE CONFIGIRATION ==================
const SUPABASE_URL = "https://wjvhjslqtfvxiihydhat.supabase.co";
const SUPABASE_KEY = "sb_publishable_EmxUw0SKTUzt1rBMPtZ2YA_41dJGF7X";

// ================== CREATE SUPABASE CLIENT ==================
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ================== VARIABLE DECLERATIONS ==================
let nameInput = document.querySelector("#name");
let emailInput = document.querySelector("#email");
let passwordInput = document.querySelector("#password");
let form = document.querySelector(".signup-form");
let createBtn = document.querySelector("#create-btn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  createBtn.disabled = true;
  createBtn.innerHTML = "Creating Your Account...";

  await createUser();

  createBtn.disabled = false;
  createBtn.innerHTML = "Create Account";
});

const createUser = async () => {
  let name = nameInput.value;
  let email = emailInput.value;
  let password = passwordInput.value;

  if (!name || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  const { data, error } = await supabaseClient.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        name: name,
      },
    },
  });

  if (error) {
    console.log("Error: ", error);
  } else {
    window.location.href = "../reportPage/report.html"
  }
};
