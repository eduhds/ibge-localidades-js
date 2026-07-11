"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ibgeApi = exports.createIbgeApiClient = void 0;
const IBGE_BASE = 'https://servicodados.ibge.gov.br';
async function ibgeFetch(path, params) {
    const url = new URL(path, IBGE_BASE);
    if (params) {
        for (const [key, value] of Object.entries(params)) {
            if (value !== undefined) {
                url.searchParams.append(key, String(value));
            }
        }
    }
    const response = await fetch(url.toString());
    if (!response.ok) {
        throw new Error(`IBGE API error: ${response.status} ${response.statusText}`);
    }
    return response.json();
}
function normalizeArray(value) {
    return Array.isArray(value) ? value : [value];
}
function normalizeObject(value, paramName) {
    if (Array.isArray(value)) {
        if (value.length === 0) {
            throw new Error(`Nenhum resultado encontrado para ${paramName}`);
        }
        if (value.length > 1) {
            throw new Error(`Mais de um resultado encontrado para ${paramName}. Use o formato 'array' para múltiplos resultados.`);
        }
        return value[0];
    }
    return value;
}
function createIbgeApiClient() {
    return {
        paises: {
            todos: params => ibgeFetch('/api/v1/localidades/paises', params),
            porId: (id, responseFormat) => ibgeFetch(`/api/v1/localidades/paises/${id}`).then(value => {
                if (responseFormat === 'array')
                    return normalizeArray(value);
                if (responseFormat === 'object')
                    return normalizeObject(value, `pais ${id}`);
                return value;
            }),
        },
        regioes: {
            todas: params => ibgeFetch('/api/v1/localidades/regioes', params),
            porId: (id, responseFormat) => ibgeFetch(`/api/v1/localidades/regioes/${id}`).then(value => {
                if (responseFormat === 'array')
                    return normalizeArray(value);
                if (responseFormat === 'object')
                    return normalizeObject(value, `região ${id}`);
                return value;
            }),
        },
        estados: {
            todos: params => ibgeFetch('/api/v1/localidades/estados', params),
            porId: (id, responseFormat) => ibgeFetch(`/api/v1/localidades/estados/${id}`).then(value => {
                if (responseFormat === 'array')
                    return normalizeArray(value);
                if (responseFormat === 'object')
                    return normalizeObject(value, `UF ${id}`);
                return value;
            }),
            municipiosPorEstado: uf => ibgeFetch(`/api/v1/localidades/estados/${uf}/municipios`),
            mesorregioesPorEstado: uf => ibgeFetch(`/api/v1/localidades/estados/${uf}/mesorregioes`),
            microrregioesPorEstado: uf => ibgeFetch(`/api/v1/localidades/estados/${uf}/microrregioes`),
            regioesImediatasPorEstado: uf => ibgeFetch(`/api/v1/localidades/estados/${uf}/regioes-imediatas`),
            regioesIntermediariasPorEstado: uf => ibgeFetch(`/api/v1/localidades/estados/${uf}/regioes-intermediarias`),
            regioesMetropolitanasPorEstado: uf => ibgeFetch(`/api/v1/localidades/estados/${uf}/regioes-metropolitanas`),
            distritosPorEstado: uf => ibgeFetch(`/api/v1/localidades/estados/${uf}/distritos`),
            subdistritosPorEstado: uf => ibgeFetch(`/api/v1/localidades/estados/${uf}/subdistritos`),
        },
        municipios: {
            todos: params => ibgeFetch('/api/v1/localidades/municipios', params),
            porId: (id, responseFormat) => ibgeFetch(`/api/v1/localidades/municipios/${id}`).then(value => {
                if (responseFormat === 'array')
                    return normalizeArray(value);
                if (responseFormat === 'object')
                    return normalizeObject(value, `município ${id}`);
                return value;
            }),
            porMesorregiao: mesorregiao => ibgeFetch(`/api/v1/localidades/mesorregioes/${mesorregiao}/municipios`),
            porMicrorregiao: microrregiao => ibgeFetch(`/api/v1/localidades/microrregioes/${microrregiao}/municipios`),
            porRegiaoImediata: regiaoImediata => ibgeFetch(`/api/v1/localidades/regioes-imediatas/${regiaoImediata}/municipios`),
            porRegiaoIntermediaria: regiaoIntermediaria => ibgeFetch(`/api/v1/localidades/regioes-intermediarias/${regiaoIntermediaria}/municipios`),
            porRegiao: regiao => ibgeFetch(`/api/v1/localidades/regioes/${regiao}/municipios`),
            distritosPorMunicipio: municipio => ibgeFetch(`/api/v1/localidades/municipios/${municipio}/distritos`),
            subdistritosPorMunicipio: municipio => ibgeFetch(`/api/v1/localidades/municipios/${municipio}/subdistritos`),
        },
        mesorregioes: {
            todas: params => ibgeFetch('/api/v1/localidades/mesorregioes', params),
            porId: (id, responseFormat) => ibgeFetch(`/api/v1/localidades/mesorregioes/${id}`).then(value => {
                if (responseFormat === 'array')
                    return normalizeArray(value);
                if (responseFormat === 'object')
                    return normalizeObject(value, `mesorregião ${id}`);
                return value;
            }),
            porEstado: uf => ibgeFetch(`/api/v1/localidades/estados/${uf}/mesorregioes`),
            porRegiao: regiao => ibgeFetch(`/api/v1/localidades/regioes/${regiao}/mesorregioes`),
            distritosPorMesorregiao: mesorregiao => ibgeFetch(`/api/v1/localidades/mesorregioes/${mesorregiao}/distritos`),
            microrregioesPorMesorregiao: mesorregiao => ibgeFetch(`/api/v1/localidades/mesorregioes/${mesorregiao}/microrregioes`),
            municipiosPorMesorregiao: mesorregiao => ibgeFetch(`/api/v1/localidades/mesorregioes/${mesorregiao}/municipios`),
            subdistritosPorMesorregiao: mesorregiao => ibgeFetch(`/api/v1/localidades/mesorregioes/${mesorregiao}/subdistritos`),
        },
        microrregioes: {
            todas: params => ibgeFetch('/api/v1/localidades/microrregioes', params),
            porId: (id, responseFormat) => ibgeFetch(`/api/v1/localidades/microrregioes/${id}`).then(value => {
                if (responseFormat === 'array')
                    return normalizeArray(value);
                if (responseFormat === 'object')
                    return normalizeObject(value, `microrregião ${id}`);
                return value;
            }),
            porEstado: uf => ibgeFetch(`/api/v1/localidades/estados/${uf}/microrregioes`),
            porMesorregiao: mesorregiao => ibgeFetch(`/api/v1/localidades/mesorregioes/${mesorregiao}/microrregioes`),
            porRegiao: regiao => ibgeFetch(`/api/v1/localidades/regioes/${regiao}/microrregioes`),
            distritosPorMicrorregiao: microrregiao => ibgeFetch(`/api/v1/localidades/microrregioes/${microrregiao}/distritos`),
            municipiosPorMicrorregiao: microrregiao => ibgeFetch(`/api/v1/localidades/microrregioes/${microrregiao}/municipios`),
            subdistritosPorMicrorregiao: microrregiao => ibgeFetch(`/api/v1/localidades/microrregioes/${microrregiao}/subdistritos`),
        },
        regioesImediatas: {
            todas: params => ibgeFetch('/api/v1/localidades/regioes-imediatas', params),
            porId: (id, responseFormat) => ibgeFetch(`/api/v1/localidades/regioes-imediatas/${id}`).then(value => {
                if (responseFormat === 'array')
                    return normalizeArray(value);
                if (responseFormat === 'object')
                    return normalizeObject(value, `região imediata ${id}`);
                return value;
            }),
            porEstado: uf => ibgeFetch(`/api/v1/localidades/estados/${uf}/regioes-imediatas`),
            porRegiaoIntermediaria: regiaoIntermediaria => ibgeFetch(`/api/v1/localidades/regioes-intermediarias/${regiaoIntermediaria}/regioes-imediatas`),
            porRegiao: regiao => ibgeFetch(`/api/v1/localidades/regioes/${regiao}/regioes-imediatas`),
            distritosPorRegiaoImediata: regiaoImediata => ibgeFetch(`/api/v1/localidades/regioes-imediatas/${regiaoImediata}/distritos`),
            municipiosPorRegiaoImediata: regiaoImediata => ibgeFetch(`/api/v1/localidades/regioes-imediatas/${regiaoImediata}/municipios`),
            subdistritosPorRegiaoImediata: regiaoImediata => ibgeFetch(`/api/v1/localidades/regioes-imediatas/${regiaoImediata}/subdistritos`),
        },
        regioesIntermediarias: {
            todas: params => ibgeFetch('/api/v1/localidades/regioes-intermediarias', params),
            porId: (id, responseFormat) => ibgeFetch(`/api/v1/localidades/regioes-intermediarias/${id}`).then(value => {
                if (responseFormat === 'array')
                    return normalizeArray(value);
                if (responseFormat === 'object')
                    return normalizeObject(value, `região intermediária ${id}`);
                return value;
            }),
            porEstado: uf => ibgeFetch(`/api/v1/localidades/estados/${uf}/regioes-intermediarias`),
            porRegiao: regiao => ibgeFetch(`/api/v1/localidades/regioes/${regiao}/regioes-intermediarias`),
            regioesImediatasPorRegiaoIntermediaria: regiaoIntermediaria => ibgeFetch(`/api/v1/localidades/regioes-intermediarias/${regiaoIntermediaria}/regioes-imediatas`),
        },
        regioesMetropolitanas: {
            todas: params => ibgeFetch('/api/v1/localidades/regioes-metropolitanas', params),
            porId: (id, responseFormat) => ibgeFetch(`/api/v1/localidades/regioes-metropolitanas/${id}`).then(value => {
                if (responseFormat === 'array')
                    return normalizeArray(value);
                if (responseFormat === 'object')
                    return normalizeObject(value, `região metropolitana ${id}`);
                return value;
            }),
            porEstado: uf => ibgeFetch(`/api/v1/localidades/estados/${uf}/regioes-metropolitanas`),
            porRegiao: regiao => ibgeFetch(`/api/v1/localidades/regioes/${regiao}/regioes-metropolitanas`),
        },
        regioesIntegradasDeDesenvolvimento: {
            todas: params => ibgeFetch('/api/v1/localidades/regioes-integradas-de-desenvolvimento', params),
            porId: (id, responseFormat) => ibgeFetch(`/api/v1/localidades/regioes-integradas-de-desenvolvimento/${id}`).then(value => {
                if (responseFormat === 'array')
                    return normalizeArray(value);
                if (responseFormat === 'object')
                    return normalizeObject(value, `região integrada de desenvolvimento ${id}`);
                return value;
            }),
        },
        distritos: {
            todos: params => ibgeFetch('/api/v1/localidades/distritos', params),
            porId: (id, responseFormat) => ibgeFetch(`/api/v1/localidades/distritos/${id}`).then(value => {
                if (responseFormat === 'array')
                    return normalizeArray(value);
                if (responseFormat === 'object')
                    return normalizeObject(value, `distrito ${id}`);
                return value;
            }),
            porMesorregiao: mesorregiao => ibgeFetch(`/api/v1/localidades/mesorregioes/${mesorregiao}/distritos`),
            porMicrorregiao: microrregiao => ibgeFetch(`/api/v1/localidades/microrregioes/${microrregiao}/distritos`),
            porMunicipio: municipio => ibgeFetch(`/api/v1/localidades/municipios/${municipio}/distritos`),
            porRegiaoImediata: regiaoImediata => ibgeFetch(`/api/v1/localidades/regioes-imediatas/${regiaoImediata}/distritos`),
            porRegiaoIntermediaria: regiaoIntermediaria => ibgeFetch(`/api/v1/localidades/regioes-intermediarias/${regiaoIntermediaria}/distritos`),
            porRegiao: regiao => ibgeFetch(`/api/v1/localidades/regioes/${regiao}/distritos`),
            subdistritosPorDistrito: distrito => ibgeFetch(`/api/v1/localidades/distritos/${distrito}/subdistritos`),
        },
        subdistritos: {
            todos: params => ibgeFetch('/api/v1/localidades/subdistritos', params),
            porId: (id, responseFormat) => ibgeFetch(`/api/v1/localidades/subdistritos/${id}`).then(value => {
                if (responseFormat === 'array')
                    return normalizeArray(value);
                if (responseFormat === 'object')
                    return normalizeObject(value, `subdistrito ${id}`);
                return value;
            }),
            porEstado: uf => ibgeFetch(`/api/v1/localidades/estados/${uf}/subdistritos`),
            porMesorregiao: mesorregiao => ibgeFetch(`/api/v1/localidades/mesorregioes/${mesorregiao}/subdistritos`),
            porMicrorregiao: microrregiao => ibgeFetch(`/api/v1/localidades/microrregioes/${microrregiao}/subdistritos`),
            porMunicipio: municipio => ibgeFetch(`/api/v1/localidades/municipios/${municipio}/subdistritos`),
            porRegiaoImediata: regiaoImediata => ibgeFetch(`/api/v1/localidades/regioes-imediatas/${regiaoImediata}/subdistritos`),
            porRegiao: regiao => ibgeFetch(`/api/v1/localidades/regioes/${regiao}/subdistritos`),
        },
        aglomeracoesUrbanas: {
            todas: params => ibgeFetch('/api/v1/localidades/aglomeracoes-urbanas', params),
            porId: (id, responseFormat) => ibgeFetch(`/api/v1/localidades/aglomeracoes-urbanas/${id}`).then(value => {
                if (responseFormat === 'array')
                    return normalizeArray(value);
                if (responseFormat === 'object')
                    return normalizeObject(value, `aglomeração urbana ${id}`);
                return value;
            }),
        },
    };
}
exports.createIbgeApiClient = createIbgeApiClient;
exports.ibgeApi = createIbgeApiClient();
