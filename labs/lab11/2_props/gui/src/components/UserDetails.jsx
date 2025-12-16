function UserDetails(props) {
  const { item, onCancel } = props;

  if (!item) return null;

  return (
    <div className="user-details" style={style}>
      <h3>User details:</h3>
      <p>
        <strong>Id:</strong> {item.id}
      </p>
      <p>
        <strong>Username:</strong> {item.username}
      </p>
      <p>
        <strong>Full Name:</strong> {item.fullName}
      </p>
      <p>
        <strong>Type:</strong> {item.type}
      </p>

      <button onClick={onCancel}>Închide</button>
    </div>
  );
}

export default UserDetails;
