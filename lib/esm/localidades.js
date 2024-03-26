"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ibgeNomesMunicipiosDesc = exports.ibgeNomesMunicipiosAsc = exports.ibgeNomesMunicipios = exports.ibgeNomesEstadosDesc = exports.ibgeNomesEstadosAsc = exports.ibgeNomesEstados = exports.ibgeSiglasEstadosDesc = exports.ibgeSiglasEstadosAsc = exports.ibgeSiglasEstados = exports.ibgeMunicipios = exports.ibgeEstados = void 0;
const estados_json_1 = __importDefault(require("./data/estados.json"));
const _11_json_1 = __importDefault(require("./data/11.json"));
const _12_json_1 = __importDefault(require("./data/12.json"));
const _13_json_1 = __importDefault(require("./data/13.json"));
const _14_json_1 = __importDefault(require("./data/14.json"));
const _15_json_1 = __importDefault(require("./data/15.json"));
const _16_json_1 = __importDefault(require("./data/16.json"));
const _17_json_1 = __importDefault(require("./data/17.json"));
const _21_json_1 = __importDefault(require("./data/21.json"));
const _22_json_1 = __importDefault(require("./data/22.json"));
const _23_json_1 = __importDefault(require("./data/23.json"));
const _24_json_1 = __importDefault(require("./data/24.json"));
const _25_json_1 = __importDefault(require("./data/25.json"));
const _26_json_1 = __importDefault(require("./data/26.json"));
const _27_json_1 = __importDefault(require("./data/27.json"));
const _28_json_1 = __importDefault(require("./data/28.json"));
const _29_json_1 = __importDefault(require("./data/29.json"));
const _31_json_1 = __importDefault(require("./data/31.json"));
const _32_json_1 = __importDefault(require("./data/32.json"));
const _33_json_1 = __importDefault(require("./data/33.json"));
const _35_json_1 = __importDefault(require("./data/35.json"));
const _41_json_1 = __importDefault(require("./data/41.json"));
const _42_json_1 = __importDefault(require("./data/42.json"));
const _43_json_1 = __importDefault(require("./data/43.json"));
const _50_json_1 = __importDefault(require("./data/50.json"));
const _51_json_1 = __importDefault(require("./data/51.json"));
const _52_json_1 = __importDefault(require("./data/52.json"));
const _53_json_1 = __importDefault(require("./data/53.json"));
/**
 * Retorna Estados no formato do IBGE
 * @example
 * // returns [{"id":11,"sigla":"RO","nome":"Rondônia","regiao":{"id":1,"sigla":"N","nome":"Norte"}}, ...]
 * ibgeEstados();
 */
function ibgeEstados() {
    return estados_json_1.default;
}
exports.ibgeEstados = ibgeEstados;
/**
 * Retorna municípios no formato do IBGE
 * @example
 * // returns [{"id":5300108,"nome":"Brasília","microrregiao":{"id":53001,"nome":"Brasília","mesorregiao":{"id":5301,"nome":"Distrito Federal","UF":{"id":53,"sigla":"DF","nome":"Distrito Federal","regiao":{"id":5,"sigla":"CO","nome":"Centro-Oeste"}}}},"regiao-imediata":{"id":530001,"nome":"Distrito Federal","regiao-intermediaria":{"id":5301,"nome":"Distrito Federal","UF":{"id":53,"sigla":"DF","nome":"Distrito Federal","regiao":{"id":5,"sigla":"CO","nome":"Centro-Oeste"}}}}}]
 * ibgeMunicipios(53);
 * ibgeMunicipios('DF');
 */
function ibgeMunicipios(idOuSiglaEstado) {
    switch (idOuSiglaEstado) {
        case 11:
        case 'RO':
            return _11_json_1.default;
        case 12:
        case 'AC':
            return _12_json_1.default;
        case 13:
        case 'AM':
            return _13_json_1.default;
        case 14:
        case 'RR':
            return _14_json_1.default;
        case 15:
        case 'PA':
            return _15_json_1.default;
        case 16:
        case 'AP':
            return _16_json_1.default;
        case 17:
        case 'TO':
            return _17_json_1.default;
        case 21:
        case 'MA':
            return _21_json_1.default;
        case 22:
        case 'PI':
            return _22_json_1.default;
        case 23:
        case 'CE':
            return _23_json_1.default;
        case 24:
        case 'RN':
            return _24_json_1.default;
        case 25:
        case 'PB':
            return _25_json_1.default;
        case 26:
        case 'PE':
            return _26_json_1.default;
        case 27:
        case 'AL':
            return _27_json_1.default;
        case 28:
        case 'SE':
            return _28_json_1.default;
        case 29:
        case 'BA':
            return _29_json_1.default;
        case 31:
        case 'MG':
            return _31_json_1.default;
        case 32:
        case 'ES':
            return _32_json_1.default;
        case 33:
        case 'RJ':
            return _33_json_1.default;
        case 35:
        case 'SP':
            return _35_json_1.default;
        case 41:
        case 'PR':
            return _41_json_1.default;
        case 42:
        case 'SC':
            return _42_json_1.default;
        case 43:
        case 'RS':
            return _43_json_1.default;
        case 50:
        case 'MS':
            return _50_json_1.default;
        case 51:
        case 'MT':
            return _51_json_1.default;
        case 52:
        case 'GO':
            return _52_json_1.default;
        case 53:
        case 'DF':
            return _53_json_1.default;
        default:
            return [];
    }
}
exports.ibgeMunicipios = ibgeMunicipios;
/**
 * Retorna as siglas dos estados do IBGE
 * @example
 * // returns ['RO', 'AC', ...]
 * ibgeSiglasEstados();
 */
