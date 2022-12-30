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
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import http from '../../../http';
import IPrato from '../../../interfaces/IPrato';

export default function AdministracaoPratos() {
  const [pratos, setPratos] = useState<IPrato[]>([]);
  useEffect(() => {
    http.get(`pratos/`).then((resposta) => {
      setPratos(resposta.data);
    });
  }, []);

  function excluirPrato(prato: IPrato) {
    http.delete(`pratos/${prato.id}/`).then(() => {
      setPratos((prevState) => prevState.filter((r) => r.id !== prato.id));
    });
  }
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Tag</TableCell>
              <TableCell>Imagem</TableCell>
              <TableCell>Editar</TableCell>
              <TableCell>Excluir</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pratos.map((prato) => (
              <TableRow key={prato.id}>
                <TableCell>{prato.nome}</TableCell>
                <TableCell>{prato.descricao}</TableCell>
                <TableCell>{prato.tag}</TableCell>
                <TableCell>
                  <a href={prato.imagem} target="_blank" rel="noreferrer">
                    [Imagem]
                  </a>
                </TableCell>
                <TableCell>
                  <Link to={`/admin/pratos/${prato.id}`}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </Link>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      excluirPrato(prato);
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
