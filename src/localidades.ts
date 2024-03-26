import estadosJson from './data/estados.json';
import municipios11Json from './data/11.json';
import municipios12Json from './data/12.json';
import municipios13Json from './data/13.json';
import municipios14Json from './data/14.json';
import municipios15Json from './data/15.json';
import municipios16Json from './data/16.json';
import municipios17Json from './data/17.json';
import municipios21Json from './data/21.json';
import municipios22Json from './data/22.json';
import municipios23Json from './data/23.json';
import municipios24Json from './data/24.json';
import municipios25Json from './data/25.json';
import municipios26Json from './data/26.json';
import municipios27Json from './data/27.json';
import municipios28Json from './data/28.json';
import municipios29Json from './data/29.json';
import municipios31Json from './data/31.json';
import municipios32Json from './data/32.json';
import municipios33Json from './data/33.json';
import municipios35Json from './data/35.json';
import municipios41Json from './data/41.json';
import municipios42Json from './data/42.json';
import municipios43Json from './data/43.json';
import municipios50Json from './data/50.json';
import municipios51Json from './data/51.json';
import municipios52Json from './data/52.json';
import municipios53Json from './data/53.json';

/**
 * Retorna Estados no formato do IBGE
 * @example
 * // returns [{"id":11,"sigla":"RO","nome":"Rondônia","regiao":{"id":1,"sigla":"N","nome":"Norte"}}, ...]
 * ibgeEstados();
 */
export function ibgeEstados() {
  return estadosJson;
}

/**
 * Retorna municípios no formato do IBGE
 * @example
 * // returns [{"id":5300108,"nome":"Brasília","microrregiao":{"id":53001,"nome":"Brasília","mesorregiao":{"id":5301,"nome":"Distrito Federal","UF":{"id":53,"sigla":"DF","nome":"Distrito Federal","regiao":{"id":5,"sigla":"CO","nome":"Centro-Oeste"}}}},"regiao-imediata":{"id":530001,"nome":"Distrito Federal","regiao-intermediaria":{"id":5301,"nome":"Distrito Federal","UF":{"id":53,"sigla":"DF","nome":"Distrito Federal","regiao":{"id":5,"sigla":"CO","nome":"Centro-Oeste"}}}}}]
 * ibgeMunicipios(53);
 * ibgeMunicipios('DF');
 */
export function ibgeMunicipios(idOuSiglaEstado: number | string) {
  switch (idOuSiglaEstado) {
    case 11:
    case 'RO':
      return municipios11Json;
    case 12:
    case 'AC':
      return municipios12Json;
    case 13:
    case 'AM':
      return municipios13Json;
    case 14:
    case 'RR':
      return municipios14Json;
    case 15:
    case 'PA':
      return municipios15Json;
    case 16:
    case 'AP':
      return municipios16Json;
    case 17:
    case 'TO':
      return municipios17Json;
    case 21:
    case 'MA':
      return municipios21Json;
    case 22:
    case 'PI':
      return municipios22Json;
    case 23:
    case 'CE':
      return municipios23Json;
    case 24:
    case 'RN':
      return municipios24Json;
    case 25:
    case 'PB':
      return municipios25Json;
    case 26:
    case 'PE':
      return municipios26Json;
    case 27:
    case 'AL':
      return municipios27Json;
    case 28:
    case 'SE':
      return municipios28Json;
    case 29:
    case 'BA':
      return municipios29Json;
    case 31:
    case 'MG':
      return municipios31Json;
    case 32:
    case 'ES':
      return municipios32Json;
    case 33:
    case 'RJ':
      return municipios33Json;
    case 35:
    case 'SP':
      return municipios35Json;
    case 41:
    case 'PR':
      return municipios41Json;
    case 42:
    case 'SC':
      return municipios42Json;
    case 43:
    case 'RS':
      return municipios43Json;
    case 50:
    case 'MS':
      return municipios50Json;
    case 51:
    case 'MT':
      return municipios51Json;
    case 52:
    case 'GO':
      return municipios52Json;
    case 53:
    case 'DF':
      return municipios53Json;
    default:
      return [];
  }
}

/**
 * Retorna as siglas dos estados do IBGE
 * @example
 * // returns ['RO', 'AC', ...]
 * ibgeSiglasEstados();
 */
export function ibgeSiglasEstados() {
  return ibgeEstados().map(estado => estado.sigla);
}

/**
 * Retorna as siglas dos estados do IBGE em ordem ascendente
 * @example
 * // returns ['AC', 'AL', ...]
 * ibgeSiglasEstadosAsc();
 */
export function ibgeSiglasEstadosAsc() {
  return ibgeSiglasEstados().sort();
}

/**
 * Retorna as siglas dos estados do IBGE em ordem descendente
 * @example
 * // returns ['RO', 'RR', ...]
 * ibgeSiglasEstadosDesc();
 */
export function ibgeSiglasEstadosDesc() {
  return ibgeSiglasEstados().sort().reverse();
}

/**
 * Retorna os nomes dos estados do IBGE
 * @example
 * // returns ['Rondônia', 'Acre', ...]
 * ibgeNomesEstados();
 */
export function ibgeNomesEstados() {
  return ibgeEstados().map(estado => estado.nome);
}

/**
 * Retorna os nomes dos estados do IBGE em ordem ascendente
 * @example
 * // returns ['Acre', 'Alagoas', ...]
 * ibgeNomesEstadosAsc();
 */
export function ibgeNomesEstadosAsc() {
  return ibgeNomesEstados().sort();
}

/**
 * Retorna os nomes dos estados do IBGE em ordem descendente
 * @example
 * // returns ['Rondônia', 'Roraima', ...]
 * ibgeNomesEstadosDesc();
 */
export function ibgeNomesEstadosDesc() {
  return ibgeNomesEstados().sort().reverse();
}

/**
 * Retorna os nomes dos municipios do IBGE
 * @example
 * // returns ['Brasília', 'Cruzeiro do Sul', ...]
 * ibgeNomesMunicipios(53);
 * ibgeNomesMunicipios('DF');
 */
export function ibgeNomesMunicipios(idOuSiglaEstado: number | string) {
  return ibgeMunicipios(idOuSiglaEstado).map(municipio => municipio.nome);
}

/**
 * Retorna os nomes dos municipios do IBGE em ordem ascendente
 * @example
 * // returns ['Alegre', 'Alvorada', ...]
 * ibgeNomesMunicipiosAsc(53);
 * ibgeNomesMunicipiosAsc('DF');
 */
export function ibgeNomesMunicipiosAsc(idOuSiglaEstado: number | string) {
  return ibgeNomesMunicipios(idOuSiglaEstado).sort();
}

/**
 * Retorna os nomes dos municipios do IBGE em ordem descendente
 * @example
 * // returns ['Vila Nova', 'Vila Velha', ...]
 * ibgeNomesMunicipiosDesc(53);
 * ibgeNomesMunicipiosDesc('DF');
 */
export function ibgeNomesMunicipiosDesc(idOuSiglaEstado: number | string) {
  return ibgeNomesMunicipios(idOuSiglaEstado).sort().reverse();
}
