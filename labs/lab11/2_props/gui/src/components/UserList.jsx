import { useEffect, useState } from "react";
import User from "./User";
import UserForm from "./UserForm";
import UserDetails from "./UserDetails";
import "./UserList.css";

const SERVER = "http://localhost:8080";

function UserList(props) {
  const [users, setUsers] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);

  const getUsers = async () => {
    const response = await fetch(`${SERVER}/users`);
    const data = await response.json();
    setUsers(data);
  };

  const addUser = async (user) => {
    await fetch(`${SERVER}/users`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    getUsers();
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="user-list">
      {users.map((e) => (
        <User key={e.id} item={e} onSelect={() => setSelectedUser(e)} />
      ))}

      <UserForm onAdd={addUser} />

      {selectedUser && (
        <UserDetails
          item={selectedUser}
          onCancel={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
}

export default UserList;
