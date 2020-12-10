import React, { useState, useEffect } from 'react'
import {Link, useHistory} from 'react-router-dom';
import SweetAlert from 'sweetalert2-react';
import swal from 'sweetalert2';
import api from '../../../services/api';


import './styles.css';



export default function RelatorioAnual(){

    const [ano, setAno] = useState([]);
    const [anoRelatorio, setAnoRelatorio] = useState([]);
   
    const history = useHistory();

    useEffect(()=>{
        api.get('/relatorio-anual')
            .then(response =>{
                setAno(response.data)
                
            })
    },[])

    

    async function handleAnual(e){
        e.preventDefault();
        const dataElement = document.querySelector("select");
        if(dataElement.value ==777){
            swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'O campo de data está vazio',
                showConfirmButton: false,
                timer: 2000
            });
        }
        else{
            try{
                
                localStorage.setItem('ano', anoRelatorio);
                
                history.push('/relatorio-anual-result');
                
         }catch(err){
            swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Erro ao buscar relatório',
                showConfirmButton: false,
                timer: 2000
            });
         }
        }
    }

    return(
        <div className="content-relatorio">
            <section className="form-relatorio-diario">
                <form onSubmit={handleAnual}>
                    <h1>Relatório Anual</h1>
                    <div className="data-relatorio-mensal">
                        
                        <div className="ano-anual">
                        <label>Ano: </label>
                            <select
                                value={anoRelatorio}
                                onChange={e=> setAnoRelatorio(e.target.value)}>
                                    <option value="777">Escolha o Ano</option>
                                    {ano.map(anos => (
                                        <option value={anos.anos}>
                                            {anos.anos}
                                        </option>
                                    ))}

                            </select>
                        </div>
                    </div>
                    <div className="btn-relatorio-diario">
                        <button type="submit" className="btn-buscar">Buscar</button>
                        <Link className="btn-voltar-relatorio" to={"/relatorios"}><button  title="Clique para voltar">Voltar</button></Link>
                    </div>
                </form>
                
            </section>
                
        </div>
    );
}