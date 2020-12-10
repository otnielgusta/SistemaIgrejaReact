import React, { useState, useEffect, Component } from 'react'
import {Link} from 'react-router-dom';
import SweetAlert from 'sweetalert2-react';
import Swal from 'sweetalert2';
import api from '../../services/api';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {Modal, Button, Form, Col, Row,FormControl, Title} from 'react-bootstrap';
import PubSub from 'pubsub-js';
import './styles.css';
import Entradas from '../Entradas';



export default function EditarEntradas(){
    const [entradas, setEntradas] = useState([]);
    const [data, setData] = useState([]);
    const [valor, setValor] = useState([]);
    const [descricao, setDescricao] = useState([]);
    const [modalShow, setModalShow] = React.useState(false);
    
    const [descricaoLista, setDescricaoLista] = useState([]);

    
    const [valoresNovos, setValoresNovos] = useState({
        id_entrada: 0,
        valor_entrada: 0,
        data_entrada: "",
        id_descricao_entrada: 0,

    });
    const [valores, setValores] = useState({
        id_entrada: 0,
        valor_entrada: 0,
        data_entrada: "",
        nome_descricao_entrada: "",
        id_descricao_entrada: 0,

    });
  
 
    useEffect(()=>{
        api.get('/editar-entradas')
        .then(response => {
            
            setDescricaoLista(response.data.listaDescricao);
          
           
        })
        .catch(err =>{
            MensagemErro();
        })
       
        if(data != ""){

            api.get(`/editar-entradas?dataQ=${data}`)
                .then(response=>{
                    
                        setEntradas(response.data.resultado)
                   
                
                })
                .catch(err =>{
                    MensagemErro();
                })
        }
        else if(valor != ""){

            api.get(`/editar-entradas?valorQ=${valor}`)
                .then(response=>{
                        
                        setEntradas(response.data.resultado)
                   
                
                })
                .catch(err =>{
                    MensagemErro();
                })
        }
        else if(descricao != ""){

            api.get(`/editar-entradas?descricaoQ=${descricao}`)
                .then(response=>{
                       
                        setEntradas(response.data.resultado)
                    
                
                })
                .catch(err =>{
                    MensagemErro();
                })
        }
    },[data, valor, descricao]) 
    
    function handleEditar(e){
        e.preventDefault();
        
    }
    function editar(valor){
       setValores({...valores, id_entrada: valor.id_entrada,
        valor_entrada: valor.valor_entrada,
        data_entrada: valor.data_entrada,
        nome_descricao_entrada: valor.nome_descricao_entrada,
        id_descricao_entrada: valor.id_descricao_entrada,
    })};
      
    async function EditarFinal(e, data, descricao, ){
        e.preventDefault();
        const valor_entrada = valor.toString().replace(",", ".");
        const dados = {
            id_descricao_entrada: 0,
            data_entrada:"",
            valor_entrada:0  
        };
    }

    async function deletar(id){
       await Swal.fire({
            title: 'Deseja realmente deletar?',
          
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, deletar'
          }).then((result) => {
            if (result.value) {
                api.delete(`/editar-entradas/${id}`)
               
                setEntradas(entradas.filter(entrada => entrada.id !== id))
                window.location.reload();
                Swal.fire(
                'Deletado!',
                'A entrada foi deletada',
                'success'
              )
            }
          })
              
    
}
    function MensagemErro(){
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Rapaz, sei oq q ta dando não',
            showConfirmButton: false,
            timer: 2000
        });
    }
    
    function MensagemDeletar(){
        
    }
