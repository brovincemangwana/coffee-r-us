# Coffee R Us: Admin Portal

A single page React application for a coffee store. Customers can browse and
search coffees in the shop, and an administrator can add new coffees and edit
existing ones. Data is stored in a mock REST API (`json-server`) so changes
persist between page reloads.

## Features

- **Home page** with a short description of the store
- **Shop page** showing coffees as cards in a responsive grid
- **Live search** by name, description or origin
- **Origin filters** (checkboxes built from the coffees' origins, combined with search)
- **Admin Portal** with a validated form to add a new coffee (POST)
- **Edit coffees** inline, including price, sending only changed fields (PATCH)
- **Client side routing** with React Router, with no page reloads
- **Responsive layout** for desktop, tablet and phone
- **Automated tests** with Vitest and React Testing Library

## Tech stack

React 19 (Vite), React Router, json-server (mock backend), Vitest, React Testing Library

## React concepts used

| Concept | Where |
|---|---|
| `useState` | Forms, rows, search text, and the shared coffee list |
| `useEffect` | Fetching coffees when the app loads |
| `useContext` | `CoffeeContext` shares data and the add and update functions |
| `useId` | Unique input ids in `CoffeeForm` |
| `useRef` | Focus management in `CoffeeForm` |
| Custom hooks | `useCoffees` (reads the context), `useCoffeeFilters` (search and filter logic) |

## Getting started

### Prerequisites
- Node.js 18 or newer
- npm

### Installation

```bash
git clone https://github.com/<your-username>/coffee-r-us.git
cd coffee-r-us
npm install
```

### Running the app

The app needs **two terminals**.

Terminal 1: the mock backend (runs on port 3001):
```bash
npm run server
```

Terminal 2: the React app (runs on port 5173):
```bash
npm run dev
```

Open http://localhost:5173

### Running the tests

```bash
npm test -- --run
```

## Usage

1. **Home** (`/`): the landing page.
2. **Shop** (`/shop`): browse coffees. Type in the search box or tick origins to filter.
3. **Admin Portal** (`/admin`):
   - Use **Add a Coffee** to create a new coffee. All fields are required and the price must be above 0.
   - Use **Manage Coffees** to click **Edit** on a coffee, change any field (such as the price), then **Save**.

## API endpoints (json-server)

| Method | URL | Purpose |
|---|---|---|
| GET | `/coffees` | List all coffees |
| POST | `/coffees` | Add a coffee |
| PATCH | `/coffees/:id` | Update fields of one coffee |

## Project structure

```
src/
├── components/   CoffeeCard, CoffeeForm, AdminCoffeeRow, FilterSidebar, NavBar
├── context/      CoffeeContext, CoffeeProvider
├── hooks/        useCoffees, useCoffeeFilters
├── pages/        Home, Shop, AdminPortal
├── styles/       global.css
├── tests/        Vitest and React Testing Library tests
├── App.jsx       Routes
└── main.jsx      Entry point with Router and Provider
db.json           Mock database
```

## Known limitations

- The backend is a local `json-server` mock, not a production database. It must be running for the app to work.
- The API address (`http://localhost:3001`) is hard coded in `CoffeeProvider.jsx`.
- There is no login. The Admin Portal is open to anyone who visits `/admin`.
- Coffees cannot be deleted, and there are no product images.
- Data changes are written to `db.json`, so edits made while testing stay in that file.
- Tests fake `fetch`, so they do not exercise a real server.

## Author

<Your name>