function SuperUser({ item }) {
  return (
    <div className="user super-user">
      <div className="username">⭐ {item.username} ⭐</div>
      <div className="fullName">{item.fullName}</div>
      <small style={{ color: "goldenrod" }}>super user</small>
    </div>
  );
}

export default SuperUser;
