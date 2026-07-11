# ibge-localidades-js

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![Fetch API](https://img.shields.io/badge/fetch_api-000000?style=for-the-badge&logo=javascript&logoColor=white)

Interação com dados de localidades do IBGE.

Fornece duas formas de acesso:
- **Dados embutidos** (`src/localidades`): JSON estático incluso no pacote, sem dependências externas.
- **Dados via fetch** (`src/api`): cliente tipado que consome a API pública do IBGE em tempo real.

[Documentação](https://eduhds.github.io/ibge-localidades-js/)

## Instalação

```sh
npm i eduhds/ibge-localidades-js
yarn add eduhds/ibge-localidades-js
pnpm add eduhds/ibge-localidades-js
```

## Dados embutidos

Funções síncronas que retornam dados já presentes no pacote.

```ts
import { ibgeEstados, ibgeMunicipios, ibgeNomesEstados } from 'ibge-localidades-js';

ibgeEstados();
ibgeMunicipios('DF');
ibgeNomesEstadosAsc();
```

## Dados via fetch

Cliente assíncrono que consome a API do IBGE em `https://servicodados.ibge.gov.br/api/v1/localidades`.

```ts
import { ibgeApi } from 'ibge-localidades-js';

const estados = await ibgeApi.estados.todos();
const municipio = await ibgeApi.municipios.porId(5300108, 'object');
const distritos = await ibgeApi.distritos.porMunicipio('5300108');
```

Também é possível criar instâncias separadas:

```ts
import { createIbgeApiClient } from 'ibge-localidades-js';

const client = createIbgeApiClient();
const result = await client.paises.todos({ lang: 'en' });
```

### Grupos disponíveis

- `paises`
- `regioes`
- `estados`
- `municipios`
- `mesorregioes`
- `microrregioes`
- `regioesImediatas`
- `regioesIntermediarias`
- `regioesMetropolitanas`
- `regioesIntegradasDeDesenvolvimento`
- `distritos`
- `subdistritos`
- `aglomeracoesUrbanas`

## Desenvolvimento

```sh
# Limpar outputs
npm run clean

# Compilar lib
npm run tsc

# Executar testes
npm run test

# Gerar documentação
npm run docs
```
