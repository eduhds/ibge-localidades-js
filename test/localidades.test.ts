import {
  ibgeEstados,
  ibgeMunicipios,
  ibgeSiglasEstados,
  ibgeSiglasEstadosAsc,
  ibgeSiglasEstadosDesc,
  ibgeNomesEstados,
  ibgeNomesEstadosAsc,
  ibgeNomesEstadosDesc,
  ibgeNomesMunicipios,
  ibgeNomesMunicipiosAsc,
  ibgeNomesMunicipiosDesc
} from '../src';

test('IBGE estados', () => {
  const estados = ibgeEstados();
  expect(estados).toBeInstanceOf(Array);
  expect(estados.length).toBe(27);
});

test('IBGE municípios', () => {
  const municipios = ibgeMunicipios('DF');
  expect(municipios).toBeInstanceOf(Array);
  expect(municipios.length).toBe(1);
});

test('IBGE siglas estados', () => {
  const siglasEstados = ibgeSiglasEstados();
  expect(siglasEstados).toBeInstanceOf(Array);
  expect(siglasEstados.length).toBe(27);
});

test('IBGE siglas estados ASC', () => {
  const siglasEstados = ibgeSiglasEstadosAsc();
  expect(siglasEstados).toBeInstanceOf(Array);
  expect(siglasEstados.length).toBe(27);
  expect(siglasEstados[0]).toBe('AC');
  expect(siglasEstados[26]).toBe('TO');
});

test('IBGE siglas estados DESC', () => {
  const siglasEstados = ibgeSiglasEstadosDesc();
  expect(siglasEstados).toBeInstanceOf(Array);
  expect(siglasEstados.length).toBe(27);
  expect(siglasEstados[0]).toBe('TO');
  expect(siglasEstados[26]).toBe('AC');
});

test('IBGE nomes estados', () => {
  const nomesEstados = ibgeNomesEstados();
  expect(nomesEstados).toBeInstanceOf(Array);
  expect(nomesEstados.length).toBe(27);
});

test('IBGE nomes estados ASC', () => {
  const nomesEstados = ibgeNomesEstadosAsc();
  expect(nomesEstados).toBeInstanceOf(Array);
  expect(nomesEstados.length).toBe(27);
  expect(nomesEstados[0]).toBe('Acre');
  expect(nomesEstados[26]).toBe('Tocantins');
});

test('IBGE nomes estados DESC', () => {
  const nomesEstados = ibgeNomesEstadosDesc();
  expect(nomesEstados).toBeInstanceOf(Array);
  expect(nomesEstados.length).toBe(27);
  expect(nomesEstados[0]).toBe('Tocantins');
  expect(nomesEstados[26]).toBe('Acre');
});

test('IBGE nomes municipios', () => {
  const nomesMunicipios = ibgeNomesMunicipios('DF');
  expect(nomesMunicipios).toBeInstanceOf(Array);
  expect(nomesMunicipios.length).toBe(1);
});

test('IBGE nomes municipios ASC', () => {
  const nomesMunicipios = ibgeNomesMunicipiosAsc('GO');
  expect(nomesMunicipios).toBeInstanceOf(Array);
  expect(nomesMunicipios.length).toBe(246);
});

test('IBGE nomes municipios DESC', () => {
  const nomesMunicipios = ibgeNomesMunicipiosDesc('GO');
  expect(nomesMunicipios).toBeInstanceOf(Array);
  expect(nomesMunicipios.length).toBe(246);
});
