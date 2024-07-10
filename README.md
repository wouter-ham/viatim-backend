# viatim-backend

# Setup
### Npm
To install all the necessary dependencies, run `npm install`.

### Docker
After installing the dependencies, you can start the docker by running `docker compose up`.

### Database
When the Docker container starts up it will automatically create a database. To create the tables in the database, you need to run `npm run knex:migrate:latest`
Optionally you can also run `npm run knex:cli seed:run` to seed the database with test users.


# Usage
### Frontend
To test the application, make sure to read the `README.md` in the frontend repository to start the application.

### Login credentials
If in the previous steps you ran the seeds, you should have a Via Tim admin account in the database.
To log in to this account use `info@viatim.nl` as email and `test` as password.
