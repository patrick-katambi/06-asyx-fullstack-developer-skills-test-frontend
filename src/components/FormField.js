export function FormField(props) {
  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      className="border-none outline-none w-full py-4 px-5 rounded-lg font-bold"
    />
  );
}
