import Avatar from "components/Avatar/Avatar";
import { formatDistanceToNow } from "date-fns";
import { timeStamp } from "firebase/config";
import { useAuthContext } from "hooks/useAuthContext";
import { useFirestore } from "hooks/useFirestore";
import { useEffect, useState } from "react"
import { ProjectCommentModel, ProjectModel, ProjectModelWithId } from "types/project.model";

interface ProjectCommentsProps {
    project: ProjectModelWithId;
}

const ProjectComments = ({ project }: ProjectCommentsProps) => {

    const [newComment, setNewComment] = useState<string>("");
    const { user } = useAuthContext();
    const { updateDocument, response } = useFirestore<ProjectModel>("projects");

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const innerComment: ProjectCommentModel = {
            userDisplayName: user?.displayName ?? "",
            userPhotoURL: user?.photoURL ?? "",
            body: newComment,
            createdAt: timeStamp.fromDate(new Date()),
            // The following is not the best way to do it. Need to come up with something better
            id: Math.random(),
        }

        await updateDocument(project.id, { comments: [...project.comments, innerComment] });
    }

    useEffect(() => {
        if (response.success) {
            setNewComment("");
        }
    }, [response]);

    return(
        <div className="project-comments">
            <h4>Project Comments</h4>

            <ul>
                {project.comments.length && project.comments.map(comment => (
                    <li key={comment.id}>
                        <div className="comment-author">
                            <Avatar imageSrc={comment.userPhotoURL} />
                            <p>{comment.userDisplayName}</p>
                        </div>
                        <div className="comment-date">
                            <p>{formatDistanceToNow(comment.createdAt.toDate(), { addSuffix: true})}</p>
                        </div>
                        <div className="comment-content">{comment.body}</div>
                    </li>
                ))}
            </ul>

            <form className="add-comment" onSubmit={handleFormSubmit}>

                <label>
                    <span>Add new comment:</span>
                    <textarea
                        required
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewComment(e.target.value)}
                        value={newComment}
                    ></textarea>
                </label>

                <button
                    className="btn"
                    disabled={response.isLoading}
                >{ response.isLoading ? "Adding" : "Add comment" }</button>

            </form>

        </div>
    )
}

export default ProjectComments