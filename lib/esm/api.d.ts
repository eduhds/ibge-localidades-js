type QueryParams = Record<string, string | number | boolean | undefined>;
export type ResponseFormat = 'array' | 'object';
export type ApiEstados = {
    id: number;
    sigla: string;
    nome: string;
    regiao: {
        id: number;
        sigla: string;
        nome: string;
    };
};
export type ApiMunicipio = {
    id: number;
    nome: string;
    microrregiao: {
        id: number;
        nome: string;
        mesorregiao: {
            id: number;
            nome: string;
            UF: ApiEstados;
        };
    };
    'regiao-imediata': {
        id: number;
        nome: string;
        'regiao-intermediaria': {
            id: number;
            nome: string;
            UF: ApiEstados;
        };
    };
};
export type ApiMesorregiao = {
    id: number;
    nome: string;
    UF: ApiEstados;
};
export type ApiMicrorregiao = {
    id: number;
    nome: string;
    mesorregiao: {
        id: number;
        nome: string;
        UF: ApiEstados;
    };
};
export type ApiRegiao = {
    id: number;
    sigla: string;
    nome: string;
};
export type ApiRegiaoImediata = {
    id: number;
    nome: string;
    'regiao-intermediaria': {
        id: number;
        nome: string;
        UF: ApiEstados;
    };
};
export type ApiRegiaoIntermediaria = {
    id: number;
    nome: string;
    UF: ApiEstados;
};
export type ApiRegiaoMetropolitana = {
    id: number;
    nome: string;
    UF: ApiEstados;
};
export type ApiRegiaoIntegrada = {
    id: number;
    nome: string;
    UF: ApiEstados;
};
export type ApiDistrito = {
    id: number;
    nome: string;
    municipio: {
        id: number;
        nome: string;
        microrregiao: ApiMicrorregiao;
        'regiao-imediata': {
            nome: string;
            'regiao-intermediaria': {
                nome: string;
                UF: ApiEstados;
            };
        };
    };
};
export type ApiSubdistrito = {
    id: number;
    nome: string;
    distrito: {
        id: number;
        nome: string;
    };
};
export type ApiAglomeracaoUrbana = {
    id: number;
    nome: string;
};
export type ApiPais = {
    id: string;
    nome: {
        abreviado: string;
    };
};
export type IbgeApiClient = {
    paises: {
        todos: (params?: QueryParams) => Promise<ApiPais[]>;
        porId: (id: string | number, responseFormat?: ResponseFormat) => Promise<ApiPais | ApiPais[]>;
    };
    regioes: {
        todas: (params?: QueryParams) => Promise<ApiRegiao[]>;
        porId: (id: string | number, responseFormat?: ResponseFormat) => Promise<ApiRegiao | ApiRegiao[]>;
    };
    estados: {
        todos: (params?: QueryParams) => Promise<ApiEstados[]>;
        porId: (id: string | number, responseFormat?: ResponseFormat) => Promise<ApiEstados | ApiEstados[]>;
        municipiosPorEstado: (uf: string | number) => Promise<ApiMunicipio[]>;
        mesorregioesPorEstado: (uf: string | number) => Promise<ApiMesorregiao[]>;
        microrregioesPorEstado: (uf: string | number) => Promise<ApiMicrorregiao[]>;
        regioesImediatasPorEstado: (uf: string | number) => Promise<ApiRegiaoImediata[]>;
        regioesIntermediariasPorEstado: (uf: string | number) => Promise<ApiRegiaoIntermediaria[]>;
        regioesMetropolitanasPorEstado: (uf: string | number) => Promise<ApiRegiaoMetropolitana[]>;
        distritosPorEstado: (uf: string | number) => Promise<ApiDistrito[]>;
        subdistritosPorEstado: (uf: string | number) => Promise<ApiSubdistrito[]>;
    };
    municipios: {
        todos: (params?: QueryParams) => Promise<ApiMunicipio[]>;
        porId: (id: string | number, responseFormat?: ResponseFormat) => Promise<ApiMunicipio | ApiMunicipio[]>;
        porMesorregiao: (mesorregiao: string | number) => Promise<ApiMunicipio[]>;
        porMicrorregiao: (microrregiao: string | number) => Promise<ApiMunicipio[]>;
        porRegiaoImediata: (regiaoImediata: string | number) => Promise<ApiMunicipio[]>;
        porRegiaoIntermediaria: (regiaoIntermediaria: string | number) => Promise<ApiMunicipio[]>;
        porRegiao: (regiao: string | number) => Promise<ApiMunicipio[]>;
        distritosPorMunicipio: (municipio: string | number) => Promise<ApiDistrito[]>;
        subdistritosPorMunicipio: (municipio: string | number) => Promise<ApiSubdistrito[]>;
    };
    mesorregioes: {
        todas: (params?: QueryParams) => Promise<ApiMesorregiao[]>;
        porId: (id: string | number, responseFormat?: ResponseFormat) => Promise<ApiMesorregiao | ApiMesorregiao[]>;
        porEstado: (uf: string | number) => Promise<ApiMesorregiao[]>;
        porRegiao: (regiao: string | number) => Promise<ApiMesorregiao[]>;
        distritosPorMesorregiao: (mesorregiao: string | number) => Promise<ApiDistrito[]>;
        microrregioesPorMesorregiao: (mesorregiao: string | number) => Promise<ApiMicrorregiao[]>;
        municipiosPorMesorregiao: (mesorregiao: string | number) => Promise<ApiMunicipio[]>;
        subdistritosPorMesorregiao: (mesorregiao: string | number) => Promise<ApiSubdistrito[]>;
    };
    microrregioes: {
        todas: (params?: QueryParams) => Promise<ApiMicrorregiao[]>;
        porId: (id: string | number, responseFormat?: ResponseFormat) => Promise<ApiMicrorregiao | ApiMicrorregiao[]>;
        porEstado: (uf: string | number) => Promise<ApiMicrorregiao[]>;
        porMesorregiao: (mesorregiao: string | number) => Promise<ApiMicrorregiao[]>;
        porRegiao: (regiao: string | number) => Promise<ApiMicrorregiao[]>;
        distritosPorMicrorregiao: (microrregiao: string | number) => Promise<ApiDistrito[]>;
        municipiosPorMicrorregiao: (microrregiao: string | number) => Promise<ApiMunicipio[]>;
        subdistritosPorMicrorregiao: (microrregiao: string | number) => Promise<ApiSubdistrito[]>;
    };
    regioesImediatas: {
        todas: (params?: QueryParams) => Promise<ApiRegiaoImediata[]>;
        porId: (id: string | number, responseFormat?: ResponseFormat) => Promise<ApiRegiaoImediata | ApiRegiaoImediata[]>;
        porEstado: (uf: string | number) => Promise<ApiRegiaoImediata[]>;
        porRegiaoIntermediaria: (regiaoIntermediaria: string | number) => Promise<ApiRegiaoImediata[]>;
        porRegiao: (regiao: string | number) => Promise<ApiRegiaoImediata[]>;
        distritosPorRegiaoImediata: (regiaoImediata: string | number) => Promise<ApiDistrito[]>;
        municipiosPorRegiaoImediata: (regiaoImediata: string | number) => Promise<ApiMunicipio[]>;
        subdistritosPorRegiaoImediata: (regiaoImediata: string | number) => Promise<ApiSubdistrito[]>;
    };
    regioesIntermediarias: {
        todas: (params?: QueryParams) => Promise<ApiRegiaoIntermediaria[]>;
        porId: (id: string | number, responseFormat?: ResponseFormat) => Promise<ApiRegiaoIntermediaria | ApiRegiaoIntermediaria[]>;
        porEstado: (uf: string | number) => Promise<ApiRegiaoIntermediaria[]>;
        porRegiao: (regiao: string | number) => Promise<ApiRegiaoIntermediaria[]>;
        regioesImediatasPorRegiaoIntermediaria: (regiaoIntermediaria: string | number) => Promise<ApiRegiaoImediata[]>;
    };
    regioesMetropolitanas: {
        todas: (params?: QueryParams) => Promise<ApiRegiaoMetropolitana[]>;
        porId: (id: string | number, responseFormat?: ResponseFormat) => Promise<ApiRegiaoMetropolitana | ApiRegiaoMetropolitana[]>;
        porEstado: (uf: string | number) => Promise<ApiRegiaoMetropolitana[]>;
        porRegiao: (regiao: string | number) => Promise<ApiRegiaoMetropolitana[]>;
    };
    regioesIntegradasDeDesenvolvimento: {
        todas: (params?: QueryParams) => Promise<ApiRegiaoIntegrada[]>;
        porId: (id: string | number, responseFormat?: ResponseFormat) => Promise<ApiRegiaoIntegrada | ApiRegiaoIntegrada[]>;
    };
    distritos: {
        todos: (params?: QueryParams) => Promise<ApiDistrito[]>;
        porId: (id: string | number, responseFormat?: ResponseFormat) => Promise<ApiDistrito | ApiDistrito[]>;
        porMesorregiao: (mesorregiao: string | number) => Promise<ApiDistrito[]>;
        porMicrorregiao: (microrregiao: string | number) => Promise<ApiDistrito[]>;
        porMunicipio: (municipio: string | number) => Promise<ApiDistrito[]>;
        porRegiaoImediata: (regiaoImediata: string | number) => Promise<ApiDistrito[]>;
        porRegiaoIntermediaria: (regiaoIntermediaria: string | number) => Promise<ApiDistrito[]>;
        porRegiao: (regiao: string | number) => Promise<ApiDistrito[]>;
        subdistritosPorDistrito: (distrito: string | number) => Promise<ApiSubdistrito[]>;
    };
    subdistritos: {
        todos: (params?: QueryParams) => Promise<ApiSubdistrito[]>;
        porId: (id: string | number, responseFormat?: ResponseFormat) => Promise<ApiSubdistrito | ApiSubdistrito[]>;
        porEstado: (uf: string | number) => Promise<ApiSubdistrito[]>;
        porMesorregiao: (mesorregiao: string | number) => Promise<ApiSubdistrito[]>;
        porMicrorregiao: (microrregiao: string | number) => Promise<ApiSubdistrito[]>;
        porMunicipio: (municipio: string | number) => Promise<ApiSubdistrito[]>;
        porRegiaoImediata: (regiaoImediata: string | number) => Promise<ApiSubdistrito[]>;
        porRegiao: (regiao: string | number) => Promise<ApiSubdistrito[]>;
    };
    aglomeracoesUrbanas: {
        todas: (params?: QueryParams) => Promise<ApiAglomeracaoUrbana[]>;
        porId: (id: string | number, responseFormat?: ResponseFormat) => Promise<ApiAglomeracaoUrbana | ApiAglomeracaoUrbana[]>;
    };
};
export declare function createIbgeApiClient(): IbgeApiClient;
export declare const ibgeApi: IbgeApiClient;
export {};
