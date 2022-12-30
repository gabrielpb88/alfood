import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import React, { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { IPaginacao } from '../../interfaces/IPaginacao';
import {
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import http from '../../http';

interface IParametrosBusca {
  ordering?: 'nome' | 'id';
  search?: string;
}
const ListaRestaurantes = () => {
  const [restaurantes, setRestaurentes] = useState<IRestaurante[]>([]);
  const [proximaPagina, setProximaPagina] = useState('');
  const [busca, setBusca] = useState('');
  const [ordering, setOrdering] = useState<'id' | 'nome'>('nome');

  function handleChange(event: SelectChangeEvent) {
    setOrdering(event.target.value as 'id' | 'nome');
  }

  useEffect(() => {
    axios
      .get<IPaginacao<IRestaurante>>(
        'http://localhost:8000/api/v1/restaurantes/',
      )
      .then((resposta) => {
        setRestaurentes(resposta.data.results);
        setProximaPagina(resposta.data.next);
      });
  }, []);

  function verMais() {
    axios.get<IPaginacao<IRestaurante>>(proximaPagina).then((resposta) => {
      setRestaurentes((prevState) => [...prevState, ...resposta.data.results]);
      setProximaPagina(resposta.data.next);
    });
  }

  function buscarRestaurante(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const opcoes = {
      params: {} as IParametrosBusca,
    };
    if (busca) {
      opcoes.params.search = busca;
    }
    if (ordering) {
      opcoes.params.ordering = ordering;
    }
    http.get(`restaurantes/`, opcoes).then((result) => {
      setRestaurentes(result.data);
    });
  }

  return (
    <section className={style.ListaRestaurantes}>
      <h1>
        Os restaurantes mais <em>bacanas</em>!
      </h1>
      <form className={style.FormBusca} onSubmit={buscarRestaurante}>
        <TextField
          variant="standard"
          label="Nome do Restaurante"
          value={busca}
          onChange={(e) => {
            setBusca(e.target.value);
          }}
        />
        <Select value={ordering} onChange={handleChange}>
          <MenuItem value="nome">Nome</MenuItem>
          <MenuItem value="id">Id</MenuItem>
        </Select>
        <Button type="submit">Buscar</Button>
      </form>
      {restaurantes?.map((item) => (
        <Restaurante restaurante={item} key={item.id} />
      ))}
      {proximaPagina && (
        <button
          onClick={() => {
            verMais();
          }}>
          Ver mais
        </button>
      )}
    </section>
  );
};

export default ListaRestaurantes;
