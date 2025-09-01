<script lang="ts">
    import {fetchMark, type Marcas} from "$lib/functions/DeptList";
	import { onMount } from "svelte";

    let lista: Marcas = [];
    let busqueda = "";
    let loading = false;
    let error = "";

    const norm = (s: string) => (s ?? "")
    .normalize("NFD").replace(/\p{Diacritic}/gu, "")
    .toLowerCase().trim();

    $: q = norm(busqueda);

    $: filtrados = (lista ?? []).filter((m) => norm(m.Nombre).includes(q));

    async function loadMark() {
        try {
            loading = true;
            error = "";
            lista = await fetchMark();
        } catch (e) {
            error = (e as Error).message;
        } finally {
            loading = false;
        }
    }

    onMount(async () => {
        loadMark();
    });
</script>

<div class="space-y-2 overflow-hidden">
    <!--Buscador-->
    <div class="p-2 py-0">
        <input type="text"
        placeholder="Buscar marca..."
        bind:value={busqueda}
        class="border border-gray-300 rounded-md text-gray-900 px-3 py-1 w-full"
        aria-label="Buscar marca">
    </div>
    <div class="max-h-[250px] overflow-auto table-scroll">
        {#if loading}
            <div class="p-4 text-gray-600">Cargando marcas…</div>
        {:else if error}
            <div class="p-4 text-red-600">Error: {error}</div>
        {:else if filtrados.length === 0}
            <div class="p-4 text-gray-500">Sin resultados para “{busqueda}”.</div>
        {:else}
            <table class="w-full border-collapse table-scroll">
                <thead class="bg-white sticky top-0">
                    <tr class="border-b border-gray-200 text-gray-900 text-sm">
                        <th class="py-0 px-4 font-exo font-black text-xl text-left">Nombre</th>
                    </tr>
                </thead>
                <tbody class="table-scroll">
                    {#each filtrados as mrk (mrk.CodigoMarca)}
                        <tr class="border-b border-gray-100 hover:bg-gray-50">
                            <td class="py-2 px-4 text-lg font-exo font-semibold text-gray-900">
                                {mrk.Nombre}
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        {/if}
    </div>
</div>

<style>
    .table-scroll::-webkit-scrollbar {
  width: 8px;                  /* grosor */
}
.table-scroll::-webkit-scrollbar-track {
  background: #f3f4f6;         /* gray-100 */
  border-radius: 4px;
}
.table-scroll::-webkit-scrollbar-thumb {
  background: #800000;         /* blue-500 */
  border-radius: 4px;
  border: .5px solid #f3f4f6;   /* margen “inset” */
}
.table-scroll:hover::-webkit-scrollbar-thumb {
  background: #bd1f19;         /* blue-600 */
}
</style>