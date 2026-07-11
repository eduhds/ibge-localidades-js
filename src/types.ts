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
