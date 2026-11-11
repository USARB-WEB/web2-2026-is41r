# Warehouse API

NestJS API with a PostgreSQL container for local development. Docker Compose builds the API image from the included `Dockerfile` and starts it alongside PostgreSQL.

## Requirements

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) or Docker Engine with the Compose plugin
- Docker Compose v2 (`docker compose`)

## Start the application and database

Run these commands from the `warehouse` directory:

```bash
docker compose up --build -d
```

The first run builds the API image and downloads the PostgreSQL image. To follow the startup logs:

```bash
docker compose logs -f
```

The services are available at:

| Service | Address | Details |
| --- | --- | --- |
| API | <http://localhost:3000> | `GET /` returns `Hello World!`; `GET /products` returns sample products. |
| PostgreSQL | `localhost:5432` | Database: `warehouse_db`; user: `warehouse_user`; password: `warehouse_password`. |

To open a PostgreSQL shell inside the database container:

```bash
docker compose exec postgres psql -U warehouse_user -d warehouse_db
```

Stop and remove the containers with:

```bash
docker compose down
```

The Compose configuration does not define a database volume. Removing the containers with `docker compose down` therefore removes the database container and its data.

## Database integration

PostgreSQL is started as a separate service, but the API does not currently have a database driver or connection configuration. The API does not connect to or read from PostgreSQL yet. From inside the API container, the database hostname to use for a future connection is `postgres` (not `localhost`); use port `5432` and the credentials listed above.

## Run without Docker

For local development with Node.js installed:

```bash
npm ci
npm run start:dev
```

This starts the API on port `3000`. To build and run the production application locally:

```bash
npm run build
npm run start:prod
```
