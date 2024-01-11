//Function to handle the subscription process
function subscribe() {
    let email = document.getElementById('email');
    let termsCheckbox = document.getElementById('terms-and-conditions');

    //Validate email and terms and conditions
    if (email.value.trim() === '' || !termsCheckbox.checked) {
        alert('Please fill in the email and accept the terms.');
        return false;
    }

    let storedEmails = JSON.parse(localStorage.getItem('subscribedEmails')) || [];
    if (storedEmails.includes(email.value)) {
        //Display an error message or take appropriate action
        alert('This email is already subscribed.');
        return false; //Prevent form submission
    }
    //Add the new email to the subscribed list in localStorage
    storedEmails.push(email.value);
    localStorage.setItem('subscribedEmails', JSON.stringify(storedEmails));
    //Display a success message
    alert('Subscription successful! Thank you for subscribing.');
    return true; //to refresh
}

//Function to handle the unsubscription process
function unsubscribe() {

    let email = document.getElementById('email');
    let termsCheckbox = document.getElementById('terms-and-conditions');

    //Retrieve subscribed emails from localStorage or return empty array
    let storedEmails = JSON.parse(localStorage.getItem('subscribedEmails')) || [];

    if (email.value.trim() === '' || !termsCheckbox.checked) {
        alert('Please fill in the email and accept the terms.');
        return false;
    }
    //eCheck if the email is in the subscribed list
    let index = storedEmails.indexOf(email.value);
    if (index !== -1) {
        //eRemove the email from the subscribed list in localStorage
        storedEmails.splice(index, 1);
        localStorage.setItem('subscribedEmails', JSON.stringify(storedEmails));

        //Display a success message for unsubscription
        alert('Unsubscription successful for ' + email.value);
        return true;
    } else {
        //Display a message if the email is not found in the subscribed list
        alert('Email not found. No changes were made.');
    }

}