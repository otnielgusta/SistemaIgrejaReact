import React from 'react';
import './styles.css';

export default function Login(){
    return(
        <div className="container-login">
            <section className="form-login">
                <form>
                    <h2>Faça o Login</h2>
                    <input placeholder="Usuario"></input>
                    <input type="password" placeholder="Senha"></input>
                    <button type="submit">Entrar</button>
                    

                </form>

            </section>
        </div>
    );
}