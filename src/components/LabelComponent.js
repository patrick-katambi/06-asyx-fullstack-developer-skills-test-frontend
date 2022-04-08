export function LabelComponent(props) {
  return (
    <label className="mr-5 w-[40%] font-semibold " htmlFor={props.htmlFor}>
      {props.label}
    </label>
  );
}
