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
                    <h3 class="fs-2hx text-dark mb-6">UNEFA LARA</h3>
                    <!--end::Title-->
                    <!--begin::Text-->
                    <div class="fs-5 text-dark mb-6">"La innovacion es lo que distingue a los lideres
                        de los seguidores".</div>
                    <!--end::Text-->
                </div>
                <!--end::Top-->
                <!--begin::Overlay-->
                <div class="overlay">
                    <!--begin::Image-->
                    <img class="w-100 card-rounded" src="{{asset('home.jpeg')}}" alt="">
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
            <!--begin::Description-->
            <div class="fs-5 fw-bold text-gray-600">
                <!--begin::Text-->
                <p class="m-0">La UNEFA logró personalidad jurídica y patrimonio propio e independiente del Fisco Nacional. Adquirió el carácter de Universidad Experimental, estatus que le confirió estructura dinámica y autonomía organizativa, académica, administrativa, económica y financiera.
                <!--end::Text-->
            </div>
            <!--end::Description-->
        </div>
        <!--end::Meet-->
        <!--begin::Team-->
        <div class="mb-18">
            <!--begin::Heading-->
            <div class="text-center mb-17">
                <!--begin::Title-->
                <h3 class="fs-2hx text-dark mb-5">Visión</h3>
                <!--end::Title-->
                <!--begin::Sub-title-->
                <div class="fs-5 text-muted fw-bold">Ser la primera universidad socialista, reconocida por su Excelencia Educativa en el territorio nacional e internacional, líder en los saberes humanistas, científicos, tecnológicos y militares, inspirada en el ideario bolivariano.</div>
                <!--end::Sub-title=-->
            </div>
            <!--end::Heading-->
            <!--begin::Wrapper-->
            <div class="row row-cols-1 row-cols-sm-2 row-cols-xl-4 gy-10">
                <!--begin::Item-->
                <div class="col text-center mb-9">
                    <!--begin::Photo-->
                    <div class="octagon mx-auto mb-2 d-flex w-150px h-150px bgi-no-repeat bgi-size-contain bgi-position-center" style="background-image:url('http://www.unefa.edu.ve/portal/img/radio.jpg')"></div>
                    <!--end::Photo-->
                    <!--begin::Person-->
                    <div class="mb-0">
                        <!--begin::Name-->
                        <a href="http://www.unefa.edu.ve/portal/radio/" class="text-dark fw-bolder text-hover-primary fs-3">Radio Unefa</a>
                        <!--end::Name-->
                        <!--begin::Position-->
                        <!--begin::Position-->
                    </div>
                    <!--end::Person-->
                </div>
                <!--end::Item-->
                <!--begin::Item-->
                <div class="col text-center mb-9">
                    <!--begin::Photo-->
                    <div class="octagon mx-auto mb-2 d-flex w-150px h-150px bgi-no-repeat bgi-size-contain bgi-position-center" style="background-image:url('http://www.unefa.edu.ve/portal/img/Gaceta1.jpg')"></div>
                    <!--end::Photo-->
                    <!--begin::Person-->
                    <div class="mb-0">
                        <!--begin::Name-->
                        <a href="http://www.unefa.edu.ve/portal/plantillainter.php" class="text-dark fw-bolder text-hover-primary fs-3">Gaceta Universitaria</a>
                        <!--end::Name-->
                        <!--begin::Position-->
                        <!--begin::Position-->
                    </div>
                    <!--end::Person-->
                </div>
                <!--end::Item-->
                <!--begin::Item-->
                <div class="col text-center mb-9">
                    <!--begin::Photo-->
                    <div class="octagon mx-auto mb-2 d-flex w-150px h-150px bgi-no-repeat bgi-size-contain bgi-position-center" style="background-image:url('http://www.unefa.edu.ve/portal/img/Calendario.jpg')"></div>
                    <!--end::Photo-->
                    <!--begin::Person-->
                    <div class="mb-0">
                        <!--begin::Name-->
                        <a href="http://www.unefa.edu.ve/CMS/administrador/vistas/archivos/enlaces_interes/CALENDARIO2022.pdf" class="text-dark fw-bolder text-hover-primary fs-3">Calendario Académico</a>
                        <!--end::Name-->
                        <!--begin::Position-->
                        <!--begin::Position-->
                    </div>
                    <!--end::Person-->
                </div>
                <!--end::Item-->
                <!--begin::Item-->
                <div class="col text-center mb-9">
                    <!--begin::Photo-->
                    <div class="octagon mx-auto mb-2 d-flex w-150px h-150px bgi-no-repeat bgi-size-contain bgi-position-center" style="background-image:url('http://www.unefa.edu.ve/portal/criptos/boton_petro.png')"></div>
                    <!--end::Photo-->
                    <!--begin::Person-->
                    <div class="mb-0">
                        <!--begin::Name-->
                        <a href="http://unefa.edu.ve/portal/criptos/" class="text-dark fw-bolder text-hover-primary fs-3">Petro</a>
                        <!--end::Name-->
                        <!--begin::Position-->
                        <!--begin::Position-->
                    </div>
                    <!--end::Person-->
                </div>
                <!--end::Item-->
                <!--begin::Item-->
                <div class="col text-center mb-9">
                    <!--begin::Photo-->
                    <div class="octagon mx-auto mb-2 d-flex w-150px h-150px bgi-no-repeat bgi-size-contain bgi-position-center" style="background-image:url('http://www.unefa.edu.ve/portal/img/Boton_boletin.png')"></div>
                    <!--end::Photo-->
                    <!--begin::Person-->
                    <div class="mb-0">
                        <!--begin::Name-->
                        <a href="http://www.unefa.edu.ve/portal/plantilla_boletin.php" class="text-dark fw-bolder text-hover-primary fs-3">Bolentin Informativo</a>
                        <!--end::Name-->
                        <!--begin::Position-->
                        <!--begin::Position-->
                    </div>
                    <!--end::Person-->
                </div>
                <!--end::Item-->
                <!--begin::Item-->
                <div class="col text-center mb-9">
                    <!--begin::Photo-->
                    <div class="octagon mx-auto mb-2 d-flex w-150px h-150px bgi-no-repeat bgi-size-contain bgi-position-center" style="background-image:url('http://www.unefa.edu.ve/portal/img/Libro_pascualino.png')"></div>
                    <!--end::Photo-->
                    <!--begin::Person-->
                    <div class="mb-0">
                        <!--begin::Name-->
                        <a href="http://www.unefa.edu.ve/CMS/administrador/vistas/archivos/la_union_de_naciones_suramericanas_unasur_alianzas_estrategicas_.pdf" class="text-dark fw-bolder text-hover-primary fs-3">UNASUR: Alianzas Estratégicas</a>
                        <!--end::Name-->
                        <!--begin::Position-->
                        <!--begin::Position-->
                    </div>
                    <!--end::Person-->
                </div>
                <!--end::Item-->
                <!--begin::Item-->
                <div class="col text-center mb-9">
                    <!--begin::Photo-->
                    <div class="octagon mx-auto mb-2 d-flex w-150px h-150px bgi-no-repeat bgi-size-contain bgi-position-center" style="background-image:url('http://www.unefa.edu.ve/portal/img/boton_vidi.png')"></div>
                    <!--end::Photo-->
                    <!--begin::Person-->
                    <div class="mb-0">
                        <!--begin::Name-->
                        <a href="https://drive.google.com/drive/folders/1Ch_3uMYO88bDguhjOkf_Q1OJ8Eq5HEq1" class="text-dark fw-bolder text-hover-primary fs-3">Biblioteca Virtual del VIDI</a>
                        <!--end::Name-->
                        <!--begin::Position-->
                        <!--begin::Position-->
                    </div>
                    <!--end::Person-->
                </div>
                <!--end::Item-->
                <!--begin::Item-->
                {{-- <div class="col text-center mb-9">
                    <!--begin::Photo-->
                    <div class="octagon mx-auto mb-2 d-flex w-150px h-150px bgi-no-repeat bgi-size-contain bgi-position-center" style="background-image:url('/metronic8/demo1/assets/media/avatars/300-23.jpg')"></div>
                    <!--end::Photo-->
                    <!--begin::Person-->
                    <div class="mb-0">
                        <!--begin::Name-->
                        <a href="/metronic8/demo1/../demo1/dark/pages/user-profile/projects.html" class="text-dark fw-bolder text-hover-primary fs-3">Liam James</a>
                        <!--end::Name-->
                        <!--begin::Position-->
                        <div class="text-muted fs-6 fw-bold">QA Managers</div>
                        <!--begin::Position-->
                    </div>
                    <!--end::Person-->
                </div>
                <!--end::Item--> --}}
            </div>
            <!--end::Wrapper-->
        </div>
        <!--end::Team-->
        <!--begin::Join-->
        <div class="text-center mb-20">
            <!--begin::Top-->
            <div class="mb-13">
                <!--begin::Title-->
                <h3 class="fs-2hx text-dark mb-5">Misión</h3>
                <!--end::Title-->
                <!--begin::Text-->
                <div class="fs-5 fw-bold text-gray-600 text-start mb-15">Formar a través de la docencia, la investigación y la extensión, ciudadanos corresponsables con la seguridad y Defensa Integral de la Nación, comprometidos con la Revolución Bolivariana, con competencias emancipadoras y humanistas necesarias para sustentar los planes de desarrollo del país, promoviendo la producción y el intercambio de saberes, como mecanismo de integración latinoamericana y caribeña.</div>
                <!--end::Text-->
            </div>
            <!--end::Top-->
            <!--begin::Text-->
            <p class="fs-5 fw-bold text-gray-600 text-start mb-15">La Secretaría General de la UNEFA es una dependencia académico/administrativa, que actúa como organismo de coordinación, ejecución, supervisión, evaluación y de apoyo, en los procesos referidos a ingreso, permanencia, traslado y egreso de estudiantes; registro y control de los títulos, diplomas y certificados que otorga la universidad.
                <br><h5>Jefe o encargado: Riberth Vargas</h5>
            <!--end::Text-->

        </div>
        <!--end::Join-->
        <!--begin::Card-->
        <div class="card mb-4 bg-light text-center">
            <!--begin::Body-->
            <div class="card-body py-12">
                <!--begin::Icon-->
                <a href="https://twitter.com/Unefa_VEN" class="mx-4">
                    <img src="http://www.unefa.edu.ve/portal/img/tw.png" class="h-30px my-2" alt="">
                </a>
                <!--end::Icon-->
                <!--begin::Icon-->
                <a href="#" class="mx-4">
                    <img src="/metronic8/demo1/assets/media/svg/brand-logos/instagram-2-1.svg" class="h-30px my-2" alt="">
                </a>
                <!--end::Icon-->
                <!--begin::Icon-->
                <a href="https://www.youtube.com/channel/UCU1YFZgV-ENQkfHRspsK9nA" class="mx-4">
                    <img src="http://www.unefa.edu.ve/portal/img/you.png" class="h-30px my-2" alt="">
                </a>
                <!--end::Icon-->
                <!--begin::Icon-->
                <a href="https://www.instagram.com/accounts/login/?next=/unefa_ve/" class="mx-4">
                    <img src="http://www.unefa.edu.ve/portal/img/ig.png" class="h-30px my-2" alt="">
                </a>
                <!--end::Icon-->
                <!--begin::Icon-->
                <a href="https://www.facebook/unefa.ve/" class="mx-4">
                    <img src="http://www.unefa.edu.ve/portal/img/face.png" class="h-30px my-2" alt="">
                </a>
                <!--end::Icon-->
                <!--begin::Icon-->

                <!--end::Icon-->
            </div>
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

