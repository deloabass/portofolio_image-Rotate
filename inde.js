// taggle icon navabar
let menuIcon = document.getElementById("menu-icon");
let navbar = document.querySelector(".navbar");

// Ajoutez un gestionnaire d'événements pour le clic sur l'icône du menu
menuIcon.onclick = (e) => {
  // Vérifiez si l'icône a déjà la classe 'bx-menu' (ce qui signifie qu'elle est actuellement dans l'état de menu)
  if (menuIcon.classList.contains("bx-menu")) {
    // Si oui, retirez la classe 'bx-menu' et ajoutez la classe 'bx-x' pour changer l'icône en une icône de fermeture
    menuIcon.classList.remove("bx-menu");
    menuIcon.classList.add("bx-x");
    navbar.style.display = "block";

    // Ajoutez une classe pour l'animation (par exemple, fade-in)
    navbar.classList.add("fade-in");

    // Supprimez la classe d'animation après un court délai
    setTimeout(() => {
      navbar.classList.remove("fade-in");
    }, 300); // ajustez la durée de l'animation ici (en millisecondes)
  } else {
    // Sinon, retirez la classe 'bx-x' et ajoutez la classe 'bx-menu' pour revenir à l'icône de menu
    menuIcon.classList.remove("bx-x");
    menuIcon.classList.add("bx-menu");

    // Ajoutez une classe pour l'animation (par exemple, fade-out)
    navbar.classList.add("fade-out");

    // Cachez le navbar après la fin de l'animation
    setTimeout(() => {
      navbar.style.display = "none";
      navbar.classList.remove("fade-out");
    }, 300); // ajustez la durée de l'animation ici (en millisecondes)
  }

  // Modifiez le style du curseur pour indiquer que l'icône est cliquable
  menuIcon.style.cursor = "pointer";
};

let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");
window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");
    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });
  // 11111navbar=====
  let header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 100);
};
// scrool removeAllListeners
ScrollReveal({
  //reset: true,
  distance: "80px",
  duration: "2000",
  delay: "200",
});
ScrollReveal().reveal(".home-content, .heading", { origin: "top" });
ScrollReveal().reveal(
  ".home-img, .services-container, .portfolio-box, .contact form",
  { origin: "bottom" }
);

ScrollReveal().reveal(".home-content h1, .about-img", { origin: "left" });
ScrollReveal().reveal(".home-content p, .about-content", { origin: "right" });

const form = document.getElementById("contactForm");

async function handleSubmit(event) {
  event.preventDefault();
  const fullName = document.getElementById("fullName").value;
  const emailAdress = document.getElementById("emailAdress").value;
  const number = document.getElementById("number").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  let data = `Full Name: ${fullName} <br> Email: ${emailAdress} <br> Phone Number: ${number} <br> Message: ${message}`;

  console.log({ data, target: event.target });
  fetch("https://formspree.io/f/xqkrrdyg", {
    method: "POST",
    body: JSON.stringify({ fullName, emailAdress, number, subject, message }),
    headers: {
      Accept: "application/json",
    },
  })
    .then(async (response) => {
      if (response.ok) {
        Swal.fire({
          title: "Success!",
          text: "Message send successfully!",
          icon: "success",
        });
      } else {
        console.log(await response.json());
        alert("Failed to send mail: " + error);
     
      }
    })
    .catch((error) => {
      status.innerHTML = "Oops! There was a problem submitting your form";
    });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (
    !fullName.classList.contains("error") &&
    !emailAdress.classList.contains("error") &&
    !number.classList.contains("error") &&
    !message.classList.contains("error") &&
    !subject.classList.contains("error")) {
    handleSubmit(event);
    form.reset();
    return false;
  }
  checkInput();
});


function checkEmail() {
  // Définir le modèle regex pour une adresse email valide
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const errorTxtEmail = document.querySelector(".error-txt.email");
  if (!emailAdress.match(emailRegex)) {
    emailAdress.classList.add("error");
    emailAdress.parentElement.classList.add("error");
    if (emailAdress.value != "") {
      errorTxtEmail.innerHTML = "Entrez une adresse mail valide!";
    } else {
      errorTxtEmail.innerHTML = "L'adresse e-mail ne peut pas être vide!";
    }
  } else {
    emailAdress.classList.remove("error");
    emailAdress.parentElement.classList.remove("error");
  }
}

function checkInput() {
  const items = document.querySelectorAll(".items");
  for (const item of items) {
    if (item.value === "") {
      item.classList.add("error");
      item.parentElement.classList.add("error");
    }
    if (items[1].value != "") {
      checkEmail();
    }
    items[1].addEventListener("keyup", () => {
      checkEmail();
    });
    item.addEventListener("keyup", () => {
      if (item.value != "") {
        item.classList.remove("error");
        item.parentElement.classList.remove("error");
      } else {
        item.classList.add("error");
        item.parentElement.classList.add("error");
      }
    });
  }
}
window.addEventListener('load', () => {
  const loader = document.querySelector('.loader');
  const noConnection = document.querySelector('.no-connection');

  function checkConnection() {
    if (!navigator.onLine) {
      // Si pas de connexion, affiche l'image de remplacement et cache le loader
      localStorage.setItem('onlineStatus', 'offline');
      displayNoConnectionImage();
    } else {
      // Si connexion, cache l'image de remplacement et affiche le loader
      localStorage.setItem('onlineStatus', 'online');
      displayLoader();
    }
  }

  function displayLoader() {
    loader.style.display = 'flex';
    noConnection.style.display = 'none';

    // Affiche le loader pendant une minute avant de le cacher
    setTimeout(() => {
      hideLoader();
    }, 900); // 60000 millisecondes = 60 secondes = 1 minute
  }

  function hideLoader() {
    loader.classList.add('loader-hidden');

    // Supprime le loader du DOM après la fin de la transition
    loader.addEventListener('transitionend', () => {
      if (loader.parentElement) {
        loader.parentElement.removeChild(loader);
      }
    });
  }

  function displayNoConnectionImage() {
    loader.style.display = 'none';
    noConnection.style.display = 'flex';
    body.style.display = "none"
  }

  // Vérifie l'état de connexion au chargement de la page
  checkConnection();

  // Vérifie l'état de connexion lors d'un changement de statut réseau
  window.addEventListener('online', () => {
    localStorage.setItem('onlineStatus', 'online');
    // hideLoader();
  });

  window.addEventListener('offline', () => {
    localStorage.setItem('onlineStatus', 'offline');
    displayNoConnectionImage();
  });
});



