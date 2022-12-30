import { Box, Button, TextField, Typography } from '@mui/material';
import React, { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IRestaurante from '../../../interfaces/IRestaurante';
import http from '../../../http';

export default function FormularioRestaurante() {
  const [nomeRestaurante, setNomeRestaurente] = useState('');
  const { id } = useParams();
  useEffect(() => {
    http.get<IRestaurante>(`restaurantes/${id}/`).then((resposta) => {
      setNomeRestaurente(resposta.data.nome);
    });
  }, [id]);

  function isEdicao() {
    return !!id;
  }

  function aoSubmeterForm(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    if (isEdicao()) {
      http
        .put(`restaurantes/${id}/`, {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert('Restaurente atualizado com sucesso.');
        });
    } else {
      http
        .post(`restaurantes/`, {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert('Restaurente cadastrado com sucesso.');
        });
    }
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <Typography component="h1" variant="h6">
        Formulário de Restaurantes
      </Typography>
      <Box component="form" onSubmit={aoSubmeterForm}>
        <TextField
          value={nomeRestaurante}
          onChange={(e) => {
            setNomeRestaurente(e.target.value);
          }}
          label="Nome do restaurante"
          variant="standard"
          fullWidth
          required
        />
        <Button
          sx={{ marginTop: '0.5rem' }}
          type="submit"
          variant="outlined"
          fullWidth>
          Salvar
        </Button>
      </Box>
    </Box>
  );
}
