// Wrap your code in a function
function initializeForm() {
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');

    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Check if required fields are filled
        if (!email || !message) {
            // Display error messages for empty fields
            
            if (!email) {
                emailError.style.display = 'block';
            } else {
                emailError.style.display = 'none';
            }

            if (!message) {
                messageError.style.display = 'block';
            } else {
                messageError.style.display = 'none';
            }

            return; // Exit function
        }

        // Send email using SMTPJS
        Email.send({
            SecureToken: "c4d80974-dc81-43f4-ac4e-afffa7df9e38", // Replace with your SMTPJS secure token
            To: 'suyash.salvi1998@gmail.com', 
            From: 'suyash.salvi1998@gmail.com',
            Subject: 'Contact Form Submission',
            Body: `Name: ${name}<br>Email: ${email}<br>Message: ${message}`
        }).then(
            // Handle success
            message => {
                // Create a styled alert
                const alertDiv = document.createElement('div');
                alertDiv.textContent = 'Email sent successfully';
                alertDiv.style.backgroundColor = 'var(--primary)'; // Set background color
                alertDiv.style.color = 'var(--bg)'; // Set text color
                alertDiv.style.padding = '10px'; // Set padding
                alertDiv.style.borderRadius = '5px'; // Set border radius
                alertDiv.style.marginTop = '20px'; // Set margin top

                // Append alert to the form
                document.getElementById('contact-form').appendChild(alertDiv);

                document.getElementById('name').value = '';
                document.getElementById('email').value = '';
                document.getElementById('message').value = '';
                messageError.style.display = 'none';
                emailError.style.display = 'none';

                // Clear form fields after a delay
                setTimeout(() => {
                    
                    // Remove the alert after clearing form fields
                    alertDiv.remove();
                }, 5000); // Delay in milliseconds
            },
            // Handle error
            error => {
                const alertDiv = document.createElement('div');
                alertDiv.textContent = 'Failed to send email: ' + error;
                alertDiv.style.backgroundColor = 'var(--red)'; // Set background color
                alertDiv.style.color = 'var(--bg)'; // Set text color
                alertDiv.style.padding = '10px'; // Set padding
                alertDiv.style.borderRadius = '5px'; // Set border radius
                alertDiv.style.marginTop = '20px'; // Set margin top

                // Append alert to the form
                document.getElementById('contact-form').appendChild(alertDiv);
            }
        );
    });
}



// Call the function after DOMContentLoaded event fires
document.addEventListener('DOMContentLoaded', initializeForm);
