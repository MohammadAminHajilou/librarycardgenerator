const photoInput = document.getElementById("photo");
const photoText = document.getElementById("photoText");

photoInput.addEventListener("change", () => {
  const file = photoInput.files[0];
  if (!file) return;
  photoText.textContent = `+ Change Photo (${file.name})`;
});

document.getElementById("libraryForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const birthDate = document.getElementById("birthDate").value;
  const nationalId = document.getElementById("nationalId").value.trim();
  const gender = document.getElementById("gender").value;
  const degree = document.getElementById("degree").value;
  const nationality = document.getElementById("nationality").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const photo = photoInput.files[0];
  const error = document.getElementById("error");


  if (!firstName || !lastName || !birthDate || !gender || !degree || !nationality) {
    error.textContent = "Please fill in all required fields.";
    return;
  }

  if (!/^\d{10}$/.test(nationalId)) {
    error.textContent = "National ID must be exactly 10 digits.";
    return;
  }

  if (!/^\+?\d{6,15}$/.test(phone)) {
    error.textContent = "Phone number format is invalid.";
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    error.textContent = "Email address is invalid.";
    return;
  }

  if (!photo) {
    error.textContent = "Please upload a photo.";
    return;
  }


  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  if (today < new Date(birth.setFullYear(today.getFullYear()))) age--;

  const reader = new FileReader();
  reader.onload = () => {
    localStorage.setItem("libraryData", JSON.stringify({
      firstName,
      lastName,
      birthDate,
      age,
      gender,
      degree,
      nationality,
      nationalId,
      phone,
      email,
      photo: reader.result,
      issueDate: today.toLocaleDateString()
    }));

    window.location.href = "result.html";
  };
  reader.readAsDataURL(photo);
});



