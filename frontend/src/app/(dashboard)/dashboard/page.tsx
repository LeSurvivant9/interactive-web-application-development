"use client";

import { useQuery } from "@apollo/client/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MeDocument } from "@/graphql/generated";

export default function DashboardPage() {
  const { data, loading, error } = useQuery(MeDocument);

  if (loading) return <div>Chargement de vos données...</div>;
  if (error) return <div className="text-red-500">Erreur: {error.message}</div>;

  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight mb-6">
        Tableau de bord
      </h2>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilisateur</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.me.username}</div>
            <p className="text-xs text-muted-foreground">{data?.me.email}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rôle</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.me.role}</div>
            <p className="text-xs text-muted-foreground">
              Depuis le{" "}
              {data?.me.createdAt
                ? new Date(data.me.createdAt).toLocaleDateString()
                : "Date inconnue"}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
