// Initialize Firebase (ADD YOUR OWN DATA)
var config = {
  apiKey: "AIzaSyBAXU9njta2HQmEJkwVU6Ut36IvZOrm8Fs",
  authDomain: "fir-crud-a5c1a.firebaseapp.com",
  databaseURL: "https://fir-crud-a5c1a.firebaseio.com",
  projectId: "fir-crud-a5c1a",
  storageBucket: "fir-crud-a5c1a.appspot.com",
  messagingSenderId: "828366756442"
};

firebase.initializeApp(config);

// Reference messages collection
var messagesRef = firebase.database().ref('messages');

// Listen for form submit
document.getElementById('submit').addEventListener('click', submitForm);
document.getElementById('load').addEventListener('click', loadForm);

// Load form
function loadForm(e) {
  e.preventDefault();
  firebase.database().ref('messages').on('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      console.log(childSnapshot.val());
    });
  });
}
// Submit form
function submitForm(e) {
  e.preventDefault();

  // Get values
  var name = getInputVal('name');
  var company = getInputVal('company');
  var email = getInputVal('email');
  var phone = getInputVal('phone');
  var message = getInputVal('message');

  // Save message
  saveMessage(name, company, email, phone, message);

  // Show alert
  document.querySelector('.alert').style.display = 'block';

  // Hide alert after 3 seconds
  setTimeout(function () {
    document.querySelector('.alert').style.display = 'none';
  }, 3000);

  // Clear form
  document.getElementById('contactForm').reset();
}

// Function to get get form values
function getInputVal(id) {
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, company, email, phone, message) {
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    name: name,
    company: company,
    email: email,
    phone: phone,
    message: message
  });
}
