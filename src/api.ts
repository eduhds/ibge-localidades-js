type QueryParams = Record<string, string | number | boolean | undefined>;

const IBGE_BASE = 'https://servicodados.ibge.gov.br';

async function ibgeFetch<T>(path: string, params?: QueryParams): Promise<T> {
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

  return response.json() as Promise<T>;
}

function normalizeArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}

function normalizeObject<T>(value: T | T[], paramName: string): T {
  if (Array.isArray(value)) {
    if (value.length === 0) {
      throw new Error(`Nenhum resultado encontrado para ${paramName}`);
    }
    if (value.length > 1) {
      throw new Error(
        `Mais de um resultado encontrado para ${paramName}. Use o formato 'array' para múltiplos resultados.`
      );
    }
    return value[0]!;
  }
  return value;
}

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

export function createIbgeApiClient(): IbgeApiClient {
  return {
    paises: {
      todos: params => ibgeFetch<ApiPais[]>('/api/v1/localidades/paises', params),
      porId: (id, responseFormat) =>
        ibgeFetch<ApiPais | ApiPais[]>(`/api/v1/localidades/paises/${id}`).then(value => {
          if (responseFormat === 'array') return normalizeArray(value);
          if (responseFormat === 'object') return normalizeObject(value, `pais ${id}`);
          return value;
        }),
    },
    regioes: {
      todas: params => ibgeFetch<ApiRegiao[]>('/api/v1/localidades/regioes', params),
      porId: (id, responseFormat) =>
        ibgeFetch<ApiRegiao | ApiRegiao[]>(`/api/v1/localidades/regioes/${id}`).then(value => {
          if (responseFormat === 'array') return normalizeArray(value);
          if (responseFormat === 'object') return normalizeObject(value, `região ${id}`);
          return value;
        }),
    },
    estados: {
      todos: params => ibgeFetch<ApiEstados[]>('/api/v1/localidades/estados', params),
      porId: (id, responseFormat) =>
        ibgeFetch<ApiEstados | ApiEstados[]>(`/api/v1/localidades/estados/${id}`).then(value => {
          if (responseFormat === 'array') return normalizeArray(value);
          if (responseFormat === 'object') return normalizeObject(value, `UF ${id}`);
          return value;
        }),
      municipiosPorEstado: uf => ibgeFetch<ApiMunicipio[]>(`/api/v1/localidades/estados/${uf}/municipios`),
      mesorregioesPorEstado: uf => ibgeFetch<ApiMesorregiao[]>(`/api/v1/localidades/estados/${uf}/mesorregioes`),
      microrregioesPorEstado: uf => ibgeFetch<ApiMicrorregiao[]>(`/api/v1/localidades/estados/${uf}/microrregioes`),
      regioesImediatasPorEstado: uf => ibgeFetch<ApiRegiaoImediata[]>(`/api/v1/localidades/estados/${uf}/regioes-imediatas`),
      regioesIntermediariasPorEstado: uf =>
        ibgeFetch<ApiRegiaoIntermediaria[]>(`/api/v1/localidades/estados/${uf}/regioes-intermediarias`),
      regioesMetropolitanasPorEstado: uf =>
        ibgeFetch<ApiRegiaoMetropolitana[]>(`/api/v1/localidades/estados/${uf}/regioes-metropolitanas`),
      distritosPorEstado: uf => ibgeFetch<ApiDistrito[]>(`/api/v1/localidades/estados/${uf}/distritos`),
      subdistritosPorEstado: uf => ibgeFetch<ApiSubdistrito[]>(`/api/v1/localidades/estados/${uf}/subdistritos`),
    },
    municipios: {
      todos: params => ibgeFetch<ApiMunicipio[]>('/api/v1/localidades/municipios', params),
      porId: (id, responseFormat) =>
        ibgeFetch<ApiMunicipio | ApiMunicipio[]>(`/api/v1/localidades/municipios/${id}`).then(value => {
          if (responseFormat === 'array') return normalizeArray(value);
          if (responseFormat === 'object') return normalizeObject(value, `município ${id}`);
          return value;
        }),
      porMesorregiao: mesorregiao => ibgeFetch<ApiMunicipio[]>(`/api/v1/localidades/mesorregioes/${mesorregiao}/municipios`),
      porMicrorregiao: microrregiao => ibgeFetch<ApiMunicipio[]>(`/api/v1/localidades/microrregioes/${microrregiao}/municipios`),
      porRegiaoImediata: regiaoImediata =>
        ibgeFetch<ApiMunicipio[]>(`/api/v1/localidades/regioes-imediatas/${regiaoImediata}/municipios`),
      porRegiaoIntermediaria: regiaoIntermediaria =>
        ibgeFetch<ApiMunicipio[]>(`/api/v1/localidades/regioes-intermediarias/${regiaoIntermediaria}/municipios`),
      porRegiao: regiao => ibgeFetch<ApiMunicipio[]>(`/api/v1/localidades/regioes/${regiao}/municipios`),
      distritosPorMunicipio: municipio =>
        ibgeFetch<ApiDistrito[]>(`/api/v1/localidades/municipios/${municipio}/distritos`),
      subdistritosPorMunicipio: municipio =>
        ibgeFetch<ApiSubdistrito[]>(`/api/v1/localidades/municipios/${municipio}/subdistritos`),
    },
    mesorregioes: {
      todas: params => ibgeFetch<ApiMesorregiao[]>('/api/v1/localidades/mesorregioes', params),
      porId: (id, responseFormat) =>
        ibgeFetch<ApiMesorregiao | ApiMesorregiao[]>(`/api/v1/localidades/mesorregioes/${id}`).then(value => {
          if (responseFormat === 'array') return normalizeArray(value);
          if (responseFormat === 'object') return normalizeObject(value, `mesorregião ${id}`);
          return value;
        }),
      porEstado: uf => ibgeFetch<ApiMesorregiao[]>(`/api/v1/localidades/estados/${uf}/mesorregioes`),
      porRegiao: regiao => ibgeFetch<ApiMesorregiao[]>(`/api/v1/localidades/regioes/${regiao}/mesorregioes`),
      distritosPorMesorregiao: mesorregiao =>
        ibgeFetch<ApiDistrito[]>(`/api/v1/localidades/mesorregioes/${mesorregiao}/distritos`),
      microrregioesPorMesorregiao: mesorregiao =>
        ibgeFetch<ApiMicrorregiao[]>(`/api/v1/localidades/mesorregioes/${mesorregiao}/microrregioes`),
      municipiosPorMesorregiao: mesorregiao =>
        ibgeFetch<ApiMunicipio[]>(`/api/v1/localidades/mesorregioes/${mesorregiao}/municipios`),
      subdistritosPorMesorregiao: mesorregiao =>
        ibgeFetch<ApiSubdistrito[]>(`/api/v1/localidades/mesorregioes/${mesorregiao}/subdistritos`),
    },
    microrregioes: {
      todas: params => ibgeFetch<ApiMicrorregiao[]>('/api/v1/localidades/microrregioes', params),
      porId: (id, responseFormat) =>
        ibgeFetch<ApiMicrorregiao | ApiMicrorregiao[]>(`/api/v1/localidades/microrregioes/${id}`).then(value => {
          if (responseFormat === 'array') return normalizeArray(value);
          if (responseFormat === 'object') return normalizeObject(value, `microrregião ${id}`);
          return value;
        }),
      porEstado: uf => ibgeFetch<ApiMicrorregiao[]>(`/api/v1/localidades/estados/${uf}/microrregioes`),
      porMesorregiao: mesorregiao =>
        ibgeFetch<ApiMicrorregiao[]>(`/api/v1/localidades/mesorregioes/${mesorregiao}/microrregioes`),
      porRegiao: regiao => ibgeFetch<ApiMicrorregiao[]>(`/api/v1/localidades/regioes/${regiao}/microrregioes`),
      distritosPorMicrorregiao: microrregiao =>
        ibgeFetch<ApiDistrito[]>(`/api/v1/localidades/microrregioes/${microrregiao}/distritos`),
      municipiosPorMicrorregiao: microrregiao =>
        ibgeFetch<ApiMunicipio[]>(`/api/v1/localidades/microrregioes/${microrregiao}/municipios`),
      subdistritosPorMicrorregiao: microrregiao =>
        ibgeFetch<ApiSubdistrito[]>(`/api/v1/localidades/microrregioes/${microrregiao}/subdistritos`),
    },
    regioesImediatas: {
      todas: params => ibgeFetch<ApiRegiaoImediata[]>('/api/v1/localidades/regioes-imediatas', params),
      porId: (id, responseFormat) =>
        ibgeFetch<ApiRegiaoImediata | ApiRegiaoImediata[]>(`/api/v1/localidades/regioes-imediatas/${id}`).then(value => {
          if (responseFormat === 'array') return normalizeArray(value);
          if (responseFormat === 'object') return normalizeObject(value, `região imediata ${id}`);
          return value;
        }),
      porEstado: uf => ibgeFetch<ApiRegiaoImediata[]>(`/api/v1/localidades/estados/${uf}/regioes-imediatas`),
      porRegiaoIntermediaria: regiaoIntermediaria =>
        ibgeFetch<ApiRegiaoImediata[]>(
          `/api/v1/localidades/regioes-intermediarias/${regiaoIntermediaria}/regioes-imediatas`
        ),
      porRegiao: regiao => ibgeFetch<ApiRegiaoImediata[]>(`/api/v1/localidades/regioes/${regiao}/regioes-imediatas`),
      distritosPorRegiaoImediata: regiaoImediata =>
        ibgeFetch<ApiDistrito[]>(`/api/v1/localidades/regioes-imediatas/${regiaoImediata}/distritos`),
      municipiosPorRegiaoImediata: regiaoImediata =>
        ibgeFetch<ApiMunicipio[]>(`/api/v1/localidades/regioes-imediatas/${regiaoImediata}/municipios`),
      subdistritosPorRegiaoImediata: regiaoImediata =>
        ibgeFetch<ApiSubdistrito[]>(`/api/v1/localidades/regioes-imediatas/${regiaoImediata}/subdistritos`),
    },
    regioesIntermediarias: {
      todas: params => ibgeFetch<ApiRegiaoIntermediaria[]>('/api/v1/localidades/regioes-intermediarias', params),
      porId: (id, responseFormat) =>
        ibgeFetch<ApiRegiaoIntermediaria | ApiRegiaoIntermediaria[]>(
          `/api/v1/localidades/regioes-intermediarias/${id}`
        ).then(value => {
          if (responseFormat === 'array') return normalizeArray(value);
          if (responseFormat === 'object') return normalizeObject(value, `região intermediária ${id}`);
          return value;
        }),
      porEstado: uf => ibgeFetch<ApiRegiaoIntermediaria[]>(`/api/v1/localidades/estados/${uf}/regioes-intermediarias`),
      porRegiao: regiao =>
        ibgeFetch<ApiRegiaoIntermediaria[]>(`/api/v1/localidades/regioes/${regiao}/regioes-intermediarias`),
      regioesImediatasPorRegiaoIntermediaria: regiaoIntermediaria =>
        ibgeFetch<ApiRegiaoImediata[]>(
          `/api/v1/localidades/regioes-intermediarias/${regiaoIntermediaria}/regioes-imediatas`
        ),
    },
    regioesMetropolitanas: {
      todas: params => ibgeFetch<ApiRegiaoMetropolitana[]>('/api/v1/localidades/regioes-metropolitanas', params),
      porId: (id, responseFormat) =>
        ibgeFetch<ApiRegiaoMetropolitana | ApiRegiaoMetropolitana[]>(
          `/api/v1/localidades/regioes-metropolitanas/${id}`
        ).then(value => {
          if (responseFormat === 'array') return normalizeArray(value);
          if (responseFormat === 'object') return normalizeObject(value, `região metropolitana ${id}`);
          return value;
        }),
      porEstado: uf => ibgeFetch<ApiRegiaoMetropolitana[]>(`/api/v1/localidades/estados/${uf}/regioes-metropolitanas`),
      porRegiao: regiao =>
        ibgeFetch<ApiRegiaoMetropolitana[]>(`/api/v1/localidades/regioes/${regiao}/regioes-metropolitanas`),
    },
    regioesIntegradasDeDesenvolvimento: {
      todas: params => ibgeFetch<ApiRegiaoIntegrada[]>('/api/v1/localidades/regioes-integradas-de-desenvolvimento', params),
      porId: (id, responseFormat) =>
        ibgeFetch<ApiRegiaoIntegrada | ApiRegiaoIntegrada[]>(
          `/api/v1/localidades/regioes-integradas-de-desenvolvimento/${id}`
        ).then(value => {
          if (responseFormat === 'array') return normalizeArray(value);
          if (responseFormat === 'object')
            return normalizeObject(value, `região integrada de desenvolvimento ${id}`);
          return value;
        }),
    },
    distritos: {
      todos: params => ibgeFetch<ApiDistrito[]>('/api/v1/localidades/distritos', params),
      porId: (id, responseFormat) =>
        ibgeFetch<ApiDistrito | ApiDistrito[]>(`/api/v1/localidades/distritos/${id}`).then(value => {
          if (responseFormat === 'array') return normalizeArray(value);
          if (responseFormat === 'object') return normalizeObject(value, `distrito ${id}`);
          return value;
        }),
      porMesorregiao: mesorregiao =>
        ibgeFetch<ApiDistrito[]>(`/api/v1/localidades/mesorregioes/${mesorregiao}/distritos`),
      porMicrorregiao: microrregiao =>
        ibgeFetch<ApiDistrito[]>(`/api/v1/localidades/microrregioes/${microrregiao}/distritos`),
      porMunicipio: municipio => ibgeFetch<ApiDistrito[]>(`/api/v1/localidades/municipios/${municipio}/distritos`),
      porRegiaoImediata: regiaoImediata =>
        ibgeFetch<ApiDistrito[]>(`/api/v1/localidades/regioes-imediatas/${regiaoImediata}/distritos`),
      porRegiaoIntermediaria: regiaoIntermediaria =>
        ibgeFetch<ApiDistrito[]>(`/api/v1/localidades/regioes-intermediarias/${regiaoIntermediaria}/distritos`),
      porRegiao: regiao => ibgeFetch<ApiDistrito[]>(`/api/v1/localidades/regioes/${regiao}/distritos`),
      subdistritosPorDistrito: distrito =>
        ibgeFetch<ApiSubdistrito[]>(`/api/v1/localidades/distritos/${distrito}/subdistritos`),
    },
    subdistritos: {
      todos: params => ibgeFetch<ApiSubdistrito[]>('/api/v1/localidades/subdistritos', params),
      porId: (id, responseFormat) =>
        ibgeFetch<ApiSubdistrito | ApiSubdistrito[]>(`/api/v1/localidades/subdistritos/${id}`).then(value => {
          if (responseFormat === 'array') return normalizeArray(value);
          if (responseFormat === 'object') return normalizeObject(value, `subdistrito ${id}`);
          return value;
        }),
      porEstado: uf => ibgeFetch<ApiSubdistrito[]>(`/api/v1/localidades/estados/${uf}/subdistritos`),
      porMesorregiao: mesorregiao =>
        ibgeFetch<ApiSubdistrito[]>(`/api/v1/localidades/mesorregioes/${mesorregiao}/subdistritos`),
      porMicrorregiao: microrregiao =>
        ibgeFetch<ApiSubdistrito[]>(`/api/v1/localidades/microrregioes/${microrregiao}/subdistritos`),
      porMunicipio: municipio =>
        ibgeFetch<ApiSubdistrito[]>(`/api/v1/localidades/municipios/${municipio}/subdistritos`),
      porRegiaoImediata: regiaoImediata =>
        ibgeFetch<ApiSubdistrito[]>(`/api/v1/localidades/regioes-imediatas/${regiaoImediata}/subdistritos`),
      porRegiao: regiao => ibgeFetch<ApiSubdistrito[]>(`/api/v1/localidades/regioes/${regiao}/subdistritos`),
    },
    aglomeracoesUrbanas: {
      todas: params => ibgeFetch<ApiAglomeracaoUrbana[]>('/api/v1/localidades/aglomeracoes-urbanas', params),
      porId: (id, responseFormat) =>
        ibgeFetch<ApiAglomeracaoUrbana | ApiAglomeracaoUrbana[]>(
          `/api/v1/localidades/aglomeracoes-urbanas/${id}`
        ).then(value => {
          if (responseFormat === 'array') return normalizeArray(value);
          if (responseFormat === 'object')
            return normalizeObject(value, `aglomeração urbana ${id}`);
          return value;
        }),
    },
  };
}

export const ibgeApi = createIbgeApiClient();
