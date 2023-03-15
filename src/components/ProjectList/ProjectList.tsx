import { ProjectModelWithId } from 'types/project.model';
import './ProjectList.css';

interface ProjectListProps {
  projects: ProjectModelWithId[]
}

const ProjectList = ({ projects }: ProjectListProps) => {
  return (
    <div>
      {projects.length === 0 && <p>No projects</p>}
      {projects.map(project => (
        <div key={project.id}>{project.name}</div>
      ))}
    </div>
  );
}

export default ProjectList;
