/*
function User() {
  return (
    <div>
      <h2>Harnish Patel</h2>
      <p>Java Architect</p>
    </div>
  );
}
*/
function User({ name, role, mobileNumber}) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{role}</p>
      <p>{mobileNumber}</p>
      
    </div>
  );
}

export default User;