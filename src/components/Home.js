import React, { useEffect, useState } from "react";
import db from "./../firebase/index";
import "./style.css";
export const Home = () => {
  const [usersList, setUsersList] = useState([]);
  const [userName, setUserName] = useState("");
  const [userAge, setUserAge] = useState("");
  const [updatedName, setUpdatedName] = useState("");
  const [updatedAge, setUpdatedAge] = useState("");
  const [dataIdToBeUpdated, setDataIdToBeUpdated] = useState("");

  const getUsers = async () => {
    await db.collection("Users").onSnapshot((snapshot) => {
      let users = snapshot.docs.map((user) => ({
        id: user.id,
        data: user.data(),
      })); //

      setUsersList([...users]);
    });
  };
  useEffect(() => {
    getUsers();
  }, []);

  const addDataToDocs = async (e) => {
    e.preventDefault();
    await db.collection("Users").add({
      Name: userName,
      Age: userAge,
    });
    setUserAge("");
    setUserName("");
  };
  const updateDataDocs = async (e) => {
    e.preventDefault();
    await db.collection("Users").doc(dataIdToBeUpdated).update({
      Name: updatedName,
      Age: updatedAge,
    });
    setUpdatedAge("");
    setUpdatedName("");
    setDataIdToBeUpdated("");
  };
  const deleteDocs = async (id) => {
    await db.collection("Users").doc(id).delete();
  };
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Add Users</h1>
      {!dataIdToBeUpdated ? (
        <form onSubmit={addDataToDocs}>
          <label> Enter your name</label>
          <input
            type="text"
            placeholder="enter your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          <label>Enter your age</label>
          <input
            type="number"
            placeholder="enter your age"
            value={userAge}
            onChange={(e) => setUserAge(e.target.value)}
          />
          <button type="submit"> Add</button>
        </form>
      ) : (
        <form onSubmit={updateDataDocs}>
          <label> Enter your name</label>
          <input
            type="text"
            placeholder="enter your name"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
          />

          <label>Enter your age</label>
          <input
            type="number"
            placeholder="enter your age"
            value={updatedAge}
            onChange={(e) => setUpdatedAge(e.target.value)}
          />
          <button type="submit"> Update</button>
        </form>
      )}
      {/* <Form addDataToDocs={addDataToDocs} userName={userName} userAge={userAge}  /> */}

      {usersList?.length !== 0 ? (
        <>
          <h2 style={{ textAlign: "center" }}>User Data</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {usersList &&
                usersList.map((user) => {
                  return (
                    <tr
                      key={user.id}
                      style={{ borderBottom: "1px solid black" }}
                    >
                      <td>
                        <p>{user.data.Name}</p>
                      </td>
                      <td>
                        <p> {user.data.Age}</p>
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            setDataIdToBeUpdated(user.id);
                            setUpdatedName(user.data.Name);
                            setUpdatedAge(user.data.Age);
                          }}
                        >
                          Update
                        </button>
                      </td>
                      <td>
                        <button onClick={() => deleteDocs(user.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </>
      ) : (
        <h2 style={{ textAlign: "center" }}>your list is empty</h2>
      )}
    </div>
  );
};
