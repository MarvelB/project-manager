import { useState } from 'react';
import Select from 'react-select';
import { UserModel } from 'types';
import { ProjectCategories, ProjectCategorySelect } from 'types/categories.model';
import './Create.css';
import s from 'string';

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
  const [assignedUsers, setAssignedUsers] = useState<UserModel[]>([]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(name, details, dueDate, category);
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
        </label>

        <button className="btn">Add project</button>

      </form>

    </div>
  );
}

export default Create;
