# Testes na API do TMDB com Playwright

## Sobre o projeto

Essa é uma aplicação de testes automatizados na API do TMDB (The Movie DataBase), que é uma base de dados com informações sobre diversos filmes e séries de TV. Os testes foram aplicados em alguns endpoints da API, cujos resultados são disponibilizados em relatório gerado pelo Allure. 

Além disso, foi desenvolvida uma pipeline no Github Actions para que os testes sejam executados e o relatórios sejam gerados a cada push ou pull request na branch main do repositório.

## Link da API
https://developer.themoviedb.org/docs

## Tecnologias utilizadas

- Playwright
- Allure Report
- Github Actions

## Endpoints com testes automatizados


- [POST] Adicionar filme em uma lista específica (/list/{list_id}/add_item)
- [POST] Criar uma lista (/list)
- [POST] Limpar uma lista específica (/list/{list_id}/clear)
- [POST] Remover filme de uma lista específica (/list/{list_id}/remove_item)
- [GET] Ver detalhes de uma lista específica (/list/{list_id})
- [GET] Listar todas as listas de filmes do usuário (/account/{account_id}/lists)
- [DELETE] Excluir uma lista específica (/list/{list_id})

## Relatório gerado
![image](https://github.com/pauloliveiram/tmdb-playwright/assets/39312072/f5bec4c3-b8b9-4ccd-91df-0c6086935d18)

## Como executar os testes

### Pré-requisitos

- Node.js 16+
- Após clonar o repositório, é necessário gerar um token de autenticação no site da API, criar um arquivo .env e adicionar uma variável chamada "AUTH_TOKEN". Exemplo: AUTH_TOKEN=TOKEN_GERADO

```bash

# Clonar repositório
git clone https://github.com/pauloliveiram/tmdb-playwright.git

# Entrar na pasta do projeto
cd tmdb-playwright

# Instalar dependências especificadas no arquivo package.json 
npm install
	
# Executar os testes e gerar arquivos na pasta allure-results
npm run tests
					
# Gerar os relatórios a partir dos arquivos da pasta allure-results e abrir o browser com os relatórios
npm run allure-report
								
# Caso queira executar os testes e gerar os relatórios novamente, antes é necessário limpar a pasta allure-results com o seguinte comando:
npm run clean:folders					
```

 ### ESLint e Prettier
No projeto foram utilizadas as ferramentas ESLint e Prettier para garantir uma melhor qualidade do código desenvolvido. 
- **ESLint:** é responsável por analisar o código e identificar problemas de acordo com regras pré-estabelecidas
- **Prettier:** é responsável por formatar o código de acordo com regras pré-estabelecidas

```bash

# Executar o ESLint
npx eslint . --ext .ts

# Executar o Prettier
npx prettier . --write
```

# Autor

Paulo Oliveira
