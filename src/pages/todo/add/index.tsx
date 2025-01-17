import FormTodo from "@app/modules/todo/FormTodo";
import Layout from "@app/components/Layout/Layout";

export default function TodoPage() {
  return (
    <Layout hiddenSidebar>
      <FormTodo />
    </Layout>
  );
}
