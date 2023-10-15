

 function funcion_opcion(e) {
    var x = document.getElementById('opcion'); 
    var imput_chek = document.getElementById('imput-chek'); 
    // console.log(x.id_option);
    if (e) {
        x.style.display = 'block';
        imput_chek.name="time_hire_lawye";  
    }else{
        imput_chek.removeAttribute('name');
        x.style.display = 'none';              
    }        
}


// Define form element
const form = document.getElementById('form-create-question');

// Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
var validator = FormValidation.formValidation(
                form,
                {
                    fields: {
                        'question': {
                            validators: {
                                notEmpty: {
                                    message: 'Debes llenar los campos'
                                }
                            }
                        },
                        'situation': {
                            validators: {
                                notEmpty: {
                                    message: 'Debes llenar los campos'
                                }
                            }
                        },
                        'state_city': {
                            validators: {
                                notEmpty: {
                                    message: 'Debes seleccionar un estado y ciudad'
                                }
                            }
                        },
                        'hire_lawyer': {
                            validators: {
                                notEmpty: {
                                    message: 'Seleccione una opcion'
                                }
                            }
                        },
                        'time_hire_lawye': {
                            validators: {
                                notEmpty: {
                                    message: 'Seleccione una opcion'
                                }
                            }
                        }
                    },
                    plugins: {
                        trigger: new FormValidation.plugins.Trigger(),
                        bootstrap: new FormValidation.plugins.Bootstrap5({
                            rowSelector: '.fv-row',
                            eleInvalidClass: 'is-invalid',
                            eleValidClass: 'is-invalid'
                        })
                    }
                }
);



// Submit button handler
const submitButton = document.getElementById('btn-form-question');
submitButton.addEventListener('click', function (e) {
    // Prevent default button action
    e.preventDefault();

    // Validate form before submit
    if (validator) {
        validator.validate().then(function (status) {
            console.log('validated!');

            if (status == 'Valid') {
                // Show loading indication
                submitButton.setAttribute('data-kt-indicator', 'on');

                // Disable button to avoid multiple click
                submitButton.disabled = true;
                form.submit();
                // Simulate form submission. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                // setTimeout(function () {
                //     // Remove loading indication
                //     submitButton.removeAttribute('data-kt-indicator');

                //     // Enable button
                //     submitButton.disabled = false;

                //     // Show popup confirmation
                //     Swal.fire({
                //         text: "Form has been successfully submitted!",
                //         icon: "success",
                //         buttonsStyling: false,
                //         confirmButtonText: "Ok, got it!",
                //         customClass: {
                //             confirmButton: "btn btn-primary"
                //         }
                //     });

                //     //form.submit(); // Submit form
                // }, 2000);
            }
        });
    }
});