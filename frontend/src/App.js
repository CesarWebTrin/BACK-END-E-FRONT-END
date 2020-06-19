import React, { useState, useEffect } from 'react';
import api from './services/api'

import './App.css';

import backgroundImage from './assets/background.jpg';

import Header from './components/Header';

/*
 Componente
 Propriedade
 Estado e Imutabilidade
*/

function App(){
    const [projects, setProjects] = useState(['Desenvolvimento de app', 'Front-end web']);

    //useState retorna um array com 2 posições

    useEffect(() => {
        api.get('projects').then(response =>{
            console.log(response);
        });
    }, []); //[] = array de dependências

    
    // 1. Variável com o seu valor inicial 
    // 2. Funcão para atualizarmos esse valor

    function handleAddProject(){
        //projects.push(`Novo projeto ${Date.now()}`);

        //Imutabilidade
        setProjects([...projects, `Novo projeto ${Date.now()}`]);
        //...percorrendo o array de projetos e copiando tudo desse array
    }

    return(
        <>
            <Header title="Homepage" />

       
            <ul>
                {projects.map(project => <li key={project}>{project}</li>)}
            </ul>

            <button type="button" onClick={handleAddProject}>Adicionar projeto</button>

               
        </>//fragments criar conteiners para dividir dois frames
    );
}

export default App;