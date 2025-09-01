<script lang="ts">
	import Header from "../components/Header.svelte";
	import Asign from "./components/Asign.svelte";
	import TableApt from "./components/TableAPT.svelte";
	import TableMark from "./components/TableMark.svelte";

    export let nombre = "Control de marcas";
</script>

<main class="w-full min-h-screen bg-gray-50">
    <div class="px-4 py-4 space-y-4">
        <Header {nombre}/>
        <div class="grid grid-cols-[minmax(0,1fr)_380px] gap-5 items-start">
            <div>
                <Asign/>
            </div>
            <!--Vista de tablas-->
            <div class="grid grid-cols-1 gap-5">
                <section class="gap-4 bg-white rounded-lg shadow-sm border border-gray-200">
                    <div class="max-h-[375px]">
                        <header class="px-2 py-2 border-b border-gray-200 items-center space-x-2">
                            <h1 class="text-2xl font-exo font-bold text-center text-brand-black">Marcas activas</h1>
                        </header>
                        <div class="p-4 lg:p-6">
                            <TableMark/>
                        </div>
                    </div>
                </section>

                <section class="gap-4 bg-white rounded-lg shadow-sm border border-gray-200">
                    <div class="max-h-[375px]">
                        <header class="px-2 py-2 border-b border-gray-200 items-center space-x-2">
                            <h1 class="text-2xl font-exo font-bold text-center text-brand-black">Departamentos</h1>
                        </header>
                        <div class="p-4 lg:p-6">
                            <TableApt/>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</main>