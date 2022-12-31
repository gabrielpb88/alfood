import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React, { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import http from '../../../http';
import ITag from '../../../interfaces/ITag';
import IRestaurante from '../../../interfaces/IRestaurante';
import { AxiosRequestConfig } from 'axios';
import IPrato from '../../../interfaces/IPrato';

export default function FormularioPrato() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tags, setTags] = useState<ITag[]>([]);
  const [tag, setTag] = useState('');
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [restaurante, setRestaurante] = useState('');
  const [imagem, setImagem] = useState<File | null>(null);
  const { id } = useParams();

  function isEdicao() {
    return !!id;
  }

  useEffect(() => {
    if (isEdicao()) {
      http.get<IPrato>(`pratos/${id}/`).then((response) => {
        const { data } = response;
        setNome(data.nome);
        setDescricao(data.descricao);
        setTag(data.tag);
        setRestaurante(String(data.restaurante));
      });
    }
  }, []);

  function selecionarArquivo(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files?.length) {
      setImagem(event.target.files[0]);
    }
  }

  function limparFormulario() {
    setNome('');
    setDescricao('');
    setTag('');
    setRestaurante('');
    setImagem(null);
  }

  function aoSubmeterForm(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('descricao', descricao);
    formData.append('tag', tag);
    formData.append('restaurante', restaurante);
    if (imagem) {
      formData.append('imagem', imagem);
    }
    const formDataConfig: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    };

    if (isEdicao()) {
      formData.append('id', id!);
      formDataConfig.url = `pratos/${id}/`;
      formDataConfig.method = 'PUT';
    } else {
      formDataConfig.url = `pratos/`;
      formDataConfig.method = 'POST';
    }
    http.request(formDataConfig).then(() => {
      if (isEdicao()) {
        alert('Prato atualizado com sucesso!!');
      } else {
        alert('Prato cadastrado com sucesso!!');
        limparFormulario();
      }
    });
  }

  useEffect(() => {
    http.get('tags/').then((response) => {
      setTags(response.data.tags);
    });
    http.get('restaurantes/').then((response) => {
      setRestaurantes(response.data);
    });
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexGrow: 1,
      }}>
      <Typography component="h1" variant="h6">
        Formulário de Pratos
      </Typography>
      <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
        <TextField
          value={nome}
          onChange={(e) => {
            setNome(e.target.value);
          }}
          label="Nome do prato"
          variant="standard"
          fullWidth
          margin="dense"
          required
        />
        <TextField
          value={descricao}
          onChange={(e) => {
            setDescricao(e.target.value);
          }}
          label="Descrição do prato"
          variant="standard"
          fullWidth
          margin="dense"
          required
        />
        <FormControl fullWidth margin="dense">
          <InputLabel id="select-tag">Tag</InputLabel>
          <Select
            labelId="select-tag"
            value={tag}
            onChange={(e) => {
              setTag(e.target.value);
            }}>
            {tags.map((tag) => (
              <MenuItem key={tag.id} value={tag.value}>
                {tag.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="dense">
          <InputLabel id="select-restaurante">Restaurante</InputLabel>
          <Select
            labelId="select-restaurante"
            value={restaurante}
            onChange={(e) => {
              setRestaurante(e.target.value);
            }}>
            {restaurantes.map((restaurante) => (
              <MenuItem key={restaurante.id} value={restaurante.id}>
                {restaurante.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <input type="file" onChange={selecionarArquivo} />
        <Button
          sx={{ marginTop: 1 }}
          type="submit"
          variant="outlined"
          fullWidth>
          Salvar
        </Button>
      </Box>
    </Box>
  );
}
