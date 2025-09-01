<script lang="ts">
    import {fetchDept, type Departamentos} from "$lib/functions/DeptList";
	import { onMount } from "svelte";

    let lista: Departamentos;
    let loading = false;
    let error = "";

    async function loadDept() {
        try {
            loading = true;
            error = "";
            lista = await fetchDept();
        } catch (e) {
            error = (e as Error).message;
        } finally {
            loading = false;
        }
    }

    onMount(async () => {
        loadDept();
    });
</script>

<div class="space-y-2 overflow-hidden">
    <div class="max-h-[250px] table-scroll overflow-auto">
        <table class="w-full border-collapse">
            <thead class="bg-white sticky top-0">
                <tr class="border-b border-gray-200 text-gray-900 text-sm">
                    <th class="py-0 px-4 font-exo font-black text-xl text-left">Nombre</th>
                </tr>
            </thead>

            <tbody>
                {#each lista as dep}
                    <tr class="border-b border-gray-100 hover:bg-gray-50">
                        <td class="py-2 px-4 text-lg font-exo font-semibold text-gray-900">
                            {dep.Nombre}
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
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