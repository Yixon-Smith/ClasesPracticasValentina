/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!*******************************************************************************************!*\
  !*** ../../../themes/metronic/html/demo2/src/js/custom/authentication/sign-up/general.js ***!
  \*******************************************************************************************/


// Class definition
var KTSignupGeneral = function() {
    // Elements
    var form;
    var submitButton;
    var validator;
    var passwordMeter;

    // Handle form
    var handleForm  = function(e) {
        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        validator = FormValidation.formValidation(
			form,
			{
				fields: {
					'name': {
						validators: {
							notEmpty: {
								message: 'El campo nombre es requerido.'
							}
						}
                    },
					'email': {
                        validators: {
							notEmpty: {
								// message: lang.mail_required
								message: 'Campo email es requerido.'
							},
                            emailAddress: {
								// message: lang.invalid_mail
								message: 'Este email es incorrecto.'
							}
						}
					},
                    'emailRegister_confirmation':{
                        validators: {
							notEmpty: {
								// message: lang.mail_required_confirmation
								message: 'Email de confirmación es requerido.'
							},
                            emailAddress: {
								// message: lang.invalid_mail
								message: 'Email ivalido'
							},
                            identical: {
                                compare: function() {
                                    return form.querySelector('[name="email"]').value;
                                },
                                message: 'El email no es identico.'
                            }
						}
                    },
                    'password': {
                        validators: {
                            notEmpty: {
                                message: 'El campo password es requerido.'
                            },
                            callback: {
                                message: 'Lo minimo es de 8 caracteres, y maximo de 20',
                                callback: function(input) {
                                    if (input.value.length < 8 || input.value.length > 20) {
                                        return false;
                                    }else{
                                        return true;
                                    }
                                }
                            }
                        }
                    },
                    'password_confirmation': {
                        validators: {
                            notEmpty: {
                                message: 'El campo de comfirmar password es requerido.'
                            },
                            identical: {
                                compare: function() {
                                    return form.querySelector('[name="password"]').value;
                                },
                                message: 'El pasword no son iguales.'
                            }
                        }
                    }
				},
				plugins: {
					trigger: new FormValidation.plugins.Trigger({
                        event: {
                            password: false
                        }  
                    }),
					bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: '.fv-row',
                        eleInvalidClass: '',
                        eleValidClass: ''
                    })
				}
			}
		);

        // Handle form submit
        submitButton.addEventListener('click', function (e) {
            e.preventDefault();

            validator.revalidateField('password');

            validator.validate().then(function(status) {
		        if (status == 'Valid') {
                    // Show loading indication
                    submitButton.setAttribute('data-kt-indicator', 'on');

                    // Disable button to avoid multiple click 
                    submitButton.disabled = true;

                    form.submit();

                    // Simulate ajax request
                    // setTimeout(function() {
                    //     // Hide loading indication
                    //     submitButton.removeAttribute('data-kt-indicator');

                    //     // Enable button
                    //     submitButton.disabled = false;

                    //     // Show message popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                    //     Swal.fire({
                    //         text: "You have successfully reset your password!",
                    //         icon: "success",
                    //         buttonsStyling: false,
                    //         confirmButtonText: "Ok, got it!",
                    //         customClass: {
                    //             confirmButton: "btn btn-primary"
                    //         }
                    //     }).then(function (result) {
                    //         if (result.isConfirmed) { 
                    //             form.reset();  // reset form                    
                    //             passwordMeter.reset();  // reset password meter
                    //             //form.submit();
                    //         }
                    //     });
                    // }, 1500);   						
                } else {
                    // Show error popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                    // Swal.fire({
                    //     text: "Sorry, looks like there are some errors detected, please try again.",
                    //     icon: "error",
                    //     buttonsStyling: false,
                    //     confirmButtonText: "Ok, got it!",
                    //     customClass: {
                    //         confirmButton: "btn btn-primary"
                    //     }
                    // });
                }
		    });
        });

        // Handle password input
        form.querySelector('input[name="password"]').addEventListener('input', function() {
            if (this.value.length > 0) {
                validator.updateFieldStatus('password', 'NotValidated');
            }
        });
    }

    // Password input validation
    var validatePassword = function() {
        return  (passwordMeter.getScore() === 100);
    }

    // Public functions
    return {
        // Initialization
        init: function() {
            // Elements
            form = document.querySelector('#kt_sign_up_form');
            submitButton = document.querySelector('#kt_sign_up_submit');
            passwordMeter = KTPasswordMeter.getInstance(form.querySelector('[data-kt-password-meter="true"]'));

            handleForm ();
        }
    };
}();

// On document ready
KTUtil.onDOMContentLoaded(function() {
    KTSignupGeneral.init();
});

/******/ })();
//# sourceMappingURL=general.js.map