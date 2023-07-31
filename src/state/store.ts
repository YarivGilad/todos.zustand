import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import { Immutable } from "immer";

import { ITodo, VisabilityFilter } from "../types.ts";
import { createShortId as shortID } from "../utils/string.utils.ts";

export type TodosStore = Immutable<{
  todos: ITodo[];
  currentFilter: VisabilityFilter;
  addTodo: (title: string) => void;
  toggle: (id: string) => void;
  remove: (id: string) => void;
  removeCompleted: () => void;
  activeCounter: () => number;
  hasCompleted: () => boolean;
  filterTodos: (mode: VisabilityFilter) => void;
}>;

export const useStore = create<TodosStore>()(
  devtools(
    immer((set, get) => ({
      todos: [],
      currentFilter: VisabilityFilter.All,
      addTodo: (title: string) => {
        set((state) => {
          state.todos.push({
            id: shortID(),
            title: title,
            completed: false,
            show: true
          });
        }, false,'addTodo');
      },
      toggle: (id: string) => {
        set((state) => {
          state.todos.forEach((todo: ITodo) => {
            if (todo.id === id) todo.completed = !todo.completed;
          });
        },false,'toggle');
      },
      remove: (id: string) => {
        set((state) => {
          const index = state.todos.findIndex((todo: ITodo) => todo.id === id);
          state.todos.splice(index, 1);
        },false,'remove');
      },
      removeCompleted: () => {
        set((state) => {
          state.todos = state.todos.filter(
            (todo: ITodo) => todo.completed === false
          );
        },false,'removeCompleted');
      },
      activeCounter: () => {
        return get().todos.reduce(
          (total: number, todo: ITodo) => (todo.completed ? total : total + 1),
          0
        );
      },
      hasCompleted: () => {
        return get().todos.some((todo: ITodo) => todo.completed === true);
      },
      filterTodos: (visFilter: VisabilityFilter) => {
        set((state) => {
          state.currentFilter = visFilter;
          state.todos.forEach((todo: ITodo) => {
            switch (visFilter) {
              case VisabilityFilter.All:
                todo.show = true;
                break;
              case VisabilityFilter.Active:
                todo.show = todo.completed === false;
                break;
              case VisabilityFilter.Completed:
                todo.show = todo.completed === true;
                break;
            }
          });
        },false,'filterTodos');
      }
    }))
  )
);

/* 

set((state) => ({
  todos: [
    ...state.todos,
    {
      id: sid.generate(),
      title: title,
      completed: false,
      show: true
    }
  ]
})); 

*/
