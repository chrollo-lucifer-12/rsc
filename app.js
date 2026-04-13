import { Suspense } from "react";
import { getUsers } from "./db/data";
import { Search } from "./search";

export async function App({ searchParams }) {
  console.log(searchParams);
  const query = searchParams.get("query") ?? "";
  const usersPromise = getUsers(query);

  return (
    <div>
      <h1>list of all users</h1>
      <Search query={query} />
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
