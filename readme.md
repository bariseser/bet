
# Live Betting Application

This project implements a live betting application where users can place bets on football matches. It includes real-time odds updates, match information, and the ability to place multiple bets on a single match.

## Features

- Add new matches to the betting system.
- Dynamic odds for each match that change every second.
- Users can place bets on matches with a limit of 500 bets per match.
- Real-time updates for odds and match details.
- API for match information and placing bets.
- Swagger UI for API documentation.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express**: Web framework for building the API.
- **Sequelize**: ORM for managing database interactions.
- **MySQL**: Database for storing match and bet information.
- **Socket.io**: For real-time odds updates.
- **Swagger UI**: API documentation and testing interface.

## Requirements

- Node.js (v14 or higher)
- MySQL database
- `.env` file for environment variables (see below for setup)

## Setup and Installation



### Step 1: Clone the Repository

```bash
git clone https://github.com/bariseser/live-betting-app.git
cd live-betting-app
```

### Step 2: Docker Compose
```bash
cd docker
docker-compose up -d --build
```

### Step 3: Install Dependencies

Run the following command to install the required Node.js dependencies:

```bash
npm install
```

### Step 4: Setup `.env` File

Create a `.env` file in the root directory of the project and add the following environment variables:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=bilyoner
DB_NAME=bilyoner
```

- `PORT`: The port on which the application will run.
- `DB_HOST`: MySQL host (usually `localhost` if running locally).
- `DB_USER`: MySQL username.
- `DB_PASSWORD`: MySQL password.
- `DB_NAME`: Name of the database to use.

### Step 5: Create the MySQL Database

Make sure you have a MySQL server running and create the database:

```sql
CREATE DATABASE live_betting_db;
```

### Step 6: Sync Database Models

Run the following command to sync the Sequelize models with the database:

```bash
node src/config/database.js
```

This will create the required tables (`Matches`, `Bets`, etc.) in the database.

### Step 7: Start the Application

Once everything is set up, start the server with:

```bash
npm run dev
```

By default, the application will run on port 3000 (or the port specified in your `.env` file).

### Step 8: Access Swagger UI

The API documentation is available at the following URL:

```
http://localhost:3000/api-docs
```

You can use this interface to explore the available API endpoints and test the functionality directly from your browser.

## API Endpoints

### `/matches` [GET]
- Fetch all the available matches.

### `/matches` [POST]
- Add a new match.
- Request body:
  ```json
  {
    "league": "Premier League",
    "home_team": "Team A",
    "away_team": "Team B",
    "start_time": "2024-12-30T19:00:00Z"
  }
  ```

### `/bets` [POST]
- Place a new bet.
- Request body:
  ```json
  {
    "userId": 1,
    "matchId": 1,
    "betAmount": 100,
    "odds": 2.5
  }
  ```

### `/bets` [GET]
- Fetch all bets placed by a specific user.

### `/bets/:betId` [GET]
- Fetch a specific bet by its ID.

## Real-Time Updates with Socket.io

The application uses Socket.io to provide real-time odds updates for matches. Once the server is running, clients can connect to the server via WebSockets to receive updates every second.

### Connect to WebSocket

You can connect to the WebSocket using the following URL:

```
ws://localhost:3000/
```

This will stream real-time updates for the odds of all the matches.

## Testing

You can run unit tests on the API using your preferred test framework (e.g., Jest, Mocha). If you want to use **Jest**, install it with:

```bash
npm install --save-dev jest
```

Run the tests:

```bash
npm test
```