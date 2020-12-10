import React, {useEffect, useRef} from 'react';
import './styles.css';
import lottie from 'lottie-web';
import {Link} from 'react-router-dom';


export default function Relatorios(){
    const diario = useRef(null);
    const mensal = useRef(null);
    const anual = useRef(null);
    useEffect(()=>{
        lottie.loadAnimation({
            container: diario.current, // the dom element
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: require('../../../assets/diario2.json'), // the animation data
            
            });
            lottie.loadAnimation({
                container: mensal.current, // the dom element
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: require('../../../assets/mensal2.json'), // the animation data
                
                });
            lottie.loadAnimation({
                container: anual.current, // the dom element
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: require('../../../assets/anual.json'), // the animation data
                
                });
    },[])

    return(
        <div className="container-principal">
            
           <section className="content-relatorios">
                
                <section className="opcoes">
                   <div className="animacao" >
                       <div className="animacao-opcoes" ref={diario} >
                            <Link to={"/relatorio-diario"} className="btn-entradas" ></Link>
                        </div>
                        <Link to={"/relatorio-diario"} className="links" >Diário</Link>

                    </div>
                    <div className="animacao" >
                       <div className="animacao-opcoes" ref={mensal} >
                            <Link to={"/relatorio-mensal"} className="btn-saidas" ></Link>
                        </div>
                        <Link to={"/relatorio-mensal"} className="links" >Mensal</Link>

                    </div>
                    <div className="animacao" >
                       <div className="animacao-opcoes" ref={anual} >
                            <Link to={"/relatorio-anual"} className="btn-relatorios" ></Link>
                        </div>
                        <Link to={"/relatorio-anual"} className="links" >Anual</Link>

                    </div>
                    
                    
                </section>
                <div className="btn-relatorio-diario">
                       
                       <Link className="btn-voltar" to={"/igreja"}><button  title="Clique para voltar">Voltar</button></Link>
           </div>
           </section>
           
        </div>
    );
}