function ibgeSiglasEstados() {
    return ibgeEstados().map(estado => estado.sigla);
}
exports.ibgeSiglasEstados = ibgeSiglasEstados;
/**
 * Retorna as siglas dos estados do IBGE em ordem ascendente
 * @example
 * // returns ['AC', 'AL', ...]
 * ibgeSiglasEstadosAsc();
 */
function ibgeSiglasEstadosAsc() {
    return ibgeSiglasEstados().sort();
}
exports.ibgeSiglasEstadosAsc = ibgeSiglasEstadosAsc;
/**
 * Retorna as siglas dos estados do IBGE em ordem descendente
 * @example
 * // returns ['RO', 'RR', ...]
 * ibgeSiglasEstadosDesc();
 */
function ibgeSiglasEstadosDesc() {
    return ibgeSiglasEstados().sort().reverse();
}
exports.ibgeSiglasEstadosDesc = ibgeSiglasEstadosDesc;
/**
 * Retorna os nomes dos estados do IBGE
 * @example
 * // returns ['Rondônia', 'Acre', ...]
 * ibgeNomesEstados();
 */
function ibgeNomesEstados() {
    return ibgeEstados().map(estado => estado.nome);
}
exports.ibgeNomesEstados = ibgeNomesEstados;
/**
 * Retorna os nomes dos estados do IBGE em ordem ascendente
 * @example
 * // returns ['Acre', 'Alagoas', ...]
 * ibgeNomesEstadosAsc();
 */
function ibgeNomesEstadosAsc() {
    return ibgeNomesEstados().sort();
}
exports.ibgeNomesEstadosAsc = ibgeNomesEstadosAsc;
/**
 * Retorna os nomes dos estados do IBGE em ordem descendente
 * @example
 * // returns ['Rondônia', 'Roraima', ...]
 * ibgeNomesEstadosDesc();
 */
function ibgeNomesEstadosDesc() {
    return ibgeNomesEstados().sort().reverse();
}
exports.ibgeNomesEstadosDesc = ibgeNomesEstadosDesc;
/**
 * Retorna os nomes dos municipios do IBGE
 * @example
 * // returns ['Brasília', 'Cruzeiro do Sul', ...]
 * ibgeNomesMunicipios(53);
 * ibgeNomesMunicipios('DF');
 */
function ibgeNomesMunicipios(idOuSiglaEstado) {
    return ibgeMunicipios(idOuSiglaEstado).map(municipio => municipio.nome);
}
exports.ibgeNomesMunicipios = ibgeNomesMunicipios;
/**
 * Retorna os nomes dos municipios do IBGE em ordem ascendente
 * @example
 * // returns ['Alegre', 'Alvorada', ...]
 * ibgeNomesMunicipiosAsc(53);
 * ibgeNomesMunicipiosAsc('DF');
 */
function ibgeNomesMunicipiosAsc(idOuSiglaEstado) {
    return ibgeNomesMunicipios(idOuSiglaEstado).sort();
}
exports.ibgeNomesMunicipiosAsc = ibgeNomesMunicipiosAsc;
/**
 * Retorna os nomes dos municipios do IBGE em ordem descendente
 * @example
 * // returns ['Vila Nova', 'Vila Velha', ...]
 * ibgeNomesMunicipiosDesc(53);
 * ibgeNomesMunicipiosDesc('DF');
 */
function ibgeNomesMunicipiosDesc(idOuSiglaEstado) {
    return ibgeNomesMunicipios(idOuSiglaEstado).sort().reverse();
}
exports.ibgeNomesMunicipiosDesc = ibgeNomesMunicipiosDesc;
