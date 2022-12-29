import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { IPaginacao } from '../../interfaces/IPaginacao';

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurentes] = useState<IRestaurante[]>([]);
  const [proximaPagina, setProximaPagina] = useState('');

  useEffect(() => {
    axios
      .get<IPaginacao<IRestaurante>>(
        'http://localhost:8000/api/v1/restaurantes/',
      )
      .then((resposta) => {
        setRestaurentes(resposta.data.results);
        setProximaPagina(resposta.data.next);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function verMais() {
    axios
      .get<IPaginacao<IRestaurante>>(proximaPagina)
      .then((resposta) => {
        setRestaurentes((prevState) => [
          ...prevState,
          ...resposta.data.results,
        ]);
        setProximaPagina(resposta.data.next);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <section className={style.ListaRestaurantes}>
      <h1>
        Os restaurantes mais <em>bacanas</em>!
      </h1>
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
