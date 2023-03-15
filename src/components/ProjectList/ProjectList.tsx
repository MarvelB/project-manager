import Avatar from 'components/Avatar/Avatar';
import { Link } from 'react-router-dom';
import { ProjectModelWithId } from 'types/project.model';
import './ProjectList.css';

interface ProjectListProps {
  projects: ProjectModelWithId[]
}

const ProjectList = ({ projects }: ProjectListProps) => {
  return (
    <div className="project-list">
      {projects.length === 0 && <p>No projects</p>}
      {projects.map(project => (
        <Link key={project.id} to={`/projects/${project.id}`}>
          <h4>{project.name}</h4>
          <p>Due by {project.dueDate.toDate().toDateString()}</p>
          <div className="assigned-to">
            <ul>
              {project.assignedUsers.map(user => (
                <li key={user.photoURL}>
                  <Avatar imageSrc={user.photoURL} />
                </li>
              ))}
            </ul>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ProjectList;
