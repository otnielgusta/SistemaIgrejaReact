import React, { useEffect, useRef } from 'react';
import './styles.css';
import img_entrada from '../../assets/entrada.json';
import lottie from 'lottie-web';
import {Link} from 'react-router-dom';


export default function Principal(){

    const entrada = useRef(null);
    const saida = useRef(null);
    const relatorio = useRef(null);
    useEffect(()=>{
        lottie.loadAnimation({
            container: entrada.current, // the dom element
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: require('../../assets/entrada.json'), // the animation data
            
            });
            lottie.loadAnimation({
                container: saida.current, // the dom element
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: require('../../assets/saida.json'), // the animation data
                
                });
            lottie.loadAnimation({
                container: relatorio.current, // the dom element
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: require('../../assets/relatorio.json'), // the animation data
                
                });
    },[])
    return(
        <div className="container-principal">
            
           <section className="content-principal">
                <div class="imagem">
                        
                </div>
                <section className="opcoes">
                   <div className="animacao" >
                       <div className="animacao-opcoes" ref={entrada} >
                            <Link to={"/adicionar-entradas"} className="btn-entradas" ></Link>
                        </div>
                        <Link to={"/adicionar-entradas"} className="links" >Entradas</Link>

                    </div>
                    <div className="animacao" >
                       <div className="animacao-opcoes" ref={saida} >
                            <Link to={"/adicionar-saidas"} className="btn-saidas" ></Link>
                        </div>
                        <Link to={"/adicionar-saidas"} className="links" >Saídas</Link>

                    </div>
                    <div className="animacao" >
                       <div className="animacao-opcoes" ref={relatorio} >
                            <Link to={"//relatorios"} className="btn-relatorios" ></Link>
                        </div>
                        <Link to={"/relatorios"} className="links" >Relatórios</Link>

                    </div>
                    
                    
                </section>
                <div className="btn-relatorio-diario">
                       
                       <Link className="btn-voltar" to={"/"}><button  title="Clique para voltar">Voltar</button></Link>
           </div>
           </section>
           
        </div>
    );
}