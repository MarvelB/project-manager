import ProjectList from 'components/ProjectList/ProjectList';
import { useCollection } from 'hooks/useCollection';
import { ProjectModelWithId } from 'types/project.model';
import './Dashboard.css';

interface DashboardProps {}

const Dashboard = ({ }: DashboardProps) => {

  const { documents: projects, error } = useCollection<ProjectModelWithId>("projects");

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>

      {error && <p className="error">{error}</p>}
      {projects && <ProjectList projects={projects} />}
      
    </div>
  );
}

export default Dashboard;
