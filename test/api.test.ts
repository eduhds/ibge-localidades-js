const originalFetch = globalThis.fetch;
const fetchSpy = jest.spyOn(globalThis, 'fetch');

beforeEach(() => {
  fetchSpy.mockReset();
  fetchSpy.mockResolvedValue(
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([]),
    } as Response)
  );
});

afterAll(() => {
  fetchSpy.mockRestore();
});

const paisesMock = [{ id: '076', nome: { abreviado: 'Brasil' } }];
const regioesMock = [{ id: 1, sigla: 'N', nome: 'Norte' }];
const ufMock = {
  id: 11,
  sigla: 'RO',
  nome: 'Rondônia',
  regiao: { id: 1, sigla: 'N', nome: 'Norte' },
};
const estadosMock = [ufMock];
const municipioMock = {
  id: 1100015,
  nome: 'Alta Floresta D Oeste',
  microrregiao: {
    id: 11001,
    nome: 'Cacoal',
    mesorregiao: {
      id: 1101,
      nome: 'Rondônia',
      UF: ufMock,
    },
  },
  'regiao-imediata': {
    id: 110001,
    nome: 'Alta Floresta D Oeste',
    'regiao-intermediaria': {
      id: 1101,
      nome: 'Rondônia',
      UF: ufMock,
    },
  },
};
const mesorregiaoMock = {
  id: 1101,
  nome: 'Rondônia',
  UF: ufMock,
};
const microrregiaoMock = {
  id: 11001,
  nome: 'Cacoal',
  mesorregiao: mesorregiaoMock,
};
const regiaoImediataMock = {
  id: 110001,
  nome: 'Alta Floresta D Oeste',
  'regiao-intermediaria': {
    id: 1101,
    nome: 'Rondônia',
    UF: ufMock,
  },
};
const regiaoIntermediariaMock = {
  id: 1101,
  nome: 'Rondônia',
  UF: ufMock,
};
const regiaoMetropolitanaMock = {
  id: 1,
  nome: 'Região Metropolitana',
  UF: ufMock,
};
const regiaoIntegradaMock = {
  id: 1,
  nome: 'Região Integrada',
  UF: ufMock,
};
const distritoMock = {
  id: 1,
  nome: 'Distrito Teste',
  municipio: {
    id: 1100015,
    nome: 'Alta Floresta D Oeste',
    microrregiao: microrregiaoMock,
    'regiao-imediata': {
      nome: 'Alta Floresta D Oeste',
      'regiao-intermediaria': {
        nome: 'Rondônia',
        UF: ufMock,
      },
    },
  },
};
const subdistritoMock = {
  id: 1,
  nome: 'Subdistrito Teste',
  distrito: {
    id: 1,
    nome: 'Distrito Teste',
  },
};
const aglomeracaoUrbanaMock = {
  id: 1,
  nome: 'Aglomeração Urbana Teste',
};

const buildUrl = (path: string, query = ''): string => {
  return `https://servicodados.ibge.gov.br/api/v1/localidades${path}${query}`;
};

const mockJson = (data: unknown) => {
  const json = jest.fn(() => Promise.resolve(data));
  return Promise.resolve({
    ok: true,
    json,
  } as Response);
};

const mockError = (status = 500) => {
  const text = jest.fn(() => Promise.resolve('error'));
  return Promise.resolve({
    ok: false,
    status,
    statusText: 'Internal Server Error',
    text,
  } as Response);
};

import { createIbgeApiClient, ibgeApi } from '../src/api';

