const API_GET_COM = "http://192.168.10.134:4018/AllComisionesMarcas";
const API_COM_VEN = "http://192.168.10.134:4018/ComisionDeUnVendedor";

export type Comision = {
    Nombre: string;
    PorcentajeComision: number;
    CodigoMarca: number;
}

export type ComVend = {
    IdComision: number;
    MetaID: number;
    MetaSemanal: number;
    MetaDiaria: number;
    VendedorID: number;
    ValorNotaCredito: number;
    ValorDevoluciones: number;
    ComisionContado: number;
    ComisionCredito: number;
    DocsID: number;
    Activo: true;
}

export type Comisiones = Comision[];

export async function fetchComisiones() {
    const res = await fetch(API_GET_COM);
    if(!res.ok) {
        const body = await res.text();
        console.error(`Backend respondio ${res.statusText}`, body);
        throw new Error('Error al cargar las comisiones');
    }
    const data = await res.json();
    return data;
}


export async function fetchComVend(vendId: number) {
    const res = await fetch(`${API_COM_VEN}/${vendId}`);
    if(!res.ok) {
        const body = await res.text();
        //console.error(`Backend respondio ${res.statusText}`, body);
        //throw new Error('Error al cargar las comisiones');
    }
    console.log(`Comision para vendedor ${vendId} encontrado`);
    const data = await res.json();
    return data;
}