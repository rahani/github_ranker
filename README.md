# Github Ranker API

This repository provides github top rankers API via Docker-compose.

If you don't prefer to use Docker, please follow back-end/README.md structures.

1. [Install Docker Compose](https://docs.docker.com/compose/install/)

2. Clone the repository
   ```bash
   git clone
   ```
3. buil the containers
   ```bash
   docker-compose build
   ```
4. Start the containser
   ```bash
   docker-compose up -d
   ```
5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
   ```bash
    curl --location --request POST 'http://localhost:3000/github/topRated' \
   --header 'Content-Type: application/x-www-form-urlencoded' \
   --data-urlencode 'Language=JavaScript' \
   --data-urlencode 'Date=2020-01-01' \
   --data-urlencode 'Limit=10'
    ```

6. Run Integration tests
   ```bash
   docker-compose run nodejs npm run test
   ```
7. Run Unit tests
   ```bash
   Sorry for the inconvenience, I didn't have time to write unit tests.
   ```
8. Close the containers
   ```bash
   docker-compose down
   ```

## Routes

### POST /github/topRated

    request body:
    {
        Date: string; such as "2020-01-01"
        Language: string; such as "JavaScript"
        Limit: number; a Integer such as 5 between 1 and 100
    }

    response body:
    {
        records: [{
            "rank"
            | "item"
            | "repo_name"
            | "stars"
            | "forks"
            | "language"
            | "repo_url"
            | "username"
            | "issues"
            | "last_commit"
            | "description" : string
        }];
    }
