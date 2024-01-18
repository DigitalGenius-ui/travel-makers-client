import { FormControl, FormLabel, Input, Select } from "@chakra-ui/react";

const EditInputs = ({
  label,
  type,
  gender,
  name,
  isActive,
  ref,
  hidden,
  form,
  setForm,
}) => {
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <FormControl
      isDisabled={isActive}
      isRequired={true}
      className="flex flex-col gap-1 w-full">
      {label && (
        <FormLabel className="text-gray-500 !text-xs">{label}</FormLabel>
      )}
      {!gender ? (
        <Input
          hidden={hidden}
          ref={ref}
          value={form[name]}
          onChange={handleChange}
          className="!w-full !text-sm"
          name={name}
          placeholder={label + "..."}
          variant="filled"
          type={type || "text"}
        />
      ) : (
        <Select
          value={form[name]}
          onChange={handleChange}
          name={name}
          placeholder="Select Gender"
          className="!w-full !text-xs">
          {gender.map((item, i) => (
            <option className="!w-full" value={item} key={i}>
              {item}
            </option>
          ))}
        </Select>
      )}
    </FormControl>
  );
};

export default EditInputs;
