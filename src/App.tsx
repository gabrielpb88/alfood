import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import AdministracaoRestaurantes from './paginas/Administracao/Restaurantes/AdministracaoRestaurante';
import FormularioRestaurante from './paginas/Administracao/Restaurantes/FormularioRestaurante';
import PaginaBaseAdmin from './paginas/Administracao/PaginaBaseAdmin';
import AdministracaoPratos from './paginas/Administracao/Pratos/AdministraçãoPratos';
import FormularioPrato from './paginas/Administracao/Pratos/FormularioPrato';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="/admin" element={<PaginaBaseAdmin />}>
        <Route path="restaurantes">
          <Route path="" element={<AdministracaoRestaurantes />} />
          <Route path=":id" element={<FormularioRestaurante />} />
          <Route path="novo" element={<FormularioRestaurante />} />
        </Route>

        <Route path="pratos">
          <Route path="" element={<AdministracaoPratos />} />
          <Route path=":id" element={<FormularioPrato />} />
          <Route path="novo" element={<FormularioPrato />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
