import IRestaurante from '../../../interfaces/IRestaurante';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashAlt } from '@fortawesome/free-regular-svg-icons';

export default function AdministracaoRestaurantes() {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  useEffect(() => {
    axios.get(`http://localhost:8000/api/v2/restaurantes/`).then((resposta) => {
      setRestaurantes(resposta.data);
    });
  }, []);

  function excluirRestaurante(restaurante: IRestaurante) {
    axios
      .delete(`http://localhost:8000/api/v2/restaurantes/${restaurante.id}/`)
      .then((result) => {
        setRestaurantes((prevState) =>
          prevState.filter((r) => r.id !== restaurante.id),
        );
      });
  }
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Editar</TableCell>
              <TableCell>Excluir</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {restaurantes.map((restaurante) => (
              <TableRow key={restaurante.id}>
                <TableCell>{restaurante.nome}</TableCell>
                <TableCell>
                  <Link to={`/admin/restaurantes/${restaurante.id}`}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </Link>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      excluirRestaurante(restaurante);
                    }}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
