import { InputComponent } from "./InputComponent";
import { LabelComponent } from "./LabelComponent";

export function InputFieldSectionContainer(props) {
  return (
    <div className="flex flex-row items-center justify-between w-[100%] ">
      <LabelComponent label={props.label} htmlFor={props.htmlFor} />
      <InputComponent
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        textArea={props.textArea}
        disabled={props.disabled}
      />
    </div>
  );
}
