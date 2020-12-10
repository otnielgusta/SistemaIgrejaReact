import React, { useState, useEffect } from 'react'
import {Link, useHistory} from 'react-router-dom';
import SweetAlert from 'sweetalert2-react';
import swal from 'sweetalert2';
import api from '../../../services/api';


import './styles.css';



export default function RelatorioMensal(){

    const [ano, setAno] = useState([]);
    const [anoRelatorio, setAnoRelatorio] = useState([]);
    const [mes, setMes] = useState([]);
    const history = useHistory();

    useEffect(()=>{
        api.get('/relatorio-mensal')
            .then(response =>{
                setAno(response.data)
                
            })
    },[])

    

    async function handleMensal(e){
        e.preventDefault();
        const mesElement = document.querySelector("select.select-mes");
        const anoElement = document.querySelector("select.select-ano");
        console.log(mesElement.value, anoElement.value);
        if(mesElement.value == 777 || anoElement.value == 777){
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
                let mesElement = document.querySelector("select.select-mes");
                let option = mesElement.children[mesElement.selectedIndex];
                let texto = option.textContent;
                localStorage.setItem('mes-mensal-nome', texto);
                localStorage.setItem('mes-mensal', mes);
                localStorage.setItem('ano-mensal', anoRelatorio);
                
                history.push('/relatorio-mensal-result');
                
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
                <form onSubmit={handleMensal}>
                    <h1>Relatório Mensal</h1>
                    <div className="data-relatorio-mensal">
                        <div className="mes-mensal">
                            <label>Data: </label>
                            <select
                                className="select-mes"
                                value={mes}
                                onChange={e=> setMes(e.target.value)}>
                                <option value="777">Escolha o mês</option>
                                <option value="01">Janeiro</option>
                                <option value="02">Fevereiro</option>
                                <option value="03">Março</option>
                                <option value="04">Abril</option>
                                <option value="05">Maio</option>
                                <option value="06">Junho</option>
                                <option value="07">Julho</option>
                                <option value="08">Agosto</option>
                                <option value="09">Setembro</option>
                                <option value="10">Outubro</option>
                                <option value="11">Novembro</option>
                                <option value="12">Dezembro</option>
                            </select>
                        </div>

                        <div className="ano-mensal">
                        <label>Ano: </label>
                            <select
                                className="select-ano"
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