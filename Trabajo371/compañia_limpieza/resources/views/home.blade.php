@extends('layouts.app')

@section('content')

<div class="card">
    <!--begin::Body-->
    <div class="card-body p-lg-17">
        <!--begin::Meet-->
        <div class="mb-18">
            <!--begin::Wrapper-->
            <div class="mb-11">
                <!--begin::Top-->
                <div class="text-center mb-18">
                    <!--begin::Title-->
                    <h3 class="fs-2hx text-dark mb-6">TIENDA VIRTUAL</h3>
                    <!--end::Title-->
                    <!--begin::Text-->
                    <div class="fs-5 text-dark mb-6">"La yixon</div>
                    <!--end::Text-->
                </div>
                <!--end::Top-->
                <!--begin::Overlay-->
                <div class="overlay">
                    <!--begin::Image-->
                    <img class="w-100 card-rounded" src="" alt="">
                    <!--end::Image-->
                    <!--begin::Links-->
                    <div class="overlay-layer card-rounded bg-dark bg-opacity-25">
                        <a href="http://www.unefa.edu.ve/portal/" class="btn btn-primary">Visita Nuetro Sitio Web</a>
                    </div>
                    <!--end::Links-->
                </div>
                <!--end::Overlay-->
            </div>
            <!--end::Wrapper-->

        </div>
        <!--end::Meet-->
        <!--begin::Team-->

            <!--end::Body-->
        </div>
        <!--end::Card-->
    </div>
    <!--end::Body-->
</div>




								<!--end::Modals-->
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
@endpush

@endsection

