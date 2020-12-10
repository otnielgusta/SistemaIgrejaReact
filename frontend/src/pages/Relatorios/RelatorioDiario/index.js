import React, { useState, useEffect } from 'react'
import {Link, useHistory} from 'react-router-dom';
import SweetAlert from 'sweetalert2-react';
import swal from 'sweetalert2';
import api from '../../../services/api';


import './styles.css';



export default function RelatorioDiario(){
    const [data, setData] = useState('');

    const history = useHistory();

    async function handleDiario(e){
        e.preventDefault();
        const dataElement = document.querySelector("input");
        if(dataElement.value ==""){
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
                const dataSelecionada = document.querySelector("input");
                localStorage.setItem('data-diario', dataSelecionada.value);
                
                history.push('/relatorio-diario-result');
                
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
                <form onSubmit={handleDiario}>
                    <h1>Relatório diário</h1>
                    <div className="data-relatorio-diario">
                        <label>Data: </label>
                        <input type="date"></input>
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