import React, { useState, useEffect } from 'react'
import {Link, useHistory} from 'react-router-dom';
import SweetAlert from 'sweetalert2-react';
import swal from 'sweetalert2';
import api from '../../../services/api';
import moment from 'moment';


import './styles.css';



export default function RelatorioAnualResult(){
    
    const [entrada, setEntrada] = useState([]);
    const [saida, setSaida] = useState([]);
    const [total_entrada, setTotalEntrada] = useState([]);
    const [total_saida, setTotalSaida] = useState([]);
    
     const ano = localStorage.getItem('ano');
  
     function NumberOnly(str, add) {
	    add = (typeof add === "undefined")? "": add;
		var rule = new RegExp("[^0-9"+add+"]", "g");
		return str.replace(rule, "");
	}
     
     
    useEffect(()=>{

       
        api.get(`/relatorio-anual-result?ano=${ano}`)
            .then(response =>{
                setEntrada(response.data.entradas);
                setSaida(response.data.saidas);
                setTotalEntrada(response.data.totalentradas);
               
                setTotalSaida(response.data.totalsaidas);
               
               
                               
            })
            .catch((error)=>{
               alert("erro");
            })
        
},[ ano]);
    
    
    
    return(
        <div className="container-diario">
            <div className="content-diario">
                <h1 className="data">{`${ano}`}</h1>
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
                            
                                <p className="totalent">{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(totalentry.valor_entrada)}</p>
                                
                        </li>
                            ))}
                   
                        {total_saida.map(totalsai =>(
                            <li>
                                <strong>Total Saídas: </strong>
                                    <p className="totalsai">{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(totalsai.valor_saida)}</p>

                            </li>

                            
                        ))}
                                                
                    </ul>
                    
            </div>
            <div className="btn-relatorio-diario">
                       
                        <Link className="btn-voltar-relatorio" to={"/relatorio-anual"}><button  title="Clique para voltar">Voltar</button></Link>
            </div>
        </div>
        </div>
    );
}