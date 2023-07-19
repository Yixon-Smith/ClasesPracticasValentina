<script>
</script>
<script>var hostUrl = "{{asset('m2/assets/')}}";</script>
<!--begin::Global Javascript Bundle(used by all pages)-->
<script src="{{asset('m2/assets/plugins/global/plugins.bundle.js')}}"></script>
<script src="{{asset('m2/assets/js/scripts.bundle.js')}}"></script>
<!--end::Global Javascript Bundle-->
<!--begin::Page Vendors Javascript(used by this page)-->
<script src="{{asset('m2/assets/plugins/custom/datatables/datatables.bundle.js')}}"></script>
<!--end::Page Vendors Javascript-->
<!--begin::Page Custom Javascript(used by this page)-->
<script src="{{asset('m2/assets/js/custom/apps/file-manager/list.js')}}"></script>
<script src="{{asset('m2/assets/js/widgets.bundle.js')}}"></script>
<script src="{{asset('m2/assets/js/custom/widgets.js')}}"></script>
<script src="{{asset('m2/assets/js/custom/apps/chat/chat.js')}}"></script>
<script src="{{asset('m2/assets/js/custom/intro.js')}}"></script>

<script src="{{ asset('assets/js/notify/bootstrap-notify.min.js') }}"></script>
{{-- <script src="/m2/assets/js/custom/utilities/modals/upgrade-plan.js"></script> --}}
{{-- <script src="/m2/assets/js/custom/utilities/modals/create-app.js"></script> --}}
{{-- <script src="/m2/assets/js/custom/utilities/modals/users-search.js"></script> --}}
<!--end::Page Custom Javascript-->
@stack('scripts')
<script>
    function base_url() {
        let url = '{{url('/')}}'
        return url;
    }
    function messeg(m,t) {
        if (t=="success") {
            $.notify(
                '<i class="fa fa-bell-o"></i><strong>Excelente</strong> ' +m+
                    "",
                {
                    type: t,
                    allow_dismiss: true,
                    delay: 2000,
                    showProgressbar: false,
                    timer: 300,
                }
            );
            return false;
        }
        $.notify(
            '<i class="fa fa-bell-o"></i><strong>!Hoops¡</strong> ' +m+
                "",
            {
                type: t,
                allow_dismiss: true,
                delay: 2000,
                showProgressbar: false,
                timer: 300,
            }
        );
    }

    function date_formate(dat="") {
        // Creamos array con los meses del año
        const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
        // Creamos array con los días de la semana
        const dias_semana = ['Domingo', 'Lunes', 'martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        // Creamos el objeto fecha instanciándolo con la clase Date
        if (dat == "") {
            const fecha = new Date();
        }else{

            const fecha = new Date(dat);
        }
        // Construimos el formato de salida
        return dias_semana[fecha.getDay()] + ', ' + fecha.getDate() + ' de ' + meses[fecha.getMonth()] + ' de ' + fecha.getUTCFullYear();
    }
</script>
