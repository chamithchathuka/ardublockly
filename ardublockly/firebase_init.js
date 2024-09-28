   $(document).ready(function(){
      // Initialize modal
      $('.modal-trigger').leanModal();
    });

    // Your Firebase configuration (replace this with your actual config)
    const firebaseConfig = {
        apiKey: "AIzaSyCAjY4VCo3IsrLubuZJq0YbwOYtNkR_atw",
        authDomain: "bot-iot-cc1a7.firebaseapp.com",
        projectId: "bot-iot-cc1a7",
        databaseURL:"https://bot-iot-cc1a7-default-rtdb.asia-southeast1.firebasedatabase.app",
        storageBucket: "bot-iot-cc1a7.appspot.com",
        messagingSenderId: "228308612037",
        appId: "1:228308612037:web:f826c17fa6b501524e91ac"
    };

    // Initialize Firebase
    const app = firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const database = firebase.database(app);

firebase.auth().onAuthStateChanged((user) => {
    console.log(user);
    if (user) {
        // User is signed in
        const userName = user.displayName;
        console.log(user.uid);
        // Hide login items
        $('#menu_login, #button_login').hide();
        $('#login_dialog').closeModal();

        // Show logout button with user name
        $('#button_logout').html(`<a href="#" id="button_logout"><span class="translatable_logout">Logout</span> (${userName})</a>`).show();

        // Add logout functionality
        $('#button_logout').off('click').on('click', function() {
            event.preventDefault(); // Prevent the default anchor behavior
            auth.signOut().then(() => {
                // Show login items again
                $('#menu_login, #button_login').show();
                $('#menu_logout').hide();
            }).catch((error) => {
                console.error('Error during logout: ', error);
            });
        });

        var starCountRef = firebase.database().ref('public_resource/' + user.uid);
        starCountRef.on('value', (snapshot) => {
          const data = snapshot.val();
            console.log(data);
            if(data != null)
                alert("last successful processing :"+new Date(data.timestamp).toLocaleString());
        });
    } else {
        // User is not signed in
        $('#menu_login, #button_login').show();
        $('#button_logout').hide();

    }
});



// Close modal functionality for elements inside the modal
$('#closeModalBtn').on('click', function() {
    $('#login_dialog').closeModal(); // Close the modal when close button is clicked
});

// Prevent the modal from opening again if clicked on the modal background
$('#login_dialog').on('click', function(event) {
    if ($(event.target).is('#login_dialog')) {
        $('#login_dialog').closeModal(); // Close the modal if the background is clicked
    }
});

    // Google Authentication
    document.getElementById('googleLoginBtn').addEventListener('click', function() {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider)
        .then((result) => {
          // Successfully authenticated
          console.log(result.user); // Handle the authenticated user data
        })
        .catch((error) => {
          // Handle Errors here.
          console.error(error);
          alert('Error during login: ' + error.message);
        });
    });





