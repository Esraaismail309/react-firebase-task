import React, { useEffect, useState } from "react";
import db from "./../firebase/index";
import { Btn } from "./Btn";
import { Form } from "./Form";
import "./style.css";
export const Home = () => {
  const [usersList, setUsersList] = useState([]);
  // const [updatedName, setUpdatedName] = useState("");
  // const [updatedAge, setUpdatedAge] = useState("");
  const [dataIdToBeUpdated, setDataIdToBeUpdated] = useState("");
  const [mood, setMood] = useState("add");
  const [index, setindex] = useState(0);
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

  const addDataToDocs = async (e, userName, userAge) => {
    e.preventDefault();
    await db.collection("Users").add({
      Name: userName,
      Age: userAge,
    });
  };
  const updateDataDocs = async (e, updatedName, updatedAge) => {
    e.preventDefault();
    await db.collection("Users").doc(dataIdToBeUpdated).update({
      Name: updatedName,
      Age: updatedAge,
    });
    setMood("add");
  };
  const deleteDocs = async (id) => {
    await db.collection("Users").doc(id).delete();
  };
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Add Users</h1>
      {mood === "add" ? (
        <Form
          handleSubmit={addDataToDocs}
          handler="add"
          {...usersList}
          index={index}
        />
      ) : (
        <>
          <Form
            handleSubmit={updateDataDocs}
            handler="update"
            {...usersList}
            index={index}
          />
        </>
      )}
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
                usersList.map((user, index) => {
                  return (
                    <tr key={user.id}>
                      <td>
                        <p>{user.data.Name}</p>
                      </td>
                      <td>
                        <p> {user.data.Age}</p>
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            setMood("update");
                            setindex(index);
                            setDataIdToBeUpdated(user.id);
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
