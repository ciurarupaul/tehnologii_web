function RegularUser({ item }) {
  return (
    <div className="user regular-user">
      <div className="username">{item.username}</div>
      <div className="fullName">{item.fullName}</div>
      <small>regular user</small>
    </div>
  );
}

export default RegularUser;
