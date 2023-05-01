import { ReactNode } from "react";
import Select from "react-select";

export interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  onChange: (option: Option | null) => void;
  options: Array<Option>;
  placeholder?: boolean;
  filterOption?: (option: Option, query: string) => boolean;
  noOptionsMessage?: (obj: { inputValue: string }) => ReactNode;
}

export default function StyledSelect({
  label,
  options,
  onChange,
  placeholder = false,
  filterOption,
  noOptionsMessage,
}: SelectProps) {
  return (
    <div className="flex w-full flex-col gap-y-1">
      {!placeholder ? (
        <label
          htmlFor="acadYear"
          className="text-slate-800 dark:text-slate-200"
        >
          {label}
        </label>
      ) : null}
      <Select
        id="acadYear"
        classNames={{
          option: (state) =>
            `text-slate-800 dark:text-slate-200 ` +
            `${
              state.isFocused
                ? "bg-slate-200 dark:bg-slate-800 "
                : "bg-white dark:bg-slate-950 "
            }` +
            `${state.isSelected ? "font-bold" : ""}`,
          menuList: () =>
            "p-0 border dark:border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950",
          control: () =>
            "bg-white dark:bg-slate-950 border border-slate-700 dark:border-slate-300",
          placeholder: () => "text-slate-500 dark:text-slate-400",
          input: () => "text-slate-800 dark:text-slate-200",
          singleValue: () => "text-slate-800 dark:text-slate-200",
          dropdownIndicator: () => "text-slate-800 dark:text-slate-200",
          clearIndicator: () =>
            "text-slate-800 dark:text-slate-200 hover:text-slate-500 dark:hover:text-slate-400",
        }}
        styles={{
          menuList: (base) => ({
            ...base,

            "::-webkit-scrollbar": {
              width: "4px",
            },
            "::-webkit-scrollbar-track": {
              background: "#52525b", // zinc-600
            },
            "::-webkit-scrollbar-thumb": {
              background: "#94a3b8", // slate-400
            },
            "::-webkit-scrollbar-thumb:hover": {
              background: "#64748b", // slate-500
            },
          }),
        }}
        placeholder={`Select ${label}`}
        closeMenuOnSelect={true}
        options={options}
        onChange={(e) => onChange(e)}
        isClearable={true}
        filterOption={filterOption}
        noOptionsMessage={noOptionsMessage}
      />
    </div>
  );
}
