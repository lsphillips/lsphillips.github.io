# The Personal Website for Luke S. Phillips

[![Built & deployed using GitHub Action](https://github.com/lsphillips/lsphillips.github.io/actions/workflows/build-and-deploy.yml/badge.svg?branch=main)](https://github.com/lsphillips/lsphillips.github.io/actions)

The source code for the personal website of Luke S. Phillips, which can be viewed here: www.lsphillips.com.

## Development

This project is split into two parts:

- **The website source**\
  Contained in the `src` directory. This is where the design and functionality is defined.
- **The website data**\
  Contained in the `data` directory. This is where the content is defined.

**Please Note:** Node.js is required because NPM scripts are used to facilitate the build process.

## Building

To build a deployable artifact:

```
npm run build
```

This will create a `site` directory containing the compiled HTML, CSS and JavaScript for the website.

### Running locally

To setup a seamless development environment:

```
npm run start
```

This will perform a build in memory and serve it using a local web server on port `1992`. It will watch all source and data files for changes, where the site will be rebuilt when such changes occur.

## Deployment

The site is hosted through GitHub Pages. The deployment is faciliated by the [Build & Deploy](.github/workflows/build-and-deploy.yml) GitHub Action Workflow, where it will perform a build and deploy the resulting artifact GitHub Pages.

### DNS

The `lsphillips.com` apex domain has `A` records pointing to the following GitHub IP addresses:

  - `185.199.108.153`
  - `185.199.109.153`
  - `185.199.110.153`
  - `185.199.111.153`

It also has a `CNAME` record pointing the `www` subdomain to `lsphillips.github.io`.

### Responses

| Location                       | Status Code | Description                                |
| ------------------------------ | :---------: | ------------------------------------------ |
| `http://lsphillips.github.io`  | `301`       | Redirects to `https://www.lsphillips.com`. |
| `https://lsphillips.github.io` | `301`       | Redirects to `https://www.lsphillips.com`. |
| `http://lsphillips.com`        | `301`       | Redirects to `https://www.lsphillips.com`. |
| `https://lsphillips.com`       | `301`       | Redirects to `https://www.lsphillips.com`. |
| `http://www.lsphillips.com`    | `301`       | Redirects to `https://www.lsphillips.com`. |
| `https://www.lsphillips.com`   | `200`       | Where we want to be.                       |

### Routes

Some routes are seperate deployments; managed in different repositories. Those routes are:

| Routes | Repository                       |
| ------ | -------------------------------- |
| `/cv`  | https://github.com/lsphillips/cv |
