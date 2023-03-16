import ProjectList from 'components/ProjectList/ProjectList';
import { useCollection } from 'hooks/useCollection';
import { useEffect, useState } from 'react';
import { ProjectModelWithId } from 'types/project.model';
import './Dashboard.css';
import ProjectFilter from './ProjectFilter';

import firebase from "firebase/app";
import { useAuthContext } from 'hooks/useAuthContext';

interface DashboardProps {}

const Dashboard = ({ }: DashboardProps) => {

  const [currentFilter, setCurrentFilter] = useState<string>("all");
  const [query, setQuery] = useState<[string | firebase.firestore.FieldPath, firebase.firestore.WhereFilterOp, any] | undefined>(undefined);

  const { documents: projects, error } = useCollection<ProjectModelWithId>("projects", query);

  const { user } = useAuthContext();

  const changeFilter = (newFilter: string) => {
    setCurrentFilter(newFilter);
  }

  useEffect(() => {
    switch(currentFilter) {
      case "all":
        setQuery(undefined);
        break;
      case "mine":
        setQuery(["createdBy.id", "==", user?.uid]);
        break;
      default:
        setQuery(["category", "==", currentFilter]);
        break;
        
    }
  }, [currentFilter, setQuery])
  

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
