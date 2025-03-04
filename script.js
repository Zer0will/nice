document.addEventListener("DOMContentLoaded", function () {
    fetch("header.html")
        .then(response => response.text())
        .then(data => document.getElementById("header").innerHTML = data);

    fetch("footer.html")
        .then(response => response.text())
        .then(data => document.getElementById("footer").innerHTML = data);
});


//Sroll moveTop Click
const moveTopButton = document.getElementById("movetop");

// Show/hide button on scroll
window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {  // Show after 300px scroll
        moveTopButton.style.display = "block";
    } else {
        moveTopButton.style.display = "none";
    }
});

// Scroll to top on click
moveTopButton.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"  // Smooth scroll effect
    });
});



// <!-- ?YES OR NO HANDLE -->

document.addEventListener("DOMContentLoaded", function () {
    const radioButtons = document.querySelectorAll('input[name="option"]');
    const firstTextarea = document.querySelector(".first-textarea");

    function updateTextareaVisibility() {
        const selectedValue = document.querySelector(
            'input[name="option"]:checked'
        ).value;

        if (selectedValue === "yes") {
            firstTextarea.style.display = "block"; // Show first textarea
        } else {
            firstTextarea.style.display = "none"; // Hide first textarea
        }
    }

    // Run function on page load (since "Yes" is default)
    updateTextareaVisibility();

    // Add event listener to radio buttons
    radioButtons.forEach((radio) => {
        radio.addEventListener("change", updateTextareaVisibility);
    });
});

// NEXT FORM

function validateAndShowNextForm(currentFormId, nextFormId) {
    let allFilled = true;

    document
        .querySelectorAll(`#${currentFormId} .required-field`)
        .forEach((field) => {
            if (!field.value.trim()) {
                allFilled = false;
            }
        });

    if (allFilled) {
        document.getElementById(currentFormId).style.display = "none";
        document.getElementById(nextFormId).style.display = "block";
    } else {
        alert("Please fill all required fields");
    }
}

document.getElementById("next1").addEventListener("click", function () {
    validateAndShowNextForm("form1", "form2");
});

document.getElementById("next2").addEventListener("click", function () {
    validateAndShowNextForm("form2", "form3");
});



// ?THAMKS 
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".lestemploy").addEventListener("click", function () {
        let resumeField = document.getElementById("fileUpload");

        if (resumeField.files.length > 0) {
            // Form 3 hide karein
            document.getElementById("form3").style.display = "none";
            // Modal show karein
            document.getElementById("successModal").style.display = "flex";
            setTimeout(() => {
                window.location.reload();
            }, 3000); // 2 seconds ka delay
        } else {
            alert("Please upload your resume.");
        }
    });

    // Close modal function
    document.getElementById("closeModal").addEventListener("click", function () {
        setTimeout(() => {
            window.location.reload();
        }, 0);
        // Index page par redirect karein
        window.location.href = "index.html";

    });
});


// ?Doc FIle Upload
document
    .getElementById("fileUpload")
    .addEventListener("change", function () {
        let fileName =
            this.files.length > 0
                ? this.files[0].name
                : "Accepted formats: PDF, DOCX";
        document.getElementById("fileName").textContent = fileName;
    });

// Date Selected


const select = document.getElementById("dateSelect");
const today = new Date();
const monthsBefore = 12;
const monthsAfter = 12;

for (let i = -monthsBefore; i <= monthsAfter; i++) {
    let date = new Date();
    date.setMonth(today.getMonth() + i);

    let formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    let option = document.createElement("option");
    option.value = date.toISOString().split("T")[0];
    option.textContent = formattedDate;

    select.appendChild(option);
}





