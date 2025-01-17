import Layout from "@app/components/Layout/Layout";
import TableTodo from "@app/modules/todo/TableTodo";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session }: any = useSession();

  if (!session) {
    return <p>Loading...</p>;
  }

  return (
    <Layout>
      <TableTodo />
    </Layout>
  );
}
