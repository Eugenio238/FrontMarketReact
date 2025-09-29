//Fonction de reactDom , permet d’initialiser et de contrôler l’application React dans le navigateur
import { createRoot } from "react-dom/client";
//composant principal App contenir les routes, le layout global,etc.
import App from "./App.tsx";
//s’applique à toute l’application
import "./index.css";


//sélectionne l’élément <div id="root"></div> dans ton fichier index.html
//! après (root!) est du TypeScript : il signifie “je suis sûr que ce n’est pas null”
//on dit à React : “rends le composant App à l’intérieur de la div root”
createRoot(document.getElementById("root")!).render(<App />);
