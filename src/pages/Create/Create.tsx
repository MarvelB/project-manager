import { useState } from 'react';
import { UserModel } from 'types';
import './Create.css';

interface CreateProps {}

const Create = ({ }: CreateProps) => {

  const [name, setName] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [assignedUsers, setAssignedUsers] = useState<UserModel[]>([]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(name, details, dueDate);
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
