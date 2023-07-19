@extends('layouts.app')

@section('content')
@if (session('mensaje'))
<div class="alert alert-danger">
    <strong>{{ session('mensaje') }}</strong>
</div>
@endif
{{-- <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/datatables.css') }}"> --}}
<link rel="stylesheet" type="text/css" href="https://preview.keenthemes.com/metronic8/demo1/assets/plugins/custom/datatables/datatables.bundle.css">
<div class="post d-flex flex-column-fluid" id="kt_post">
    <!--begin::Container-->
    <div id="kt_content_container" class="container-xxl">

        <!--begin::Row-->
        <div class="row g-6 g-xl-9">

            <!--begin::Col-->
            <div class="col-md-6 col-xl-4">
                <!--begin::Card-->
                <div class="card border-hover-primary">

                    <!--begin:: Card body-->
                    <div class="card-body p-9">
                        <!--begin::Name-->
                       
                      
                        <div class="card-body p-0 pt-1">
                            <!--begin::Separator-->
                            <div class="separator separator-dashed my-3"></div>
                            <!--end::Separator-->
                            <!--begin::Item-->
                            <div class="d-flex flex-stack">
                                <!--begin::Section-->
                                <img src="{{asset('assets/images/productos/telefono_iphone.jpg')}}" class="card_telefono"/>
                                <!--end::Section-->
                               
                            </div>
                            <!--end::Item-->
                            <!--begin::Separator-->
                            <div class="separator separator-dashed my-3"></div>
                            <!--end::Separator-->
                        </div>

                    </div>
                    <!--end:: Card body-->
                </div>
                <!--end::Card-->
                <div class="card-footer">
                    <div class="row">
                        <div class="descrip_pro">
                          
                                <!--begin::Svg Icon | path: icons/duotune/general/gen031.svg-->
                                <p class="">Telefono muy facil uso iphone</p>
                                <p class="">PRECIO: $8000</p>
                                <!--end::Svg Icon-->
                        </div>
                    </div>
                </div>
            </div>
            <!--end::Col-->


        </div>
        <!--end::Row-->


    </div>
    <!--end::Container-->

</div>
@push('scripts')
<script>var hostUrl = "/m2/assets/";</script>
<script src="/m2/assets/plugins/global/plugins.bundle.js"></script>
<script src="/m2/assets/js/scripts.bundle.js"></script>
<!--end::Global Javascript Bundle-->
<!--begin::Page Vendors Javascript(used by this page)-->
<script src="/m2/assets/plugins/custom/datatables/datatables.bundle.js"></script>
<!--end::Page Vendors Javascript-->
<!--begin::Page Custom Javascript(used by this page)-->
<script src="/m2/assets/js/custom/apps/user-management/users/list/table.js"></script>
{{-- <script src="https://preview.keenthemes.com/metronic8/demo1/assets/plugins/custom/datatables/datatables.bundle.js"></script> --}}
<script src="/m2/assets/js/custom/apps/user-management/users/list/add.js"></script>
<script src="/m2/assets/js/widgets.bundle.js"></script>
<script src="/m2/assets/js/custom/widgets.js"></script>
<script src="/m2/assets/js/custom/apps/chat/chat.js"></script>
<script src="/m2/assets/js/custom/intro.js"></script>
    {{-- <script src="{{ asset('assets/js/datatable/datatables/jquery.dataTables.min.js') }}"></script> --}}
<script>
// $('#kt_table_users').dataTable( {
//         "language": {
//             "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
//         },
//             "order": [[ 1, 'asc' ]],
//             dom: 'Bfrtip',
//             buttons: [
//                 'copy', 'csv', 'excel', 'pdf', 'print'
//             ]
//         } );
</script>

@endpush
@endsection
