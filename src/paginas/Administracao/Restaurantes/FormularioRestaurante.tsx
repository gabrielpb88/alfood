import { Button, TextField } from '@mui/material';
import { FormEvent, useState } from 'react';
import IRestaurante from '../../../interfaces/IRestaurante';
import axios from 'axios';

export default function FormularioRestaurante() {
  const [nomeRestaurante, setNomeRestaurente] = useState('');
  function aoSubmeterForm(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    axios
      .post(`http://localhost:8000/api/v2/restaurantes/`, {
        nome: nomeRestaurante,
      })
      .then(() => {
        alert('Restaurente cadastrado com sucesso.');
      });
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
        label="Standard"
        variant="standard"
      />
      <Button type="submit" variant="outlined">
        Salvar
      </Button>
    </form>
  );
}
