import Avatar from "components/Avatar/Avatar";
import { ProjectModelWithId } from "types/project.model";

interface ProjectSummaryProps {
    project: ProjectModelWithId
}

const ProjectSummary = ({ project }: ProjectSummaryProps) => {
    return (
        <div>
            <div className="project-summary">
                <h2 className="title">{project.name}</h2>
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
        </div>
    )
}

export default ProjectSummary;