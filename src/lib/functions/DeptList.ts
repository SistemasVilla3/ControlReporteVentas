const GET_ALL_DPT = "http://192.168.10.134:4018/AllComisiones";
const GET_ALL_MRK = "http://192.168.10.134:4018/AllComisionesMarcas";

export type Dept = {
    IdDepartamento: number;
    Nombre: string;
    PorcentajeComision: number;
};

export type Departamentos = Dept[];

export type Mark = {
    Nombre: string;
    PorcentajeComision: number;
    CodigoMarca: number;
}

export type Marcas = Mark[];

export async function fetchDept() {
    const res = await fetch(GET_ALL_DPT);
    if(!res.ok) {
        const body = await res.text();
        console.error(`Backend respondio ${res.statusText}`, body);
        throw new Error("Error al cargar las departamentos");
    }
    const data = await res.json();
    return data;
}

export async function fetchMark() {
    const res = await fetch(GET_ALL_MRK);
    if(!res.ok) {
        const body = await res.text();
        console.error(`Backend respondio ${res.statusText}`, body);
        throw new Error("Error al cargar las marcas");
    }
    const data = await res.json();
    return data;
}