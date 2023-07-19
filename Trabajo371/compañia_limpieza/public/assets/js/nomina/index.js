
    $(document).ready(function() {
        // console.log("hola");
        list_nomina();
    });

function btn_editar(e,i) {
    // console.log(e);
    if (e) {
        
        $("#btn-editar-descrccion"+i).removeClass('ocult-btn');
        
    }else{
        $("#btn-editar-descrccion"+i).addClass('ocult-btn');
    }
}

function option_adit_precio(e) {
        if (e) {
        
            $(".option-edit").hide();
            // $("#view-structu-cost-butom").hide();
            $("#form-editar-precio-product").show(); 
            
        }else{
            $("#form-editar-precio-product").hide();
            $(".option-edit").show();
        }
    }

    function option_adit(e,i) {
        if (e) {
        
            $(".option-edit"+i).hide();
            // $("#view-structu-cost-butom").hide();
            $("#form-editar-descriccion"+i).show(); 
            
        }else{
            $("#form-editar-descriccion"+i).hide();
            $(".option-edit"+i).show();
        }
    }

    function list_nomina() {
        const sendGetRequest = async () => {
            try {
            
                const resp = await axios.get("/nomina/get_list_nomina");
                console.log(resp.data);
    
             
    
                
            } catch (err) 
            {
                console.log(err);
            }
        };
        sendGetRequest();
    }