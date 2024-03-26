/**
 * Retorna Estados no formato do IBGE
 * @example
 * // returns [{"id":11,"sigla":"RO","nome":"Rondônia","regiao":{"id":1,"sigla":"N","nome":"Norte"}}, ...]
 * ibgeEstados();
 */
export declare function ibgeEstados(): {
    id: number;
    sigla: string;
    nome: string;
    regiao: {
        id: number;
        sigla: string;
        nome: string;
    };
}[];
/**
 * Retorna municípios no formato do IBGE
 * @example
 * // returns [{"id":5300108,"nome":"Brasília","microrregiao":{"id":53001,"nome":"Brasília","mesorregiao":{"id":5301,"nome":"Distrito Federal","UF":{"id":53,"sigla":"DF","nome":"Distrito Federal","regiao":{"id":5,"sigla":"CO","nome":"Centro-Oeste"}}}},"regiao-imediata":{"id":530001,"nome":"Distrito Federal","regiao-intermediaria":{"id":5301,"nome":"Distrito Federal","UF":{"id":53,"sigla":"DF","nome":"Distrito Federal","regiao":{"id":5,"sigla":"CO","nome":"Centro-Oeste"}}}}}]
 * ibgeMunicipios(53);
 * ibgeMunicipios('DF');
 */
export declare function ibgeMunicipios(idOuSiglaEstado: number | string): {
    id: number;
    nome: string;
    microrregiao: {
        id: number;
        nome: string;
        mesorregiao: {
            id: number;
            nome: string;
            UF: {
                id: number;
                sigla: string;
                nome: string;
                regiao: {
                    id: number;
                    sigla: string;
                    nome: string;
                };
            };
        };
    };
    "regiao-imediata": {
        id: number;
        nome: string;
        "regiao-intermediaria": {
            id: number;
            nome: string;
            UF: {
                id: number;
                sigla: string;
                nome: string;
                regiao: {
                    id: number;
                    sigla: string;
                    nome: string;
                };
            };
        };
    };
}[];
/**
 * Retorna as siglas dos estados do IBGE
 * @example
 * // returns ['RO', 'AC', ...]
 * ibgeSiglasEstados();
 */
export declare function ibgeSiglasEstados(): string[];
/**
 * Retorna as siglas dos estados do IBGE em ordem ascendente
 * @example
 * // returns ['AC', 'AL', ...]
 * ibgeSiglasEstadosAsc();
 */
export declare function ibgeSiglasEstadosAsc(): string[];
/**
 * Retorna as siglas dos estados do IBGE em ordem descendente
 * @example
 * // returns ['RO', 'RR', ...]
 * ibgeSiglasEstadosDesc();
 */
export declare function ibgeSiglasEstadosDesc(): string[];
/**
 * Retorna os nomes dos estados do IBGE
 * @example
 * // returns ['Rondônia', 'Acre', ...]
 * ibgeNomesEstados();
 */
export declare function ibgeNomesEstados(): string[];
/**
 * Retorna os nomes dos estados do IBGE em ordem ascendente
 * @example
 * // returns ['Acre', 'Alagoas', ...]
 * ibgeNomesEstadosAsc();
 */
export declare function ibgeNomesEstadosAsc(): string[];
/**
 * Retorna os nomes dos estados do IBGE em ordem descendente
 * @example
 * // returns ['Rondônia', 'Roraima', ...]
 * ibgeNomesEstadosDesc();
 */
export declare function ibgeNomesEstadosDesc(): string[];
/**
 * Retorna os nomes dos municipios do IBGE
 * @example
 * // returns ['Brasília', 'Cruzeiro do Sul', ...]
 * ibgeNomesMunicipios(53);
 * ibgeNomesMunicipios('DF');
 */
export declare function ibgeNomesMunicipios(idOuSiglaEstado: number | string): string[];
/**
 * Retorna os nomes dos municipios do IBGE em ordem ascendente
 * @example
 * // returns ['Alegre', 'Alvorada', ...]
 * ibgeNomesMunicipiosAsc(53);
 * ibgeNomesMunicipiosAsc('DF');
 */
export declare function ibgeNomesMunicipiosAsc(idOuSiglaEstado: number | string): string[];
/**
 * Retorna os nomes dos municipios do IBGE em ordem descendente
 * @example
 * // returns ['Vila Nova', 'Vila Velha', ...]
 * ibgeNomesMunicipiosDesc(53);
 * ibgeNomesMunicipiosDesc('DF');
 */
export declare function ibgeNomesMunicipiosDesc(idOuSiglaEstado: number | string): string[];
