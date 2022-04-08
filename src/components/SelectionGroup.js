export function SelectionGroup(props) {
  return (
    <div className="flex flex-row items-center justify-between w-[100%] ">
      <p className="mr-5 w-[40%] font-semibold ">{props.label}</p>
      <select
        name={props.name}
        value={props.value || ""}
        onChange={props.onChange}
        className="w-[100%] p-5 cursor-pointer appearance-none outline-none border-none rounded-lg "
      >
        <option value="" disabled>
          Select your option
        </option>
        {props.data_source !== null
          ? props.data_source.map((item) => {
              return <option key={item.id}>{item.name}</option>;
            })
          : ""}
      </select>
    </div>
  );
}
