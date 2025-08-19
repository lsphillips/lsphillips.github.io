# The Personal Website for Luke S. Phillips

[![Built & deployed using GitHub Action](https://github.com/lsphillips/lsphillips.github.io/actions/workflows/build-and-deploy.yml/badge.svg?branch=main)](https://github.com/lsphillips/lsphillips.github.io/actions)

The source code for the personal website of Luke S. Phillips.

## Website Data

The website is generated from the data found in the [data](data) directory. The data takes the form of YAML files (using the `.yaml` file extension); each data file represents the data for a single page that will be rendered by a corresponding [template](src/templates) of the same name. The exception to this rule is that `data/home.yaml` will be rendered by the `src/templates/index.js` template.

If a page requires an image, then the image file should be put in the [data/images](data/images) directory. The image paths in the data files should be relative to that directory, for example if the image is at `data/images/avatar.png` then the path should be just `avatar.png`.

## Development

> [!NOTE]
> You will need [Node.js](https://nodejs.org/) v24 (or higher) installed.

### Building

To build a deployable bundle in the `website` directory, run this command:

``` bash
npm run build
```

### Running locally

To run the website on a local development server running on port `1992`, run this command:

``` bash
npm run start
```

> [!TIP]
> Changes in [client JavaScript](src/scripts), [stylesheets](src/styles), [templates](src/templates), [resources](src/resources) and the [website data](data) will trigger the website to be rebuilt automatically.

### Code Quality

To perform code quality checks, powered by ESLint, run this command:

``` bash
npm run start
```

Please refer to the [eslint.config.js](eslint.config.js) file to familiar yourself with the rules.

## Deployment

The web application is hosted through GitHub Pages. The deployment is faciliated by the [Build & Deploy](.github/workflows/build-and-deploy.yml) GitHub Action Workflow, where it will perform a build and deploy the resulting artifact to GitHub Pages.

### DNS

The `lsphillips.com` apex domain has `A` records pointing to the following GitHub IP addresses:

  - `185.199.108.153`
  - `185.199.109.153`
  - `185.199.110.153`
  - `185.199.111.153`

It also has a `CNAME` record pointing the `www` subdomain to `lsphillips.github.io`.

### Routes

Some routes are seperate deployments; managed in different repositories. Those routes are:

| Routes            | Repository                                   |
| ----------------- | -------------------------------------------- |
| `/cv`             | https://github.com/lsphillips/cv             |
| `/my-board-games` | https://github.com/lsphillips/my-board-games |
