// const { update } = require("../../models/user");

const updateUser = $("#settings-form");

const origName = $("#name").val().trim();
const origEmail = $("#email").val().trim();
const origPassword = $("#password").val().trim();

const updateUserInfo = async (updateData) => {
  try {
    const response = await fetch(`/users/settings`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });

    if (response.ok) {
      alert("Your information has been successfully updated!");
      document.location.replace("/home");
    } else {
      alert("Error. Failed to update user information.");
    }
  } catch (error) {
    console.error("Error updating user information:", error);
  }
};

updateUser.on("submit", async function (event) {
  event.preventDefault();

  const updateData = {
    name: $("#name").val().trim(),
    email: $("#email").val().trim(),
  };

  const password = $("#password").val().trim();
  if (password) updateData.password = password;

  if (
    updateData.name === origName &&
    updateData.email === origEmail &&
    !updateData.password
  ) {
    alert("Please make a change to update your account.");
    return;
  }

  updateUserInfo(updateData);
});

const deleteUser = $("#deleteUser");

deleteUser.on("click", async () => {
  const response = await fetch("/users/settings", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    alert("Your account has been deleted successfully.");
    document.location.replace("/users/signup");
  } else {
    alert("Delete account unsuccessful.  Please try again.");
  }
});
