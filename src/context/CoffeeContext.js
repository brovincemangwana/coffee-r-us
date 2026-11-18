import { createContext } from "react";

// The context object itself. It's kept in its own file so the provider
// file only exports a component, which works best with Vite's hot reload.
const CoffeeContext = createContext(null);

export default CoffeeContext;
