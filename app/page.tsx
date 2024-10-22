import { client } from "./lib/hono";
const Layout = ({ children }: React.PropsWithChildren) => (
  <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      {children}
    </main>
  </div>
);
export default async function Home() {
  const res = await client.api.hello.$get({
    query: {
      name: "home",
    },
  });

  const data = await res.json();
  if (!data) {
    return <Layout>Data is Empty</Layout>;
  }
  return (
    <Layout>
      <span>Home</span>
    </Layout>
  );
}
