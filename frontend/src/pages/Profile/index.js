import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';
import logoImg from '../../assets/logo.svg';

import './styles.css';

export default function Profile() {

    const [incidents, setIncidents] = useState([]);
    const history = useHistory();
    const ongId = sessionStorage.getItem('ongId');
    const ongName = sessionStorage.getItem('ongName');

    /**
     * Vai executar quando carregar o component e quando 
     * o ongId mudar.
     */
    useEffect(() => {
        api.get('/profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);


    async function handleDeleteIncident(id){
        try{

            await api.delete(`/incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });

            //Geito com menos custo do servidor de atualizar a lista exibita.
            setIncidents(incidents.filter(incident => incident.id !== id));

        } catch (err) {
            
            alert('Erro ao tentar deletar caso, tente novamente.');
        }
    }

    function handleLogout(){

        sessionStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">
                    Cadastrar novo caso
                </Link>

                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>

                {incidents.map(incident => {
                    return (
                        <li key={incident.id}>

                            <strong>Caso : </strong>
                            <p>{incident.title}</p>

                            <strong>Descrição : </strong>
                            <p>{incident.description}</p>

                            <strong>Valor : </strong>
                            <p>{ Intl.NumberFormat('pt-BR', { style : 'currency', currency: 'BRL'}).format(incident.value) }</p>


                            <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                                <FiTrash2 size={20} color="#a8a8b3" />
                            </button>

                        </li>   
                    )
                })}                         

            </ul>

        </div>
    );
}