import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom';
import SweetAlert from 'sweetalert2-react';
import swal from 'sweetalert2';
import api from '../../services/api';

import './styles.css';



export default function Entradas(){
    const [ id_descricao_entrada, setIdDescricao] = useState([]);
    const [ data_entrada, setData] = useState([]);
    const [ valor, setValor] = useState([]);

    const [ descricao, setDescricao] = useState([]);
   
    useEffect(() => {
        api.get('/adicionar-entradas')
            .then(response => {
                
                setDescricao(response.data);
               
            })
    }, []);
    function iniciar(){
        const descricaoElement = document.querySelector("select");
        descricaoElement.value = 0;
        
    }
   
    function limpar(){
        const descricaoElement = document.querySelector("select");
        const DataElement = document.querySelector("input.input-data");
        const ValorElement = document.querySelector("input.input-valor");

        descricaoElement.value = descricaoElement.value;
        DataElement.value = DataElement.value;
        ValorElement.value = "";
        
        console.log(descricaoElement);
    }
    function alerta(){
        const descricaoElement = document.querySelector("select");
        const valorElement = document.querySelector("input.input-valor");

        const option = descricaoElement.children[descricaoElement.selectedIndex];
        const valor = valorElement.value;
        const texto = option.textContent;
        swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `Entrada de ${texto} no valor de ${Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(valor)} inserido!`,
            showConfirmButton: false,
            timer: 2000
        });
    }
    async function handleInserir(e){
        e.preventDefault();
        const valor_entrada = valor.toString().replace(",", ".");
        const dados = {
            id_descricao_entrada,
            data_entrada,
            valor_entrada  
        };
        const descricaoElement = document.querySelector("select");
        const DataElement = document.querySelector("input.input-data");
        const ValorElement = document.querySelector("input.input-valor");
        if(descricaoElement.value == "" || DataElement.value == "" || ValorElement.value ==""){
            swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Um dos campos está vazio',
                showConfirmButton: false,
                timer: 2000
            });
        }
        else{
            try{
                const response = await api.post('/adicionar-entradas', dados);

                alerta();
                limpar();
                        
            }catch(err){
                swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Erro ao inserir entrada',
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        }
    }
    return(
        <div className="container-entradas" >
            <section className="form-entradas">
                <form onSubmit={handleInserir}>
                    <h1>Digite os valores referente à entrada</h1>
                    <div className="inputs-entrada">
                        <div className="descricao">
                        <label>Descrição: </label>
                            <select
                                value={id_descricao_entrada}
                                onChange={e=> setIdDescricao(e.target.value)}>
                                    <option>Selecione a descrição</option>
                                    {descricao.map(descricoes => (
                                        <option value={descricoes.id_descricao_entrada}>
                                            {descricoes.nome_descricao_entrada}
                                        </option>
                                    ))
                                    }
                            </select>
                        </div>
                        <div className="data">
                            <label>Data: </label>
                            <input type="date"
                                className="input-data"
                                value={data_entrada}
                                onChange={e=> setData(e.target.value)}>
                            
                            </input>
                        </div>
                        <div className="valor">
                            <label>Valor: </label>
                            <input
                                type="number"
                                placeholder="Digite o Valor"
                                className="input-valor"
                                value={valor}
                                onChange={e=> setValor(e.target.value)}>
                                    
                            </input>
                        </div>
                    </div>
                    <div className="botoes-entradas">       
                        <button className="btn-inserir" type="submit" title="Clique para inserir">Inserir</button>
                        <Link className="btn-voltar" to={"/editar-entradas"}><button  title="Clique para editar">Editar</button></Link>
                        <Link className="btn-voltar" to={"/igreja"}><button  title="Clique para voltar">Voltar</button></Link>
                    </div>
                </form>
            </section>
        </div>
    );
}