function titulo(){
        document.title = "ICL - Editar Entradas";
    }


    function MyVerticallyCenteredModal(props) {
        
      
       
        return (
            
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header  className="modao">
              <h1>Edite a Entrada</h1>
            </Modal.Header>
            <Modal.Body>
                
            <Form className="modao-form">
                        
                        <Form.Row >
                            <Col xs={1}>
                                <Form.Control type="hidden"  placeholder="Codigo" value="ID" />
                                <Form.Control type="hidden"  placeholder="Codigo" value={valores.id_entrada} />
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col>
                                <Form.Label>Data: </Form.Label>
                                <Form.Control type="date" value={moment(valores.data_entrada).format('YYYY-MM-DD')}
                                onChange={e=> setValoresNovos({...valoresNovos, data_entrada: e.target.value})} />
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col>
                                <Form.Label>Valor: </Form.Label>
                                <Form.Control type="number"  value={valores.valor_entrada} 
                                onChange={e=> setValoresNovos({...valoresNovos, valor_entrada: e.target.value})}/>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col>
                            <Form.Label>Descrição: </Form.Label>

                            <Form.Control className="modao-select" as="select" size="lg"
                                value={valores.id_descricao_entrada}
                                onChange={e=> setValoresNovos({...valoresNovos, id_descricao_entrada: e.target.value})}>
                                    
                                   
                                    {descricaoLista.map(descricoes => (
                                        <option value={descricoes.id_descricao_entrada}>
                                            {descricoes.nome_descricao_entrada}
                                            
                                        </option>
                                    ))
                                }
                               
                                </Form.Control>
                            
                                
                            </Col>
                        </Form.Row>
                        
                        </Form>
                         {console.log("valores novos", valoresNovos)}
            </Modal.Body>
            <Modal.Footer className="modao-botoes">
              <Button variant="primary" type="submit" onClick={props.onHide}>Alterar</Button>
              <Button variant="danger" onClick={props.onHide}>Voltar</Button>
            </Modal.Footer>
          </Modal>
        );
      }
      
    
    return(
        
        <div className="container-editar">
            <section className="content-editar">
                <section className="tabela">
                    <div className="pesquisa-editar">
                    <Form onSubmit={handleEditar}>
                        <Form.Row>
                            <Form.Label>Digite sua busca</Form.Label>
                        </Form.Row>
                        <Form.Row>

                            <Col>
                             <Form.Control placeholder="Data" type="date" onChange={e=> setData(e.target.value)} />
                            </Col>
                            <Col>
                                <Form.Control type="number" placeholder="Valor" onChange={e=> setValor(e.target.value)}/>
                            </Col>
                            <Col>
                            <Form.Control as="select" size="lg"
                                value={descricao}
                                onChange={e=> setDescricao(e.target.value)}>
                            
                                    <option value="#">Selecione uma descrição</option>
                                    {descricaoLista.map(descricoes => (
                                        <option value={descricoes.id_descricao_entrada}>
                                            {descricoes.nome_descricao_entrada}
                                            
                                        </option>
                                    ))
                                }
                               </Form.Control>
                            </Col>
                            </Form.Row>
                            <Form.Row>

                            <Col className="botoes-filtro">
                                <Button  variant="primary" className="btn-voltar" href="/adicionar-entradas">Voltar</Button>
                                <Button  variant="success" type="submit">Buscar</Button>
                            </Col>
                            </Form.Row>
                        
                        
                    </Form>
                        
                    </div>
                    <div className="table-responsive">
                        <div className="table-wrapper">
                        
                            <table className="table table-striped table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Descrição </th>
                                        <th>Data</th>
                                        <th>Valor </th>
                                        <th>Ação</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                    {entradas.map(entry => (
                                                <tr key={entry.id_entrada} >
                                                <td>{entry.id_entrada}</td>
                                                <td>{entry.nome_descricao_entrada}</td>
                                                <td>{moment(entry.data_entrada).format('DD/MM/YYYY')}</td>
                                                <td>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(entry.valor_entrada)}</td>
                                                <td>
                                                
                                                   
                                                    <Button variant="primary"  onClick={() => {setModalShow(true); editar(entry)}}>
                                                        Editar
                                                    </Button>

                                                    <MyVerticallyCenteredModal
                                                        show={modalShow}
                                                        onHide={() => setModalShow(false)}
                                                    />
                                                    <Button variant="danger" title="Delete" data-toggle="tooltip" onClick={() => deletar(entry.id_entrada)}>Excluir</Button>
                                                </td>
                                                
                                            </tr>
                                            ))}
                                    
                                    
                                </tbody>
                            </table>
                            
                        </div>
                    </div>  
                    {/*
                    <div className="tabela-editar">
                        <table border="1">
                            <tr>
                                <td>Descrição</td>
                                <td>Data</td>
                                <td>Valor</td>
                                <td>Ação</td>
                            </tr>
                            {entradas.map(entry => (
                                <tr value={entry.id_entrada}>
                                <td>{entry.nome_descricao_entrada}</td>
                                <td>{moment(entry.data_entrada).format('DD/MM/YYYY')}</td>
                                <td>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(entry.valor_entrada)}</td>
                                <td><div className="table=botoes"><button>Editar</button><button>Excluir</button></div></td>
                            </tr>
                            ))}
                            
                        </table>
                    </div>
                            */}
                </section>
            </section>
        </div>
        
    )
}
