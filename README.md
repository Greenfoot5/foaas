# FOAAS

*May 2025 - v2.3.4*

[![Coverage Status](https://coveralls.io/repos/github/Greenfoot5/foaas/badge.svg?branch=master)](https://coveralls.io/github/Greenfoot5/foaas?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/tomdionysus/foaas/badge.svg?branch=master)](https://coveralls.io/github/Greenfoot5/foaas?branch=master)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

FOAAS (Fuck Off As A Service) provides a modern, RESTful, scalable solution to the common problem of telling people to fuck off.

Please see https://foaas.alchemix.dev for API documentation and examples.

# Installation

	npm install

# Run

	npm start

# Test

	npm test

# Docker

	docker build -t foaas:1 .
    docker run -v $(pwd):/usr/src/app -p 5000:5000 foaas:1

# Clients

API clients are available in a number of languages:

| Language | Name           | Info                                           |
|:---------|:---------------|:-----------------------------------------------|
| JS/Node  | `foaas-client` | https://www.npmjs.org/package/foaas-client     |
| Ruby     | `foaas-client` | https://github.com/petedmarsh/foaas-client     |
| PHP      | `foaas-php`    | https://github.com/klaude/foaas-php            |
| Python   | `foaas-python` | https://github.com/dmpayton/foaas-python       |
| Python   | `foaap`        | https://github.com/ilhomidin/foaap             |
| R        | `rfoaas`       | https://github.com/eddelbuettel/rfoaas         |
| CLI/bash | `foaas.sh`     | https://github.com/RaymiiOrg/foaas.sh          |
| CLI      | `foass-cli`    | https://github.com/palash25/foaas-cli          |
| .NET     | `FOAASClient`  | https://github.com/igorkulman/FOAASClient      |
| .NET Core| `foaas-dotnet` | https://github.com/Zuev-Alexander/foaas-dotnet |
| Java     | `JFOAAS`       | https://github.com/SSederberg/FOAAS-Java       |
| Go       | `go-fuck-off`  | https://godoc.org/github.com/ds0nt/go-fuck-off |
| Erlang   | `foaas-erlang` | https://github.com/rikribbers/foaas-erlang     |
| Crystal  | `foaas_client` | https://github.com/mamantoha/foaas_client      |
| Rust     | `foaas-rs`     | https://github.com/jilsahm/foaas-rs            |


# Framework Support

| Framework     | Info                                                                         |
|:--------------------------------------------|:-----------------------------------------------------------------------------|
| [Polymer](https://www.polymer-project.org/) | https://github.com/benfonty/fooas-element                                    |
| [React](https://reactjs.org/) | https://github.com/circa10a/react-foaas-card                                   	     |

# Contributing

## Adding new operations

To add a new FOAAS operation:

1. Fork into your account
2. Branch into a feature branch `feature/your_operation`
3. See the operation files in `/lib/operations`.
4. Add specs, using `/spec/operations` as examples. We won't be merging operations without working specs.
5. Push to your fork and submit a PR.

All contributions are very welcome.
