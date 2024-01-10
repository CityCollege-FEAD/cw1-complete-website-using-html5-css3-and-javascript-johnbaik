function subscribe() {
    let email = document.getElementById('email');
    let termsCheckbox = document.getElementById('terms-and-conditions');

    if (email.value.trim() === '' || !termsCheckbox.checked) {
        alert('Please fill in the email and accept the terms.');
        return false;
    }

    let storedEmails = JSON.parse(localStorage.getItem('subscribedEmails')) || [];
    if (storedEmails.includes(email.value)) {
        // Display an error message or take appropriate action
        alert('This email is already subscribed.');
        return false; // Prevent form submission
    }
    storedEmails.push(email.value);
    localStorage.setItem('subscribedEmails', JSON.stringify(storedEmails));
    alert('Subscription successful! Thank you for subscribing.');
    return true; // to refresh
}

function unsubscribe() {

    let email = document.getElementById('email');
    let termsCheckbox = document.getElementById('terms-and-conditions');
    let storedEmails = JSON.parse(localStorage.getItem('subscribedEmails')) || [];

    if (email.value.trim() === '' || !termsCheckbox.checked) {
        alert('Please fill in the email and accept the terms.');
        return false;
    }

    let index = storedEmails.indexOf(email.value);
    if (index !== -1) {
        storedEmails.splice(index, 1);
        localStorage.setItem('subscribedEmails', JSON.stringify(storedEmails));

        alert('Unsubscription successful for ' + email.value);
        return true;
    } else {
        alert('Email not found. No changes were made.');
    }

}