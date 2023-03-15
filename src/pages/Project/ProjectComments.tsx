import { timeStamp } from "firebase/config";
import { useAuthContext } from "hooks/useAuthContext";
import { useState } from "react"
import { ProjectCommentModel } from "types/project.model";

interface ProjectCommentsProps {

}

const ProjectComments = ({ }: ProjectCommentsProps) => {

    const [newComment, setNewComment] = useState<string>("");
    const { user } = useAuthContext();

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

        console.log(innerComment);
    }

    return(
        <div className="project-comments">
            <h4>Project Comments</h4>

            <form className="add-comment" onSubmit={handleFormSubmit}>

                <label>
                    <span>Add new comment:</span>
                    <textarea
                        required
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewComment(e.target.value)}
                        value={newComment}
                    ></textarea>
                </label>

                <button className="btn">Add comment</button>

            </form>

        </div>
    )
}

export default ProjectComments