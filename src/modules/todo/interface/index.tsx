import { IResponsePagination, Pagination } from "@app/utils/interface";

export interface PaginationTodo extends Pagination {}

export interface ITodo {
  id: string;
  item: string;
  userId: string;
  isDone?: boolean;
  todoId: string;
  checked: boolean;
}
export interface IResponseTodo extends IResponsePagination<ITodo> {}

export interface ITodoForm {
  item: string;
  listTodo: ITodo[];
}

export interface IMarkForm {
  action: string;
}
