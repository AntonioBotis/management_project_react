import ProjectsSidebar from "./components/ProjectsSidebar.jsx";
import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import { useState } from "react";
import SelectedProject from "./components/SelectedProject.jsx";

function App() {
    const [projectsState, setProjectsState] = useState({
        selectedProjectId: undefined, // undefined = ecran de start
        projects: [],
        tasks: [],
    });
    function handleAddTask(text)
    {
        setProjectsState((prevState) => {
            const taskId = Math.random();
            const newTask = {
                text:text,
                projectId:prevState.selectedProjectId,
                id: taskId,


            };

            return {
                ...prevState,
                selectedProjectId: undefined,
                tasks: [newTask,...prevState.tasks],
            };
        });
    }
    function handleDeleteTask(id)
    {
        setProjectsState((prevState) => {
            return {
                ...prevState,

                    tasks: prevState.tasks.filter((task)=> task.id!==id)
            };
        });
    }
    function handleCancelAddProject() {
        setProjectsState(prevState => {
            return {
                ...prevState,
                selectedProjectId: undefined, // înapoi la NoProjectSelected
            };
        });
    }

    function handleSelectProject(id) {
        setProjectsState((prevState) => {
            return {
                ...prevState,
                selectedProjectId: id,
            }
        })
    }

    function handleStartAddProject() {
        setProjectsState(prevState => {
            return {
                ...prevState,
                selectedProjectId: null, // intrăm în modul NewProject
            };
        });
    }

    function handleEndAddProject(projectData) {
        setProjectsState(prevState => {
            const projectId = Math.random();
            const newProject = {
                ...projectData,
                id: projectId,
            };

            return {
                ...prevState,
                selectedProjectId: undefined,        // după salvare, înapoi la ecranul de start
                projects: [...prevState.projects, newProject],
            };
        });
    }
    function handleDeleteProject() {
        setProjectsState((prevState) => {
            return {
                ...prevState,
                selectedProjectId: undefined,
                projects: prevState.projects.filter((project)=> project.id!==prevState.selectedProjectId)// intrăm în modul NewProject
            };
        });
    }
    const selectedProject = projectsState.projects.find(project=> project.id===projectsState.selectedProjectId );
    let content=(<SelectedProject project={selectedProject} onDelete={handleDeleteProject} onAddTask={handleAddTask} onDeleteTask={handleDeleteTask} tasks={projectsState.tasks} />);

    if (projectsState.selectedProjectId === null) {
        content = (
            <NewProject
                onAdd={handleEndAddProject}
                onCancel={handleCancelAddProject}
            />
        );
    } else if (projectsState.selectedProjectId === undefined) {
        content = (
            <NoProjectSelected onStartAddProject={handleStartAddProject} />
        );
    }

    return (
        <main className="h-screen my-8 flex gap-8">
            <ProjectsSidebar
                onStartAddProject={handleStartAddProject}
                projects={projectsState.projects}
                onSelectProject={handleSelectProject}
                selectedProjectId={projectsState.selectedProjectId}
            />
            {content}
        </main>
    );
}

export default App;
