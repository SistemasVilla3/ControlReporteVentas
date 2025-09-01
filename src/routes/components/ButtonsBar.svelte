<script lang="ts">
    import { goto } from "$app/navigation";

    type rutaValida = '/pruebas/ControlReporteVentas/Metas' | '/pruebas/ControlReporteVentas/Comisiones' | '/pruebas/ControlReporteVentas/Noticias';

    function road(ruta: rutaValida) {
        goto(ruta);
    }
</script>

<div class="flex items-center justify-between sm:px-6">
    <button
    class="relative inline-flex font-exo items-center px-4 py-2 border border-gray-300 text-lg rounded-md text-white-900 bg-red-800 hover:bg-red-700 disabled:opacity-50"
    on:click={() => road('/pruebas/ControlReporteVentas/Metas')}>
    Alta de metas</button>
    <button 
    class="relative inline-flex font-exo items-center px-4 py-2 border border-gray-300 text-lg rounded-md text-white-900 bg-red-800 hover:bg-red-700 disabled:opacity-50"
    on:click={() => road('/pruebas/ControlReporteVentas/Noticias')}>
    Noticias y promos</button>
    <button 
        class="relative inline-flex font-exo items-center px-4 py-2 border border-gray-300 text-lg rounded-md text-white-900 bg-red-800 hover:bg-red-700 disabled:opacity-50"
    on:click={() => road('/pruebas/ControlReporteVentas/Comisiones')}>
    Alta de comisiones</button>
</div>

<style></style>