// ================== SUPABASE CONFIGIRATION ==================
const SUPABASE_URL = "https://wjvhjslqtfvxiihydhat.supabase.co";
const SUPABASE_KEY = "sb_publishable_EmxUw0SKTUzt1rBMPtZ2YA_41dJGF7X";

// ================== CREATE SUPABASE CLIENT ==================
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ================== VARIABLE DECLERATION ==================
const form = document.querySelector("#report-form");
let title = document.querySelector("#title");
let category = document.querySelector("#category");
let description = document.querySelector("#description");
let submitBtn = document.querySelector(".submit-btn")
let loading = false;

// ================= CHECK IF THE USER IS LOGGEDIN OR NOT =================
const checkUser = async()=>{

  const {data} = await supabaseClient.auth.getUser()
  if(!data.user){
    window.location.href = "../login/login.html"
  }

}
checkUser();

// ================== FORM SUBMITTION ==================
form.addEventListener("submit", async(e) => {
  e.preventDefault();

  submitBtn.disabled = true;
  submitBtn.innerHTML = "Submitting Your Report...";

  await submitReport();

  submitBtn.disabled = false;
  submitBtn.innerHTML = "Submit Report";

});

// ================== SUBMIT REPORT FUNCTION ==================
const submitReport = async () => {
  let titleValue = title.value;
  let categoryValue = category.value;
  let descriptionValue = description.value;

  if (!titleValue || !categoryValue || !descriptionValue) {
    alert("Please fill all fields");
    return;
  }

  const { data, error } = await supabaseClient.from("issues").insert({
    title: titleValue,
    category: categoryValue,
    description: descriptionValue,
  });

  if (error) {
    console.log("Error: ", error);
  } else {
    form.reset()
    window.location.href = "../homePage/home.html"
  }
};