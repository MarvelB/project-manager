import Avatar from "components/Avatar/Avatar";
import { useAuthContext } from "hooks/useAuthContext";
import { useFirestore } from "hooks/useFirestore";
import { useHistory } from "react-router-dom";
import { ProjectModelWithId } from "types/project.model";

interface ProjectSummaryProps {
    project: ProjectModelWithId
}

const ProjectSummary = ({ project }: ProjectSummaryProps) => {

    const { deleteDocument, response } = useFirestore<ProjectModelWithId>("projects");
    const history = useHistory();

    const { user } = useAuthContext();

    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        deleteDocument(project.id);

        history.push("/");
    }

    return (
        <div>
            <div className="project-summary">
                <h2 className="title">{project.name}</h2>
                <p>By {project.createdBy.displayName}</p>
                <p className="due-date">Project due by {project.dueDate.toDate().toDateString()}</p>
                <p className="details">
                    {project.details}
                </p>
                <h4>Project is assigned to:</h4>
                <div className="assigned-users">
                    {project.assignedUsers.map(user => (
                        <div key={user.photoURL}>
                            <Avatar imageSrc={user.photoURL} />
                        </div>
                    ))}
                </div>
            </div>
            {project.createdBy.id === user?.uid && (
                <button
                    className="btn"
                    onClick={handleDelete}
                    disabled={response.isLoading}
                >{ response.isLoading ? "Submitting" : "Mark as complete" }</button>
            )}
        </div>
    )
}

export default ProjectSummary;