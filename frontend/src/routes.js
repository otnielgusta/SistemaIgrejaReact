import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Login';
import Principal from './pages/Principal';
import Entradas from './pages/Entradas';
import Saidas from './pages/Saidas';
import Relatorios from './pages/Relatorios/TodosRelatorios';
import RelatorioDiario from './pages/Relatorios/RelatorioDiario';
import RelatorioDiarioResult from './pages/Relatorios/RelatorioDiarioResult';
import RelatorioMensal from './pages/Relatorios/RelatorioMensal';
import RelatorioMensalResult from './pages/Relatorios/RelatorioMensalResult';
import RelatorioAnual from './pages/Relatorios/RelatorioAnual';
import RelatorioAnualResult from './pages/Relatorios/RelatorioAnualResult';
import EditarEntradas from './pages/EditarEntrada';







export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon}/>
                <Route path="/igreja" component={Principal}/>
                <Route path="/adicionar-entradas" component={Entradas}/>
                <Route path="/adicionar-saidas" component={Saidas}/>
                <Route path="/relatorios" component={Relatorios}/>
                <Route path="/relatorio-diario" component={RelatorioDiario}/>
                <Route path="/relatorio-diario-result" component={RelatorioDiarioResult}/>
                <Route path="/relatorio-mensal" component={RelatorioMensal}/>
                <Route path="/relatorio-mensal-result" component={RelatorioMensalResult}/>
                <Route path="/relatorio-anual" component={RelatorioAnual}/>
                <Route path="/relatorio-anual-result" component={RelatorioAnualResult}/>
                <Route path="/editar-entradas" component={EditarEntradas}/>

               


                
                
            </Switch>
        </BrowserRouter>
    );
}