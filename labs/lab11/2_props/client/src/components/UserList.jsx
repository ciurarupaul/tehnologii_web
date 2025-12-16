import { useEffect, useState } from "react";
import User from "./User";
import "./UserList.css";
import SuperUser from "./SuperUser";
import RegularUser from "./RegularUser";

const SERVER = "http://localhost:8080";

function UserList(props) {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const response = await fetch(`${SERVER}/users`);
    const data = await response.json();
    console.warn(data);
    setUsers(data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="user-list">
      {/* {users.map((e) => (
        <User key={e.id} item={e} />
      ))} */}

      {users.map((user) => {
        if (user.type === "super-user") {
          return <SuperUser key={user.id} item={user} />;
        } else {
          return <RegularUser key={user.id} item={user} />;
        }
      })}
    </div>
  );
}

export default UserList;
