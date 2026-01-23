"use client";

import { useQuery } from "@apollo/client/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MediaCarousel } from "@/features/dashboard/components/media-carousel";
import { GetDashboardDataDocument, MeDocument } from "@/graphql/generated";

export default function DashboardPage() {
  const { data: meData, loading, error } = useQuery(MeDocument);
  const { data: mediaData } = useQuery(GetDashboardDataDocument);

  if (loading) {
    return <div>Chargement de vos données...</div>;
  }
  if (error) {
    return <div className="text-red-500">Erreur: {error.message}</div>;
  }

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
            <div className="text-2xl font-bold">{meData?.me.username}</div>
            <p className="text-xs text-muted-foreground">{meData?.me.email}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rôle</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{meData?.me.role}</div>
            <p className="text-xs text-muted-foreground">
              Depuis le{" "}
              {meData?.me.createdAt
                ? new Date(meData.me.createdAt).toLocaleDateString()
                : "Date inconnue"}
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="container py-8 space-y-10">
        <section>
          <MediaCarousel
            title="Séries populaires"
            items={mediaData?.popularSeries || []}
          />
        </section>

        <section>
          <MediaCarousel
            title="Films du moment"
            items={mediaData?.popularMovies || []}
          />
        </section>
      </div>
    </div>
  );
}
