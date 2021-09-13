import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

import "./index.css";

const UserDetails = (props) => {
  const { details, onDeleteUser } = props;
  const { id, name, email, role, isChecked } = details;

  const onSelectCheckbox = () => {};

  const onDeleteItem = () => {
    onDeleteUser(id);
  };

  const onClickEdit = () => {

  }

  return (
    <>
      <li className="list-container">
        <input
          type="checkbox"
          className="input-element"
          onChange={onSelectCheckbox}
        />
        <p className="para">{name}</p>
        <p className="para">{email}</p>
        <p className="para">{role}</p>
        <div>
          <button className="edit-button" onClick={onClickEdit}>
            <BiEdit />
          </button>
          <button className="edit-button" onClick={onDeleteItem}>
            <AiFillDelete className="delete-icon" />
          </button>
        </div>
      </li>
      <hr className="hr-line"/>
    </>
  );
};

export default UserDetails;
