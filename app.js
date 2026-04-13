import { getUsers } from "./db/data";

export async function App() {
  const users = await getUsers();

  return (
    <div>
      <h1>list of all users</h1>

      <ul>
        {users.map((user) => {
          return (
            <li key={user.id}>
              {user.name}
              {user.email}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
