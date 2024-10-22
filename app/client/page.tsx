"use client";

import { hc } from "hono/client";
import { useQuery } from "@tanstack/react-query";
import { AppType } from "../api/[[...route]]/route";
const client = hc<AppType>("");
const Layout = ({ children }: React.PropsWithChildren) => (
  <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      {children}
    </main>
  </div>
);
export default function Home() {
  const query = useQuery({
    queryKey: ["query"],
    queryFn: async () => {
      const res = await client.api.hello.$get({
        query: {
          name: "hono",
        },
      });
      return await res.json();
    },
  });
  if (query.isLoading) {
    return <Layout>Loading</Layout>;
  }
  return (
    <Layout>
      <span>{query.data?.message}</span>
    </Layout>
  );
}
