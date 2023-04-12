const ZAPIER_URL = 'https://hooks.zapier.com/hooks/catch/15023079/32nu14p/';

const formElement = document.getElementById('join-form');
const submitButtonElement = formElement.querySelector('button[type="submit"]');
const confirmationElement = formElement.querySelector('.confirmation');

//------------------------------------------------------------------------------
// Form Validation
//------------------------------------------------------------------------------

const validateForm = () => {
    const formData = new FormData(formElement);
    const data = Object.fromEntries(formData.entries());

    let isValid = true;
    for (const value of formData.values()) {
        if (value === '') {
            isValid = false;
            break;
        }
    }

    submitButtonElement.disabled = !isValid;
};

const inputElements = formElement.querySelectorAll('input');
inputElements.forEach((element) => {
    element.addEventListener('change', () => {
        validateForm();
    });
});

validateForm();

//------------------------------------------------------------------------------
// Form Submission
//------------------------------------------------------------------------------

const setLoading = (isLoading) => {
    if (isLoading) {
        submitButtonElement.classList.add('form__submit-button--loading');
        submitButtonElement.disabled = true;
    } else {
        submitButtonElement.classList.remove('form__submit-button--loading');
        submitButtonElement.disabled = false;
    }
};

const showConfirmation = () => {
    confirmationElement.classList.remove('confirmation--hidden');
};

formElement.addEventListener('submit', async (event) => {
    event.preventDefault();

    setLoading(true);

    const formData = new FormData(formElement);
    const data = Object.fromEntries(formData.entries());

    const params = new URLSearchParams(data);
    const response = await fetch(ZAPIER_URL + '?' + params);
    // TODO

    setLoading(false);
    showConfirmation();
});
