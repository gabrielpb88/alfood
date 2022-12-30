import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import AdministracaoRestaurantes from './paginas/Administracao/Restaurantes/AdministracaoRestaurante';
import FormularioRestaurante from './paginas/Administracao/Restaurantes/FormularioRestaurante';
import PaginaBaseAdmin from './paginas/Administracao/PaginaBaseAdmin';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="/admin" element={<PaginaBaseAdmin />}>
        <Route
          path="/admin/restaurantes"
          element={<AdministracaoRestaurantes />}
        />
        <Route
          path="/admin/restaurantes/:id"
          element={<FormularioRestaurante />}
        />
        <Route
          path="/admin/restaurantes/novo"
          element={<FormularioRestaurante />}
        />
      </Route>
    </Routes>
  );
}

export default App;
