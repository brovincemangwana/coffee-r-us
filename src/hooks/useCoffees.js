import { useContext } from "react";
import CoffeeContext from "../context/CoffeeContext";

// Shortcut for reading the shared coffee data
function useCoffees() {
  const context = useContext(CoffeeContext);

  // A helpful error if someone forgets to wrap the app in the provider
  if (context === null) {
    throw new Error("useCoffees must be used inside a CoffeeProvider");
  }

  return context;
}

export default useCoffees;
