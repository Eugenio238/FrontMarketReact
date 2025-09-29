// Toaster & Sonner composants pour afficher des notifications (messages de succès, erreurs, alertes).
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
// permet d’afficher des bulles d’aide (tooltips) autour de certains éléments
import { TooltipProvider } from "@/components/ui/tooltip";
// gère les appels API, le cache et la synchronisation des données côté client.
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// gère la navigation entre les pages de ton site
import { BrowserRouter, Routes, Route } from "react-router-dom";
// importation des pages
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import VendorPublic from "./pages/VendorPublic";
import NotFound from "./pages/NotFound";


// instance qui centralise le cache des données récupérées depuis ton API , fournie à toute l’application grâce au QueryClientProvider
const queryClient = new QueryClient();

// Définition du composant App
const App = () => (
  // Fournit le cache et la logique de React Query à toute ton app.Toute requête API pourra être optimisée (cache, revalidation…).
  <QueryClientProvider client={queryClient}>
    {/* Active les tooltips dans l’application */}
    <TooltipProvider>
      {/* Ces composants affichent les notifications (souvent en bas à droite ou en haut) */}
      <Toaster />
      <Sonner />
      {/* Active la navigation côté client (SPA : Single Page Application) */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/vendor/:vendorId" element={<VendorPublic />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
