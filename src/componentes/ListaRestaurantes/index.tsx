import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import {useEffect, useState} from 'react';
import axios from 'axios';

const ListaRestaurantes = () => {

  const [restaurantes, setRestaurentes] = useState<IRestaurante[]>([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/v1/restaurantes/').then((resposta) => {
      setRestaurentes(resposta.data.results);
    }).catch((err) => {
      console.log(err);
    })
  }, []);

  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
  </section>)
}

export default ListaRestaurantes