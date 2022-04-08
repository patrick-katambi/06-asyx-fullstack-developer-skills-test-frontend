export function LabelComponent(props) {
  return (
    <label className="mr-5 w-[40%] " htmlFor={props.htmlFor}>
      {props.label}
    </label>
  );
}
