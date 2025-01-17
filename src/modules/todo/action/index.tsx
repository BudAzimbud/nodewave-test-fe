import api from "@app/utils/api";
import {
  IMarkForm,
  IResponseTodo,
  ITodo,
  ITodoForm,
  PaginationTodo,
} from "../interface";

export const getTodos = ({ page }: PaginationTodo) => {
  return api.get<IResponseTodo>("/todos?page=" + page + "&rows=10");
};

export const createTodos = (form: ITodoForm) => {
  return api.post<{ content: ITodo }>("/todos", {
    item: form.item,
  });
};

export const updateStatusTodo = ({
  id,
  form,
}: {
  id: string;
  form: IMarkForm;
}) => {
  return api.put(`todos/${id}/mark`, {
    action: form.action,
  });
};


export const deleteTodo = (id: string) => {
  return api.delete('todos/'+id)
}