describe('API IBGE', () => {
  test('createIbgeApiClient retorna cliente com promises', () => {
    const client = createIbgeApiClient();
    expect(client).toBeDefined();
    expect(client.paises.todos()).toBeInstanceOf(Promise);
  });

  describe('resposta padrão', () => {
    test('retorna valor cru da API sem normalização', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson(paisesMock));

      const result = await ibgeApi.paises.todos();

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/paises'));
      expect(result).toEqual(paisesMock);
    });

    test('usa response format array quando informado', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson(regioesMock));

      const result = await ibgeApi.regioes.porId(1, 'array');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/regioes/1'));
      expect(result).toEqual(regioesMock);
    });

    test('normaliza objeto único quando response format é object', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson(regioesMock));

      const result = await ibgeApi.regioes.porId(1, 'object');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/regioes/1'));
      expect(result).toEqual(regioesMock[0]);
    });

    test('propaga erro quando a API retorna status não 200', async () => {
      fetchSpy.mockResolvedValueOnce(await mockError(404));

      await expect(ibgeApi.paises.todos()).rejects.toThrow('IBGE API error');
    });
  });

  describe('normalização response format', () => {
    test('porId com array retorna array direto', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson(regioesMock));

      const result = await ibgeApi.regioes.porId(1, 'array');

      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(1);
    });

    test('porId com object retorna primeiro elemento quando array', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson(regioesMock));

      const result = await ibgeApi.regioes.porId(1, 'object');

      expect(result).not.toBeInstanceOf(Array);
      expect(result).toEqual(regioesMock[0]);
    });

    test('retorna valor cru quando nenhum format informado', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson(regioesMock));

      const result = await ibgeApi.regioes.porId(1);

      expect(result).toEqual(regioesMock);
    });
  });

  describe('query params opcionais', () => {
    test('nenhuma query param quando params vazio', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson(paisesMock));

      await ibgeApi.paises.todos();

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/paises'));
    });

    test('query param lang é enviado quando fornecido', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson(paisesMock));

      await ibgeApi.paises.todos({ lang: 'en' });

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/paises', '?lang=en'));
    });

    test('query param view é enviado quando fornecido', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson(estadosMock));

      await ibgeApi.estados.todos({ view: 'perfil' });

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/estados', '?view=perfil'));
    });
  });

  describe('paises', () => {
    test('todos retorna array de países', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson(paisesMock));

      const result = await ibgeApi.paises.todos();

      expect(result).toEqual(paisesMock);
    });

    test('porId sem format retorna array', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson(paisesMock));

      const result = await ibgeApi.paises.porId('076');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/paises/076'));
      expect(result).toEqual(paisesMock);
    });

    test('porId com number retorna array', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson(paisesMock));

      const result = await ibgeApi.paises.porId(76);

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/paises/76'));
      expect(result).toEqual(paisesMock);
    });
  });

  describe('regioes', () => {
    test('todas retorna array de regiões', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson(regioesMock));

      const result = await ibgeApi.regioes.todas();

      expect(result).toEqual(regioesMock);
    });

    test('porId retorna array cru', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson(regioesMock));

      const result = await ibgeApi.regioes.porId(1);

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/regioes/1'));
      expect(result).toEqual(regioesMock);
    });
  });

  describe('estados', () => {
    test('todos retorna array de estados', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([ufMock]));

      const result = await ibgeApi.estados.todos();

      expect(result).toEqual([ufMock]);
    });

    test('porId retorna array cru', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([ufMock]));

      const result = await ibgeApi.estados.porId('11');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/estados/11'));
      expect(result).toEqual([ufMock]);
    });

    test('municipiosPorEstado retorna array de municípios', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([municipioMock]));

      const result = await ibgeApi.estados.municipiosPorEstado('11');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/estados/11/municipios'));
      expect(result).toEqual([municipioMock]);
    });

    test('mesorregioesPorEstado retorna array', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([mesorregiaoMock]));

      const result = await ibgeApi.estados.mesorregioesPorEstado('11');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/estados/11/mesorregioes'));
      expect(result).toEqual([mesorregiaoMock]);
    });

    test('microrregioesPorEstado retorna array', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([microrregiaoMock]));

      const result = await ibgeApi.estados.microrregioesPorEstado('11');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/estados/11/microrregioes'));
      expect(result).toEqual([microrregiaoMock]);
    });

    test('regioesImediatasPorEstado retorna array', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([regiaoImediataMock]));

      const result = await ibgeApi.estados.regioesImediatasPorEstado('11');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/estados/11/regioes-imediatas'));
      expect(result).toEqual([regiaoImediataMock]);
    });

    test('regioesIntermediariasPorEstado retorna array', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([regiaoIntermediariaMock]));

      const result = await ibgeApi.estados.regioesIntermediariasPorEstado('11');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/estados/11/regioes-intermediarias'));
      expect(result).toEqual([regiaoIntermediariaMock]);
    });

    test('regioesMetropolitanasPorEstado retorna array', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([regiaoMetropolitanaMock]));

      const result = await ibgeApi.estados.regioesMetropolitanasPorEstado('11');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/estados/11/regioes-metropolitanas'));
      expect(result).toEqual([regiaoMetropolitanaMock]);
    });

    test('distritosPorEstado retorna array', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([distritoMock]));

      const result = await ibgeApi.estados.distritosPorEstado('11');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/estados/11/distritos'));
      expect(result).toEqual([distritoMock]);
    });

    test('subdistritosPorEstado retorna array', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([subdistritoMock]));

      const result = await ibgeApi.estados.subdistritosPorEstado('11');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/estados/11/subdistritos'));
      expect(result).toEqual([subdistritoMock]);
    });
  });

  describe('municipios', () => {
    test('todos retorna array de municípios', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([municipioMock]));

      const result = await ibgeApi.municipios.todos();

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/municipios'));
      expect(result).toEqual([municipioMock]);
    });

    test('porId retorna array cru', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([municipioMock]));

      const result = await ibgeApi.municipios.porId('1100015');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/municipios/1100015'));
      expect(result).toEqual([municipioMock]);
    });

    test('porMesorregiao retorna array de municípios', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([municipioMock]));

      const result = await ibgeApi.municipios.porMesorregiao('1101');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/mesorregioes/1101/municipios'));
      expect(result).toEqual([municipioMock]);
    });

    test('porMicrorregiao retorna array de municípios', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([municipioMock]));

      const result = await ibgeApi.municipios.porMicrorregiao('11001');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/microrregioes/11001/municipios'));
      expect(result).toEqual([municipioMock]);
    });

    test('porRegiaoImediata retorna array de municípios', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([municipioMock]));

      const result = await ibgeApi.municipios.porRegiaoImediata('110001');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/regioes-imediatas/110001/municipios'));
      expect(result).toEqual([municipioMock]);
    });

    test('porRegiaoIntermediaria retorna array de municípios', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([municipioMock]));

      const result = await ibgeApi.municipios.porRegiaoIntermediaria('1101');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/regioes-intermediarias/1101/municipios'));
      expect(result).toEqual([municipioMock]);
    });

    test('porRegiao retorna array de municípios', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([municipioMock]));

      const result = await ibgeApi.municipios.porRegiao('1');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/regioes/1/municipios'));
      expect(result).toEqual([municipioMock]);
    });

    test('distritosPorMunicipio retorna array de distritos', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([distritoMock]));

      const result = await ibgeApi.municipios.distritosPorMunicipio('1100015');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/municipios/1100015/distritos'));
      expect(result).toEqual([distritoMock]);
    });

    test('subdistritosPorMunicipio retorna array de subdistritos', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([subdistritoMock]));

      const result = await ibgeApi.municipios.subdistritosPorMunicipio('1100015');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/municipios/1100015/subdistritos'));
      expect(result).toEqual([subdistritoMock]);
    });
  });

  describe('mesorregioes', () => {
    test('todas retorna array de mesorregiões', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([mesorregiaoMock]));

      const result = await ibgeApi.mesorregioes.todas();

      expect(result).toEqual([mesorregiaoMock]);
    });

    test('porId retorna array cru', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([mesorregiaoMock]));

      const result = await ibgeApi.mesorregioes.porId('1101');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/mesorregioes/1101'));
      expect(result).toEqual([mesorregiaoMock]);
    });

    test('porEstado retorna array de mesorregiões', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([mesorregiaoMock]));

      const result = await ibgeApi.mesorregioes.porEstado('11');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/estados/11/mesorregioes'));
      expect(result).toEqual([mesorregiaoMock]);
    });

    test('porRegiao retorna array de mesorregiões', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([mesorregiaoMock]));

      const result = await ibgeApi.mesorregioes.porRegiao('1');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/regioes/1/mesorregioes'));
      expect(result).toEqual([mesorregiaoMock]);
    });

    test('distritosPorMesorregiao retorna array', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([distritoMock]));

      const result = await ibgeApi.mesorregioes.distritosPorMesorregiao('1101');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/mesorregioes/1101/distritos'));
      expect(result).toEqual([distritoMock]);
    });

    test('microrregioesPorMesorregiao retorna array', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([microrregiaoMock]));

      const result = await ibgeApi.mesorregioes.microrregioesPorMesorregiao('1101');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/mesorregioes/1101/microrregioes'));
      expect(result).toEqual([microrregiaoMock]);
    });

    test('municipiosPorMesorregiao retorna array', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([municipioMock]));

      const result = await ibgeApi.mesorregioes.municipiosPorMesorregiao('1101');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/mesorregioes/1101/municipios'));
      expect(result).toEqual([municipioMock]);
    });

    test('subdistritosPorMesorregiao retorna array', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([subdistritoMock]));

      const result = await ibgeApi.mesorregioes.subdistritosPorMesorregiao('1101');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/mesorregioes/1101/subdistritos'));
      expect(result).toEqual([subdistritoMock]);
    });
  });

  describe('microrregioes', () => {
    test('todas retorna array de microrregiões', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([microrregiaoMock]));

      const result = await ibgeApi.microrregioes.todas();

      expect(result).toEqual([microrregiaoMock]);
    });

    test('porId retorna array cru', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([microrregiaoMock]));

      const result = await ibgeApi.microrregioes.porId('11001');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/microrregioes/11001'));
      expect(result).toEqual([microrregiaoMock]);
    });

    test('porEstado retorna array', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([microrregiaoMock]));

      const result = await ibgeApi.microrregioes.porEstado('11');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/estados/11/microrregioes'));
      expect(result).toEqual([microrregiaoMock]);
    });

    test('porMesorregiao retorna array', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([microrregiaoMock]));

      const result = await ibgeApi.microrregioes.porMesorregiao('1101');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/mesorregioes/1101/microrregioes'));
      expect(result).toEqual([microrregiaoMock]);
    });

    test('porRegiao retorna array', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([microrregiaoMock]));

      const result = await ibgeApi.microrregioes.porRegiao('1');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/regioes/1/microrregioes'));
      expect(result).toEqual([microrregiaoMock]);
    });

    test('distritosPorMicrorregiao retorna array', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([distritoMock]));

      const result = await ibgeApi.microrregioes.distritosPorMicrorregiao('11001');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/microrregioes/11001/distritos'));
      expect(result).toEqual([distritoMock]);
    });

    test('municipiosPorMicrorregiao retorna array', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([municipioMock]));

      const result = await ibgeApi.microrregioes.municipiosPorMicrorregiao('11001');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/microrregioes/11001/municipios'));
      expect(result).toEqual([municipioMock]);
    });

    test('subdistritosPorMicrorregiao retorna array', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([subdistritoMock]));

      const result = await ibgeApi.microrregioes.subdistritosPorMicrorregiao('11001');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/microrregioes/11001/subdistritos'));
      expect(result).toEqual([subdistritoMock]);
    });
  });

  describe('regioesImediatas', () => {
    test('todas retorna array', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([regiaoImediataMock]));

      const result = await ibgeApi.regioesImediatas.todas();

      expect(result).toEqual([regiaoImediataMock]);
    });

    test('porId retorna array cru', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([regiaoImediataMock]));

      const result = await ibgeApi.regioesImediatas.porId('110001');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/regioes-imediatas/110001'));
      expect(result).toEqual([regiaoImediataMock]);
    });

    test('porEstado retorna array', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([regiaoImediataMock]));

      const result = await ibgeApi.regioesImediatas.porEstado('11');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/estados/11/regioes-imediatas'));
      expect(result).toEqual([regiaoImediataMock]);
    });

    test('porRegiaoIntermediaria retorna array', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([regiaoImediataMock]));

      const result = await ibgeApi.regioesImediatas.porRegiaoIntermediaria('1101');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/regioes-intermediarias/1101/regioes-imediatas'));
      expect(result).toEqual([regiaoImediataMock]);
    });

    test('porRegiao retorna array', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([regiaoImediataMock]));

      const result = await ibgeApi.regioesImediatas.porRegiao('1');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/regioes/1/regioes-imediatas'));
      expect(result).toEqual([regiaoImediataMock]);
    });

    test('distritosPorRegiaoImediata retorna array', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([distritoMock]));

      const result = await ibgeApi.regioesImediatas.distritosPorRegiaoImediata('110001');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/regioes-imediatas/110001/distritos'));
      expect(result).toEqual([distritoMock]);
    });

    test('municipiosPorRegiaoImediata retorna array', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([municipioMock]));

      const result = await ibgeApi.regioesImediatas.municipiosPorRegiaoImediata('110001');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/regioes-imediatas/110001/municipios'));
      expect(result).toEqual([municipioMock]);
    });

    test('subdistritosPorRegiaoImediata retorna array', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([subdistritoMock]));

      const result = await ibgeApi.regioesImediatas.subdistritosPorRegiaoImediata('110001');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/regioes-imediatas/110001/subdistritos'));
      expect(result).toEqual([subdistritoMock]);
    });
  });

  describe('regioesIntermediarias', () => {
    test('todas retorna array', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([regiaoIntermediariaMock]));

      const result = await ibgeApi.regioesIntermediarias.todas();

      expect(result).toEqual([regiaoIntermediariaMock]);
    });

    test('porId retorna array cru', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([regiaoIntermediariaMock]));

      const result = await ibgeApi.regioesIntermediarias.porId('1101');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/regioes-intermediarias/1101'));
      expect(result).toEqual([regiaoIntermediariaMock]);
    });

    test('porEstado retorna array', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([regiaoIntermediariaMock]));

      const result = await ibgeApi.regioesIntermediarias.porEstado('11');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/estados/11/regioes-intermediarias'));
      expect(result).toEqual([regiaoIntermediariaMock]);
    });

    test('porRegiao retorna array', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([regiaoIntermediariaMock]));

      const result = await ibgeApi.regioesIntermediarias.porRegiao('1');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/regioes/1/regioes-intermediarias'));
      expect(result).toEqual([regiaoIntermediariaMock]);
    });

    test('regioesImediatasPorRegiaoIntermediaria retorna array', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([regiaoImediataMock]));

      const result = await ibgeApi.regioesIntermediarias.regioesImediatasPorRegiaoIntermediaria('1101');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/regioes-intermediarias/1101/regioes-imediatas'));
      expect(result).toEqual([regiaoImediataMock]);
    });
  });

  describe('regioesMetropolitanas', () => {
    test('todas retorna array', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([regiaoMetropolitanaMock]));

      const result = await ibgeApi.regioesMetropolitanas.todas();

      expect(result).toEqual([regiaoMetropolitanaMock]);
    });

    test('porId retorna array cru', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([regiaoMetropolitanaMock]));

      const result = await ibgeApi.regioesMetropolitanas.porId('1');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/regioes-metropolitanas/1'));
      expect(result).toEqual([regiaoMetropolitanaMock]);
    });

    test('porEstado retorna array', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([regiaoMetropolitanaMock]));

      const result = await ibgeApi.regioesMetropolitanas.porEstado('11');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/estados/11/regioes-metropolitanas'));
      expect(result).toEqual([regiaoMetropolitanaMock]);
    });

    test('porRegiao retorna array', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([regiaoMetropolitanaMock]));

      const result = await ibgeApi.regioesMetropolitanas.porRegiao('1');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/regioes/1/regioes-metropolitanas'));
      expect(result).toEqual([regiaoMetropolitanaMock]);
    });
  });

  describe('regioesIntegradasDeDesenvolvimento', () => {
    test('todas retorna array', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([regiaoIntegradaMock]));

      const result = await ibgeApi.regioesIntegradasDeDesenvolvimento.todas();

      expect(result).toEqual([regiaoIntegradaMock]);
    });

    test('porId retorna array cru', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([regiaoIntegradaMock]));

      const result = await ibgeApi.regioesIntegradasDeDesenvolvimento.porId('1');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/regioes-integradas-de-desenvolvimento/1'));
      expect(result).toEqual([regiaoIntegradaMock]);
    });
  });

  describe('distritos', () => {
    test('todos retorna array', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([distritoMock]));

      const result = await ibgeApi.distritos.todos();

      expect(result).toEqual([distritoMock]);
    });

    test('porId retorna array cru', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([distritoMock]));

      const result = await ibgeApi.distritos.porId('1');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/distritos/1'));
      expect(result).toEqual([distritoMock]);
    });

    test('porMesorregiao retorna array', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([distritoMock]));

      const result = await ibgeApi.distritos.porMesorregiao('1101');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/mesorregioes/1101/distritos'));
      expect(result).toEqual([distritoMock]);
    });

    test('porMicrorregiao retorna array', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([distritoMock]));

      const result = await ibgeApi.distritos.porMicrorregiao('11001');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/microrregioes/11001/distritos'));
      expect(result).toEqual([distritoMock]);
    });

    test('porMunicipio retorna array', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([distritoMock]));

      const result = await ibgeApi.distritos.porMunicipio('1100015');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/municipios/1100015/distritos'));
      expect(result).toEqual([distritoMock]);
    });

    test('porRegiaoImediata retorna array', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([distritoMock]));

      const result = await ibgeApi.distritos.porRegiaoImediata('110001');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/regioes-imediatas/110001/distritos'));
      expect(result).toEqual([distritoMock]);
    });

    test('porRegiaoIntermediaria retorna array', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([distritoMock]));

      const result = await ibgeApi.distritos.porRegiaoIntermediaria('1101');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/regioes-intermediarias/1101/distritos'));
      expect(result).toEqual([distritoMock]);
    });

    test('porRegiao retorna array', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([distritoMock]));

      const result = await ibgeApi.distritos.porRegiao('1');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/regioes/1/distritos'));
      expect(result).toEqual([distritoMock]);
    });

    test('subdistritosPorDistrito retorna array', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([subdistritoMock]));

      const result = await ibgeApi.distritos.subdistritosPorDistrito('1');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/distritos/1/subdistritos'));
      expect(result).toEqual([subdistritoMock]);
    });
  });

  describe('subdistritos', () => {
    test('todos retorna array', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([subdistritoMock]));

      const result = await ibgeApi.subdistritos.todos();

      expect(result).toEqual([subdistritoMock]);
    });

    test('porId retorna array cru', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([subdistritoMock]));

      const result = await ibgeApi.subdistritos.porId('1');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/subdistritos/1'));
      expect(result).toEqual([subdistritoMock]);
    });

    test('porEstado retorna array', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([subdistritoMock]));

      const result = await ibgeApi.subdistritos.porEstado('11');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/estados/11/subdistritos'));
      expect(result).toEqual([subdistritoMock]);
    });

    test('porMesorregiao retorna array', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([subdistritoMock]));

      const result = await ibgeApi.subdistritos.porMesorregiao('1101');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/mesorregioes/1101/subdistritos'));
      expect(result).toEqual([subdistritoMock]);
    });

    test('porMicrorregiao retorna array', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([subdistritoMock]));

      const result = await ibgeApi.subdistritos.porMicrorregiao('11001');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/microrregioes/11001/subdistritos'));
      expect(result).toEqual([subdistritoMock]);
    });

    test('porMunicipio retorna array', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([subdistritoMock]));

      const result = await ibgeApi.subdistritos.porMunicipio('1100015');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/municipios/1100015/subdistritos'));
      expect(result).toEqual([subdistritoMock]);
    });

    test('porRegiaoImediata retorna array', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([subdistritoMock]));

      const result = await ibgeApi.subdistritos.porRegiaoImediata('110001');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/regioes-imediatas/110001/subdistritos'));
      expect(result).toEqual([subdistritoMock]);
    });

    test('porRegiao retorna array', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([subdistritoMock]));

      const result = await ibgeApi.subdistritos.porRegiao('1');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/regioes/1/subdistritos'));
      expect(result).toEqual([subdistritoMock]);
    });
  });

  describe('aglomeracoesUrbanas', () => {
    test('todas retorna array', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([aglomeracaoUrbanaMock]));

      const result = await ibgeApi.aglomeracoesUrbanas.todas();

      expect(result).toEqual([aglomeracaoUrbanaMock]);
    });

    test('porId retorna array cru', async () => {
      fetchSpy.mockResolvedValueOnce(await mockJson([aglomeracaoUrbanaMock]));

      const result = await ibgeApi.aglomeracoesUrbanas.porId('1');

      expect(fetchSpy).toHaveBeenCalledWith(buildUrl('/aglomeracoes-urbanas/1'));
      expect(result).toEqual([aglomeracaoUrbanaMock]);
    });
  });
});
