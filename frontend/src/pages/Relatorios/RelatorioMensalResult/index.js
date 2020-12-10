import React, { useState, useEffect } from 'react'
import {Link, useHistory} from 'react-router-dom';
import SweetAlert from 'sweetalert2-react';
import swal from 'sweetalert2';
import api from '../../../services/api';
import moment from 'moment';


import './styles.css';



export default function RelatorioMensalResult(){
    
    const [entrada, setEntrada] = useState([]);
    const [saida, setSaida] = useState([]);
    const [total_entrada, setTotalEntrada] = useState([]);
    const [total_saida, setTotalSaida] = useState([]);
     const mes = localStorage.getItem('mes-mensal');
     const ano = localStorage.getItem('ano-mensal');
     const mesNome = localStorage.getItem('mes-mensal-nome');

     
     
    useEffect(()=>{

       
        api.get(`/relatorio-mensal-result?mes=${mes}&ano=${ano}`)
            .then(response =>{
                setEntrada(response.data.entradas);
                setSaida(response.data.saidas);
                setTotalEntrada(response.data.totalentradas);
                setTotalSaida(response.data.totalsaidas);
               
               
                               
            })
            .catch((error)=>{
               alert("erro");
            })
        
},[mes, ano]);
    
    
    
    return(
        <div className="container-diario">
            <div className="content-diario">
                <h1 className="data">{`${mesNome} de ${ano}`}</h1>
                <div className="entrada-saida">
                        <ul>
                        
                                <h1>Entradas</h1>
                            {entrada.map(entry =>(
                                <li key={entry.id_descricao_entrada}>
                                    <strong>{entry.nome_descricao_entrada}: </strong>
                                    <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(entry.valor_entrada)}</p>
                                </li>
                            ))}
                        </ul>
                        <ul>
                        <h1>Saidas</h1>
                        {saida.map(sai =>(
                                <li key={sai.id_descricao_saida}>
                                    <strong>{sai.nome_descricao_saida}: </strong>
                                    <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(sai.valor_saida)}</p>
                                </li>
                            ))}
                        </ul>
                    
                   
                    <ul>
                        <h1>Total de Entradas e Saídas</h1>
                    {total_entrada.map(totalentry =>(
                        <li>
                            <strong>Total Entradas: </strong>
                            
                                <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(totalentry.valor_entrada)}</p>

                        </li>
                            ))}
                   
                        {total_saida.map(totalsai =>(
                            <li>
                                <strong>Total Saídas: </strong>
                                    <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(totalsai.valor_saida)}</p>

                            </li>
                        ))}
                        
                    </ul>
                    
            </div>
            <div className="btn-relatorio-diario">
                       
                       <Link className="btn-voltar-relatorio" to={"/relatorio-mensal"}><button  title="Clique para voltar">Voltar</button></Link>
           </div>
        </div>
        </div>
    );
}