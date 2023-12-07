import { AppProvider } from "@/providers/app";
import { AppRoutes } from "@/routes";
import { hydrateAuth } from "./store/auth";

hydrateAuth();

function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;
