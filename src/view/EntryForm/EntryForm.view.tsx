import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { Button } from "../../styles/buttons.styled";
import { MiniForm } from "./EntryForm.styles";
import { useStore } from "../../state/store.ts";

export function EntryForm() {
  
  const { addTodo } = useStore();
  const inputElm = useRef<HTMLInputElement>(null);
  const [disabled,setDisabled] = useState(true)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputElm.current) {
      addTodo(inputElm.current.value);
      inputElm.current.value = "";
    }
  };

  const onChange = (e: ChangeEvent)=> {
    const hasText = !!(e.currentTarget as HTMLInputElement).value.length;
    setDisabled(!hasText)
  }
  return (
    <MiniForm onSubmit={onSubmit}>
      <input ref={inputElm} type="text" placeholder="Your next task" onChange={onChange} />
      <Button disabled={disabled}>add</Button>
    </MiniForm>
  );
}
