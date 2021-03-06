export function InputComponent(props) {
  return (
    <>
      {props.textArea ? (
        <textarea
          name={props.name}
          placeholder={props.placeholder || ""}
          value={props.value || ""}
          onChange={props.onChange}
          disabled={props.disabled}
          className={`w-[100%] p-5 outline-none border-none rounded-lg ${props.disabled ? 'bg-[white]' : ''} `}
        />
      ) : (
        <input
          type={props.type}
          name={props.name}
          placeholder={props.placeholder || ""}
          value={props.value || ""}
          onChange={props.onChange}
          disabled={props.disabled}
          className={`w-[100%] p-5 outline-none border-none rounded-lg ${props.disabled ? 'bg-[white]' : ''} `}
        />
      )}
    </>
  );
}
