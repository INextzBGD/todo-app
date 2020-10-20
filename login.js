
function showCardView() {

    const isSignup = window.location.href.indexOf('?signup') >= 0;

    if (isSignup)
        $('.card-signup').css('display', '');
    else
        $('.card-sigin').css('display', '');
}

function alertSigin(msg) {

    if (msg)
        $('.card-sigin .alert').css('display', '').html(msg);
    else
        $('.card-sigin .alert').css('display', 'none').html('');
}

function alertSignup(msg) {

    if (msg)
        $('.card-signup .alert').css('display', '').html(msg);
    else
        $('.card-signup .alert').css('display', 'none').html('');
}

function disabledInputs(containerElmenent, disabled) {

    if (disabled === undefined)
        disabled = true;

    $(containerElmenent).find('button,a').attr('disabled', disabled ? 'disabled' : null);
}

function fakeRequest(success, response) {

    return new Promise((res, rej) => {

        setTimeout(() => success ? res(response) : rej(response), 2000);
    });
}

// ==== handles ====

function handleSigin(e) {

    e.preventDefault();

    const form = $(e.currentTarget)[0];

    const siginData = {
        email: form.email.value,
        password: form.password.value
    };

    // [CODE HERE]

    const promise = login(siginData.email, siginData.password);

    disabledInputs(form, true);

    promise.then((response) => {

        if (response.status === 200) {

            localStorage.setItem('todo.app.token', response.content.token);
            window.location.assign('./index.html');

        }
        else {  
            alertSigin(response.content.message);
        }

        disabledInputs(form, false);
    });

    promise.catch(() => {

        alertSigin('Tente novamente!');
        disabledInputs(form, false);
    });

    // send request and check sigin

    // TEST ONLY
    // alertSigin(null);
    // disabledInputs(form, true);
    // const success = siginData.email === 'test@test.com' && siginData.password === 'test';
    // fakeRequest(success, success ? {} : 'Email or password invalid')
    //     .then(() => window.location.assign('/index.html'))
    //     .catch(error => alertSigin(error))
    //     .then(() => disabledInputs(form, false));
}

function handleSignup(e) {

    e.preventDefault();
    e.stopPropagation();

    const form = $(e.currentTarget)[0];

    const signupData = {
        email: form.email.value,
        password: form.password.value,
        confirmPassword: form.confirmPassword.value
    };

    // [CODE HERE]
    // send request and check signup

    const promise = createAccount(signupData.email, signupData.password);

    disabledInputs(form, true);

    promise.then((response) => {

        if (response.status === 200) {

            window.location.assign('./login.html');
        }
        else {
            alertSignup(response.content.message);
        }

        disabledInputs(form, false);
    });

    promise.catch(() => {

        alertSignup('Tente novamente!');
        disabledInputs(form, false);
    });

     // TEST ONLY
    //  alertSignup(null);
    //  disabledInputs(form, true);
    //  const success = signupData.email !== 'test@test.com';
    //  fakeRequest(success, success ? {} : 'Email exists')
    //      .then(() => window.location.assign('/index.html'))
    //      .catch(error => alertSignup(error))
    //      .then(() => disabledInputs(form, false));    
}

// ==== init ====

$(document).ready(() => {

    showCardView();    

    $('.card-sigin form').submit(handleSigin);
    $('.card-signup form').submit(handleSignup);
});



