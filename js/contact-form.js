$(document).ready(function () {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validateName() {
    const name = $("#name").val().trim();
    if (name === "") {
      showError("name", "Name is required");
      return false;
    } else if (name.length < 3) {
      showError("name", "Minimum of 3 characters required");
      return false;
    }
    showSuccess("name");
    return true;
  }

  function validateEmail() {
    const email = $("#email").val().trim();
    if (email === "") {
      showError("email", "Email is required");
      return false;
    } else if (!emailPattern.test(email)) {
      showError("email", "Invalid email format");
      return false;
    }
    showSuccess("email");
    return true;
  }

  function validateSubject() {
    const subject = $("#subject").val().trim();
    if (subject === "") {
      showError("subject", "Subject is required");
      return false;
    } else if (subject.length < 5) {
      showError("subject", "Minimum of 5 characters required");
      return false;
    }
    showSuccess("subject");
    return true;
  }

  function validateMessage() {
    const message = $("#message").val().trim();
    if (message === "") {
      showError("message", "Message is required");
      return false;
    } else if (message.length < 8) {
      showError("message", "Minimum of 8 characters required");
      return false;
    }
    showSuccess("message");
    return true;
  }

  function showError(field, message) {
    $(`#${field}-error`).text(message);
    $(`#${field}`).addClass("invalid").removeClass("valid");
  }

  function showSuccess(field) {
    $(`#${field}-error`).text("");
    $(`#${field}`).addClass("valid").removeClass("invalid");
  }

  // Validation on blur
  $("#name").blur(validateName);
  $("#email").blur(validateEmail);
  $("#subject").blur(validateSubject);
  $("#message").blur(validateMessage);

  // Submit button handler
  $("#submit-btn").click(function (e) {
    e.preventDefault();
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isSubjectValid = validateSubject();
    const isMessageValid = validateMessage();
    if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
      sendMail();
    } else {
      $("#error-message").text("Please fill out all fields correctly.");
    }
  });

  function sendMail() {
    const params = {
      name: $("#name").val().trim(),
      email: $("#email").val().trim(),
      subject: $("#subject").val().trim(),
      message: $("#message").val().trim(),
    };

    const SERVICE_ID = "service_77v89pc";
    const TEMPLATE_ID = "template_vrskcjq";

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, params)
      .then((res) => {
        if (res.status === 200) {
          $("#contact-form")[0].reset();
          $(".form-control").removeClass("valid invalid");
          $(".error-msg").text("");
          Toastify({
            text: "Your Email Sent Successfully",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            style: {
              background: "linear-gradient(to right, #ffbd39, #1a1a1a)",
              color: "#fff",
            },
          }).showToast();
        }
      })
      .catch(() => {
        Toastify({
          text: "Something went wrong! Email not sent.",
          duration: 4000,
          close: true,
          gravity: "top",
          position: "right",
          style: {
            background: "linear-gradient(to right, #ff4e50, #2c2c2c)",
          },
        }).showToast();
      });
  }
});
