interface KeyValuePairProps {
  label: string;
  value: string | number;
  classNameForLabel?: string;
  classNameForValue?: string;
}

const KeyValuePair = ({
  label,
  value,
  classNameForLabel = "",
  classNameForValue = "",
}: KeyValuePairProps) => {
  return (
    <div className=" flex justify-between">
      <p className={classNameForLabel}>{label}</p>
      <p className={classNameForValue}>{value}</p>
    </div>
  );
};
export default KeyValuePair;
