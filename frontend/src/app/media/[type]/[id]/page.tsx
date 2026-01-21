import { notFound } from "next/navigation";

interface MediaDetailsPageProps {
  params: Promise<{
    type: string;
    id: string;
  }>;
}

export default async function MediaDetailsPage({
  params,
}: MediaDetailsPageProps) {
  const { type, id } = await params;

  if (!["movie", "series"].includes(type)) {
    return notFound();
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">Détails du média</h1>

      <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm">
        <p className="text-muted-foreground">
          Type :{" "}
          <span className="font-mono font-bold text-primary">{type}</span>
        </p>
        <p className="text-muted-foreground">
          ID TVDB :{" "}
          <span className="font-mono font-bold text-primary">{id}</span>
        </p>

        <div className="mt-8 p-4 bg-muted/50 rounded-md">
          <p>
            ℹ️ Ici, nous chargerons bientôt les détails complets via GraphQL.
          </p>
        </div>
      </div>
    </div>
  );
}
