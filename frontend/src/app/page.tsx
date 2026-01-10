"use client";

import { useQuery } from "@apollo/client/react";
import { GetUsersDocument, type IGetUsersQuery } from "@/graphql/generated";

export default function Home() {
  const { data, loading, error } = useQuery<IGetUsersQuery>(GetUsersDocument);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Liste des utilisateurs</h1>
      <ul>
        {data?.users.map((user) => (
          <li key={user.id} className="border p-2 mb-2 rounded">
            {user.username} ({user.email}) -{" "}
            <span className="text-gray-500">{user.role}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
