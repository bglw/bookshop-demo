# Local Project Setup

In root of repository:  
- `npm install`
- `npm run bulk-install`
- `npm start` 

Storybook will be served on [:4999](https://localhost:4999) and Jekyll will be served on [:4001](https://localhost:4001)

# CloudCannon Setup

## Jekyll Website

Create a site on CloudCannon with the following build settings:  
- Static site generator: Jekyll
- Site source `demo-site`
- Environment variable `BUNDLE_GEMFILE` = `demo-site/Gemfile`
- Environment variable `BUILD_SITE` = `true`

Bookshop will be compiled on build and Jekyll will have access to the components.

## Hosted Storybook

Create a site on CloudCannon with the following build settings:  
- Static site generator: Static
- Site source `components/storybook-static`
- Environment variable `BUILD_STORYBOOK` = `true`

Bookshop will be built and hosted on CloudCannon.