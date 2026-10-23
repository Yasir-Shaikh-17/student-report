// ================== SUPABASE CONFIGIRATION ==================
const SUPABASE_URL = "https://wjvhjslqtfvxiihydhat.supabase.co";
const SUPABASE_KEY = "sb_publishable_EmxUw0SKTUzt1rBMPtZ2YA_41dJGF7X";

// ================== CREATE SUPABASE CLIENT ==================
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ================== VARIABLE DECLERATIONS ==================
const profileName = document.querySelector("#profile-name");
const logoutBtn = document.querySelector("#logout-btn");
const username = document.querySelector("#user-name");
let issuesContainer = document.querySelector("#issues-container");
let totalCard = document.querySelector(".total-card");
let pendingCard = document.querySelector(".pending-card");
let resolvedCard = document.querySelector(".resolved-card");
let totalCountHtml = document.querySelector("#total-count");
let pendingCountHtml = document.querySelector("#pending-count");
let resolvedCountHtml = document.querySelector("#resolved-count");

// ================= CHECK IF THE USER IS LOGGEDIN OR NOT =================
let isAdmin = null;
const checkUser = async () => {
  const { data } = await supabaseClient.auth.getUser();
  if (!data.user) {
    window.location.href = "../login/login.html";
  }

  const user = data.user;
  isAdmin = user.user_metadata.role === "admin";

  username.innerHTML = `Hello, ${user.user_metadata.name} 👋`;

  document.querySelectorAll(".admin-only").forEach((element) => {
    element.classList.toggle("visible", isAdmin);
  });

  let name = data.user.user_metadata.name;
  username.innerHTML = `Hello, ${name} <span>👋</span>`;
};
checkUser();

// ================== GET DATA FROM SUPABASE =======================
const getData = async () => {
  const { data, error } = await supabaseClient.from("issues").select("*");
  const { data: pendingCount } = await supabaseClient
    .from("issues")
    .select()
    .eq("status", "pending");
  const { data: resolvedCount } = await supabaseClient
    .from("issues")
    .select()
    .eq("status", "resolved");

  if (!error) {
    totalCountHtml.innerHTML = data.length;
    pendingCountHtml.innerHTML = pendingCount.length;
    resolvedCountHtml.innerHTML = resolvedCount.length;

    issuesContainer.innerHTML += data
      .map((e) => {
        const date = new Date(e.created_at).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });

        return `<div class="issue-row">
        <div class="cell title-column">
                <strong>${e.title}</strong>
                <span class="issue-description">
                  ${e.description}
                </span>
              </div>
              <div class="cell">${e.category}</div>
              <div class="cell">${e.reported_by}</div>
              <div class="cell">${date}</div>
              <div class="cell">
              <span class="status pending">${e.status}</span>
              </div>
              <div class="cell admin-only ${isAdmin ? "visible" : ""} action-buttons">
                ${
                  e.status.toLowerCase() !== "resolved"
                    ? `<button class="resolve-btn" data-issue-id="${e.id}" type="button">Resolve</button>`
                    : ""
                }
                   <button class="delete-btn" data-issue-id="${e.id}" type="button">Delete</button>
                   </div>
              </div>`;
      })
      .join("");
  }
};
getData();

// ================== LOGOUT USER HANDLER ==========================
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

// ================== GET ALL ISUES ==============
totalCard.addEventListener("click", async () => {
  const { data, error } = await supabaseClient.from("issues").select("*");
  console.log(data);

  issuesContainer.innerHTML = "";

  if (!error) {
    issuesContainer.innerHTML += data
      .map((e) => {
        const date = new Date(e.created_at).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });

        return `<div class="issue-row">
        <div class="cell title-column">
                <strong>${e.title}</strong>
                <span class="issue-description">
                  ${e.description}
                </span>
              </div>
              <div class="cell">${e.category}</div>
              <div class="cell">${e.reported_by}</div>
              <div class="cell">${date}</div>
              <div class="cell">
              <span class="status pending">${e.status}</span>
              </div>
              <div class="cell admin-only ${isAdmin ? "visible" : ""} action-buttons">
                ${
                  e.status.toLowerCase() !== "resolved"
                    ? `<button class="resolve-btn" data-issue-id="${e.id}" type="button">Resolve</button>`
                    : ""
                }
                   <button class="delete-btn" data-issue-id="${e.id}" type="button">Delete</button>
                   </div>
              </div>`;
      })
      .join("");
  }

  const btn = document.querySelectorAll("#delete-btn")
  btn.forEach((e)=>{
    e.addEventListener("click", ()=>{
      console.log("delete")
    })
  })
});

// ================== GET ALL PENDING ISUES ==============
pendingCard.addEventListener("click", async () => {
  const { data, error } = await supabaseClient
    .from("issues")
    .select()
    .eq("status", "pending");
  console.log(data);

  issuesContainer.innerHTML = "";

  if (!error) {
    issuesContainer.innerHTML += data
      .map((e) => {
        const date = new Date(e.created_at).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });

        return `<div class="issue-row">
        <div class="cell title-column">
                <strong>${e.title}</strong>
                <span class="issue-description">
                  ${e.description}
                </span>
              </div>
              <div class="cell">${e.category}</div>
              <div class="cell">${e.reported_by}</div>
              <div class="cell">${date}</div>
              <div class="cell">
              <span class="status pending">${e.status}</span>
              </div>
              <div class="cell admin-only ${isAdmin ? "visible" : ""} action-buttons">
                ${
                  e.status.toLowerCase() !== "resolved"
                    ? `<button class="resolve-btn" data-issue-id="${e.id}" type="button">Resolve</button>`
                    : ""
                }
                   <button class="delete-btn" data-issue-id="${e.id}" type="button">Delete</button>
                   </div>
              </div>`;
      })
      .join("");
  }
});

// ================== GET ALL RESOLVED ISUES ==============
resolvedCard.addEventListener("click", async () => {
  const { data, error } = await supabaseClient
    .from("issues")
    .select()
    .eq("status", "resolved");
  console.log(data);

  issuesContainer.innerHTML = "";

  if (!error) {
    issuesContainer.innerHTML += data
      .map((e) => {
        const date = new Date(e.created_at).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });

        return `<div class="issue-row">
        <div class="cell title-column">
                <strong>${e.title}</strong>
                <span class="issue-description">
                  ${e.description}
                </span>
              </div>
              <div class="cell">${e.category}</div>
              <div class="cell">${e.reported_by}</div>
              <div class="cell">${date}</div>
              <div class="cell">
              <span class="status pending">${e.status}</span>
              </div>
              <div class="cell admin-only ${isAdmin ? "visible" : ""} action-buttons">
                ${
                  e.status.toLowerCase() !== "resolved"
                    ? `<button class="resolve-btn" data-issue-id="${e.id}" type="button">Resolve</button>`
                    : ""
                }
                   <button class="delete-btn" data-issue-id="${e.id}" type="button">Delete</button>
                   </div>
              </div>`;
      })
      .join("");
  }
});
