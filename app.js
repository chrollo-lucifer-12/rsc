import { Suspense } from "react";
import { getUsers } from "./db/data";

export async function App() {
  const usersPromise = getUsers();

  return (
    <div>
      <h1>list of all users</h1>
      <Suspense fallback={<div>loading...</div>}>
        <UsersList usersPromise={usersPromise} />
      </Suspense>
    </div>
  );
}

async function UsersList({ usersPromise }) {
  const users = await usersPromise;
  return (
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
  );
}
