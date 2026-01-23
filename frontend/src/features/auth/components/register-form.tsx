"use client";

import { useMutation } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegisterDocument } from "@/graphql/generated";
import { logger } from "@/lib/logger";

const formSchema = z
  .object({
    username: z.string().min(2, {
      message: "Le nom d'utilisateur doit faire au moins 2 caractères",
    }),
    email: z.email({ message: "Adresse mail invalide" }),
    password: z
      .string()
      .min(6, { message: "Le mot de passe doit faire au moins 6 caractères" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export default function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const [register, { loading }] = useMutation(RegisterDocument);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError(null);

    try {
      const { data } = await register({
        variables: {
          input: {
            username: values.username,
            email: values.email,
            password: values.password,
          },
        },
      });

      if (data?.createUser) {
        router.push("/auth/login?registered=true");
      }
    } catch (err) {
      let errorMessage = "Une erreur est survenue lors de l'inscription";

      if (err.graphQLErrors && err.graphQLErrors.length > 0) {
        errorMessage = err.graphQLErrors[0].message;
      } else if (err.message) {
        errorMessage = err.message;
      }

      logger.error(
        {
          err,
          email: values.email,
          event: "registration_failed",
        },
        "Échec de l'inscription utilisateur",
      );
      setError(errorMessage);
    }
  }

  return (
    <Card className="w-87.5">
      <CardHeader>
        <CardTitle>Inscription</CardTitle>
        <CardDescription>
          Créez votre compte pour commencer à suivre vos médias.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom d'utilisateur</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="exemple@mail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmer le mot de passe</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && (
              <div className="text-red-500 text-sm font-medium">{error}</div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Inscription..." : "S'inscrire"}
            </Button>

            <div className="text-center text-sm">
              Déjà un compte ?{" "}
              <Link
                href="/auth/login"
                className="underline underline-offset-4 hover:text-primary"
              >
                Se connecter
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
