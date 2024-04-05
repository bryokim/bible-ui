# Bible-UI

Frontend for the [Bible-APi](https://github.com/bryokim/bible-api).

## Setup

Clone [this](https://github.com/bryokim/bible-ui) repository.

```bash
git clone https://github.com/bryokim/bible-ui.git && cd bible-ui
```

#### Install the dependencies

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

#### Env variable

Set `BASE_URL` env variable to the URL of the api. Get the URL after [`starting the api`](#starting-the-api).

- Directly on terminal

```bash
# Use url generated when starting api
# If <PORT> is not set when starting the api, set to this URL.
export BASE_URL='http://localhost:8000'
```

- Using a .env file

You can use a `.env` file.

```bash
# .env
export BASE_URL='http://localhost:8000'
```

then

```bash
source .env
```

#### Starting development server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

### On another terminal

> NOTE: `bible-api` uses python3.12. You can use [`pyenv`](https://github.com/pyenv/pyenv) to manage your python version.

You need to clone the [`bible-api`](https://github.com/bryokim/bible-api) repository to
provide the API functionality.

```bash
git clone https://github.com/bryokim/bible-api.git && cd bible-api
```

#### Install dependencies

- poetry

```bash
poetry install
```

- Pip and venv

```bash
pip install virtualenv  # If not already installed
python3.12 -m venv env && source env/bin/activate
pip install -r requirements.txt
```

#### Env variables

Set `BIBLE_UI_HOST` env variable to allow CORS for your development server.

- Directly on the terminal

```bash
# Can change it to the url where your bible-ui will be running on
export BIBLE_UI_HOST='http://localhost:3000'
```

- Using a .env file

You can use a `.env` file.

```bash
# .env
export BIBLE_UI_HOST='http://localhost:3000'
```

then

```bash
source .env
```

#### Starting the api

- Using poetry

```bash
# replace <PORT> with a valid available port
poetry run uvicorn src.main:app --reload --port <PORT>
```

- If already in the venv

```bash
# replace <PORT> with a valid available port
uvicorn src.main:app --reload --port <PORT>
```

The URL where the API is running should be used to set [`BASE_URL`](#env-variable) in bible-ui.

> You can follow the documentation on [bible-api](https://github.com/bryokim/bible-api) for detailed setup.

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```
