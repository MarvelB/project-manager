import { useEffect, useState } from 'react';
import Select from 'react-select';
import { UserModelWithId } from 'types';
import { ProjectCategories, ProjectCategorySelect } from 'types/categories.model';
import './Create.css';
import s from 'string';
import { useCollection } from 'hooks/useCollection';

const projectCategorieOptions: ProjectCategorySelect[] = [
  { value: ProjectCategories.DEVELOPMENT, label: s(ProjectCategories.DEVELOPMENT).capitalize().toString() },
  { value: ProjectCategories.DESIGN, label: s(ProjectCategories.DESIGN).capitalize().toString() },
  { value: ProjectCategories.SALES, label: s(ProjectCategories.SALES).capitalize().toString() },
  { value: ProjectCategories.MARKETING, label: s(ProjectCategories.MARKETING).capitalize().toString() },
]

interface CreateProps {}

const Create = ({ }: CreateProps) => {

  const [name, setName] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [category, setCategory] = useState<ProjectCategories | "">("");
  const [assignedUsers, setAssignedUsers] = useState<UserModelWithId[]>([]);
  const [formError, setFormError] = useState<string>("");

  const [userOptions, setUserOptions] = useState<{value: UserModelWithId, label: string}[]>([]);

  const { documents: users } = useCollection<UserModelWithId>("users");

  useEffect(() => {
    if (users && users.length) {
      const innerOptions = users.map(user => {
        return {value: user, label: user.displayName}
      })

      setUserOptions(innerOptions);
    }
  }, [users]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormError("");

    if (category == "") {
      setFormError("Select a project category");
      return;
    }

    if (assignedUsers.length == 0) {
      setFormError("Assign the project to at least one user");
      return;
    }

    console.log(name, details, dueDate, category, assignedUsers);
  }

  return (
    <div className="create-form">
      <h2 className="page-title">Create new project</h2>

      <form onSubmit={handleFormSubmit}>

        <label>
          <span>Project name:</span>
          <input
            type="text"
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            value={name}
          />
        </label>

        <label>
          <span>Project details:</span>
          <textarea
            required
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDetails(e.target.value)}
            value={details}
          />
        </label>

        <label>
          <span>Projec due date:</span>
          <input
            type="date"
            required
            onChange={(e: React.ChangeEvent<HTMLDataElement>) => setDueDate(e.target.value)}
            value={dueDate}
          />
        </label>

        <label>
          <span>Project category</span>
          <Select
            options={projectCategorieOptions}
            onChange={(option) => setCategory(option?.value as ProjectCategories ?? "")}
          />
        </label>

        <label>
          <span>Assigned to</span>
          <Select
            options={userOptions}
            onChange={(selectedOptions) => setAssignedUsers(selectedOptions.map(innerOption => innerOption.value))}
            isMulti
          />
        </label>

        <button className="btn">Add project</button>

        {formError && <p className="error">{formError}</p>}

      </form>

    </div>
  );
}

export default Create;
