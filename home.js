// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-analytics.js";
import { addDoc, collection } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAl9cxFl3u8xJYnlbSWuEe5P5VXfUk6JwU",
  authDomain: "deeploaf-bbaf8.firebaseapp.com",
  projectId: "deeploaf-bbaf8",
  storageBucket: "deeploaf-bbaf8.firebasestorage.app",
  messagingSenderId: "513964116759",
  appId: "1:513964116759:web:545a18174a445505268552",
  measurementId: "G-CDSE2G451E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Sélection du formulaire
const form = document.getElementById("customer-data");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Récupération des valeurs du formulaire
    const name = document.getElementById("nom-enseigne").value;
    const activite = document.getElementById("activite").value;
    const telephone = document.getElementById("telephone").value;
    const email = document.getElementById("email").value;
    const pays = document.getElementById("pays").value;
    const ville = document.getElementById("ville").value;

    console.log("Form values:", { name, activite, telephone, email, pays, ville });

    try {
      // Ajouter aux Firestore
      await addDoc(collection(db, "clients"), {
        name: name,
        activite: activite,
        telephone: telephone,
        email: email,
        pays: pays,
        ville: ville,
        createdAt: new Date()
      });

      showSuccessPopup("Données envoyées avec succès !");
      form.reset();
    } catch (error) {
      console.error("Erreur lors de l'enregistrement :", error);
    }
  });
} else {
  console.error("Form element not found");
}



function showSuccessPopup(message) {
  let popup = document.getElementById("success-popup");
  popup.textContent = message; // Met le texte du message
  popup.style.display = "block"; // Affiche le pop-up

  setTimeout(() => {
      popup.style.display = "none"; // Cache le pop-up après 3 secondes
  }, 3000);
}

// Exemple d'utilisation après l'envoi du formulaire :
document.getElementById("form").addEventListener("submit", function(event) {
  event.preventDefault(); // Empêche l'envoi par défaut (juste pour tester)

  // Logique pour envoyer les données ici...

  showSuccessPopup("Données envoyées avec succès !");
});
