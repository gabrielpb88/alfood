import { Button, TextField } from '@mui/material';
import { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import IRestaurante from '../../../interfaces/IRestaurante';

export default function FormularioRestaurante() {
  const [nomeRestaurante, setNomeRestaurente] = useState('');
  const { id } = useParams();
  useEffect(() => {
    axios
      .get<IRestaurante>(`http://localhost:8000/api/v2/restaurantes/${id}/`)
      .then((resposta) => {
        setNomeRestaurente(resposta.data.nome);
      });
  }, [id]);

  function isEdicao() {
    return !!id;
  }

  function aoSubmeterForm(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    if (isEdicao()) {
      axios
        .put(`http://localhost:8000/api/v2/restaurantes/${id}/`, {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert('Restaurente atualizado com sucesso.');
        });
    } else {
      axios
        .post(`http://localhost:8000/api/v2/restaurantes/`, {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert('Restaurente cadastrado com sucesso.');
        });
    }
  }
  return (
    <form
      onSubmit={(e) => {
        aoSubmeterForm(e);
      }}>
      <TextField
        value={nomeRestaurante}
        onChange={(e) => {
          setNomeRestaurente(e.target.value);
        }}
        id="standard-basic"
        label="Nome do restaurante"
        variant="standard"
      />
      <Button type="submit" variant="outlined">
        Salvar
      </Button>
    </form>
  );
}
