import { useDocument } from 'hooks/useDocument';
import { useParams } from 'react-router-dom';
import { ProjectModelWithId } from 'types/project.model';
import './Project.css';
import ProjectComments from './ProjectComments';
import ProjectSummary from './ProjectSummary';

interface ProjectProps {}

const Project = ({ }: ProjectProps) => {

  const { id } = useParams<{id: string}>();

  const { document: project, error } = useDocument<ProjectModelWithId>("projects", id);

  if (error) {
    return <div className="error">{error}</div>
  }

  if (!project) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="project-details">
      <ProjectSummary project={project} />

      <ProjectComments project={project} />
    </div>
  );
}

export default Project;
