<script lang="ts">
	import { fetchComisiones, type Comision } from "../../lib/functions/Comisiones";
	import { onMount } from "svelte";

    const API_ACT_COM = "http://192.168.10.134:4018/ActualizarComisionesMarcas";

    type ComisionEdit = Comision & {
        nuevaComision: number;
    };


    let lista : ComisionEdit[] = [];
    let busqueda = "";
    let loading = false;
    let error = "";

    $: filtrados = lista.filter(com =>
        com.Nombre.toLowerCase().includes(busqueda.toLowerCase())
    );


    async function loadComisiones() {
        try {
            loading = true;
            error = "";
            const raw = await fetchComisiones();
            lista = raw.map((c: Comision) => ({
                ...c,
                nuevaComision: 0
            })) as ComisionEdit[];
            lista = lista.map(c => ({
                ...c,
                nuevaComision: 0
            }));
        } catch (e) {
            error = (e as Error).message;
        } finally {
            loading = false;
        }
    }

    onMount(async () => {
        loadComisiones();
    });

    async function updateCom(nombre: string, porcentaje: number, codigo: number) {
        const data = {
            Nombre: nombre,
            PorcentajeComision: porcentaje,
            CodigoMarca: codigo
        };

        try {
            const res = await fetch(API_ACT_COM, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            if (!res.ok) {
                throw new Error("Error al actualizar la comisión");
            }
            const resData = await res.json();
            console.log("Comisión actualizada:", resData);
            return true;
        } catch (error) {
            console.error("Error al actualizar la comisión:", error);
            return false;
        }
    }

    async function handleUpdate(com: ComisionEdit, button: HTMLButtonElement) {
        const row = button.closest("tr");
        const input = row?.querySelector("input[type='number']") as HTMLInputElement;
        try {
            await updateCom(com.Nombre, com.nuevaComision, com.CodigoMarca);
            alert(`Comisión de ${com.Nombre} actualizada correctamente`);
            input.value = "";
            loadComisiones(); // Recargar la lista después de actualizar 
        } catch (e) {
      console.error(e);
      alert("Error al actualizar la comisión");
    }
    }
</script>

<div class="bg-white rounded-lg shadow-sm border border-gray-200 m-5">
    <div class="p-4">
        <input type="text"
        placeholder="Buscar marca..."
        bind:value={busqueda}
        class="border border-gray-300 rounded-md text-gray-900 px-4 py-2 w-full"
        />
    </div>
    <div class="max-h-[750px] overflow-x-auto table-scroll rounded-md">
        <table class="w-full mx-auto rounded-md">
            <thead>
                <tr class="sticky top-0 z-10 bg-red-800">
                    <th class="px-6 py-3 font-bold text-center text-sm text-white-900 uppercase tracking-wider">Marca</th>
                    <th class="px-6 py-3 font-bold text-center text-sm text-white-900 uppercase tracking-wider">Comision actual</th>
                    <th class="px-6 py-3 font-bold text-center text-sm text-white-900 uppercase tracking-wider">Nueva comision</th>
                </tr>
            </thead>

            <tbody class="bg-white divide-y divide-gray-200">
            {#each filtrados as com}
                <tr class="hover:bg-gray-50">
                    <td class="py-4 px-4 font-semibold whitespace-nowrap text-gray-900 text-center">{com.Nombre}</td>
                    <td class="py-4 px-4 font-semibold text-xl whitespace-nowrap text-gray-900 text-center">{com.PorcentajeComision}%</td>
                    <td>
                        <input 
                        class="items-end text-gray-900 rounded-md w-100 ml-60"
                        type="number" 
                        bind:value={com.nuevaComision} min="0" max="100">
                                <button 
                                class="items-end px-4 py-2 text-sm rounded-md text-white-900 bg-red-800 hover:bg-red-700 ml-30"
                                on:click={(event) => handleUpdate(com, event.currentTarget)}>Guardar</button>
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