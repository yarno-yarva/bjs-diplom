"use strict";

const userForm  = new UserForm();


userForm.loginFormCallback = data => uLogin(data);

function uLogin (data) {
	ApiConnector.login(data, response => lVerify(response));
    
    function lVerify (response) {
    	if (response.success === false) {
    		userForm.setLoginErrorMessage(response.error);
    		//return alert(response.error);
    	} else {
    		location.reload();
    	}
    }
}



userForm.registerFormCallback = data => ApiConnector.register(data, response => {
    if (response.success) {
       location.reload();
    } else {
       userForm.setRegisterErrorMessage(response.error);	
    }

});

