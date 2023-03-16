import ProjectList from 'components/ProjectList/ProjectList';
import { useCollection } from 'hooks/useCollection';
import { useState } from 'react';
import { ProjectModelWithId } from 'types/project.model';
import './Dashboard.css';
import ProjectFilter from './ProjectFilter';

interface DashboardProps {}

const Dashboard = ({ }: DashboardProps) => {

  const [currentFilter, setCurrentFilter] = useState<string>("all");

  const { documents: projects, error } = useCollection<ProjectModelWithId>("projects");

  const changeFilter = (newFilter: string) => {
    setCurrentFilter(newFilter);
  }

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>

      {error && <p className="error">{error}</p>}

      {projects && <ProjectFilter currentFilter={currentFilter} changeFilter={changeFilter} />}

      {projects && <ProjectList projects={projects} />}
      
    </div>
  );
}

export default Dashboard;
