import { useState } from "react";
import {
  TodoItemBox,
  Check,
  Uncheck,
  Remove,
  TodoTitle
} from "./TodoItem.styles";
import { ITodo } from "../../types.ts";
import { useStore } from "../../state/store.ts";

export function TodoItem({ id, completed, title }: ITodo) {
  const { toggle, remove } = useStore();
  const [hovered, setHovered] = useState<boolean>(false)

  return (
    <TodoItemBox title="todo item"
                 onMouseEnter={() => setHovered(true)} 
                 onMouseLeave={() => setHovered(false)}>
      <div onClick={() => toggle(id)}>
        {completed ? <Check /> : <Uncheck />}
      </div>
      <TodoTitle $completed={completed}>{title}</TodoTitle>
      { hovered && <Remove onClick={() => remove(id)} title="remove icon" /> }
    </TodoItemBox>
  );
}
