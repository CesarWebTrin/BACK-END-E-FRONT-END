const express = require('express'); 
const cors = require('cors');

// faz a requisição do Unite Universal id

const { uuid, isUuid } = require('uuidv4');

//faz a chamada do framework
const app = express();

app.use(cors());

app.use(express.json());

//através do protocólo HTTP get faz a chamada para a página

const projects = [];

function logRequests(request, response, next){
    const { method, url  } = request;

    const logLabel = `[${method.toUpperCase()}] ${url}`;

    console.log(logLabel);

    return next(); // Próximo middleware
}

function validatepProjectId(request, response, next){
    const { id } = request.params;

    if(!isUuid(id)){
        return response.status(400).json({error: 'Invalid project ID'});
    }

    return next();
}

app.use(logRequests);
app.use('/projects/:id', validatepProjectId);

app.get('/projects', (request, response) =>{


    const { title }  = request.query;
    
    const results = title
     ? projects.filter(project => project.title.includes(title)) 
     : projects;

    return response.json(results);
});

app.post('/projects', (request, response) =>{

    const {title, owner} = request.body;
    
    const project = { id: uuid(), title, owner };

    projects.push(project);

    return response.json(project);

});

app.put('/projects/:id', (request, response) =>{

    const { id } = request.params;
    const {title, owner} = request.body;

    const projectIndex = projects.findIndex(project => project.id === id);

    if(projectIndex < 0){
        return response.status(400).json({error: 'Project not found'});
    }

    const project = {
        id,
        title,
        owner
    };

    projects[projectIndex] = project;

    return response.json(project);
});

app.delete('/projects/:id', (request, response) =>{

    const { id } = request.params;

    const projectIndex = projects.findIndex(project => project.id === id);

    if(projectIndex < 0){
        return response.status(400).json({error: 'Project not found'});
    }

    projects.splice(projectIndex, 1);

    return response.status(204).send();
});

//define a porta que será utilizada pela aplicação

app.listen(3333, () =>{
    console.log('🚀Back-end started');
});