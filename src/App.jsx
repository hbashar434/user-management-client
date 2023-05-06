import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = { name, gender, email };
    fetch("http://localhost:5000/users", {
      method: "POSt",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const newUsers = [...users, data];
        setUsers(newUsers);
        setName("");
        setEmail("");
        setGender("");
      });
  };
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);
  return (
    <>
      <h2>User Management System</h2>
      <h3>Number of Users : {users.length}</h3>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
        }}
        onSubmit={handleSubmit}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <label
            htmlFor="name"
            style={{
              flexBasis: "30%",
              textAlign: "start",
              marginRight: "10px",
            }}
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ flexBasis: "70%" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <label
            htmlFor="email"
            style={{
              flexBasis: "30%",
              textAlign: "start",
              marginRight: "10px",
            }}
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ flexBasis: "70%" }}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <label
            htmlFor="gender"
            style={{
              flexBasis: "30%",
              textAlign: "start",
              marginRight: "10px",
            }}
          >
            Gender:
          </label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
            style={{ flexBasis: "70%" }}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button type="submit">Add User</button>
      </form>
      {users.map((user) => (
        <div
          key={user.id}
          style={{ border: "2px solid green", margin: "10px" }}
        >
          <p>{user.name}</p>
          <p>{user.gender}</p>
          <p>{user.email}</p>
        </div>
      ))}
    </>
  );
}

export default App;
