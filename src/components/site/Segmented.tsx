type Option<T extends string> = { value: T; label: string };

type Props<T extends string> = {
  label: string;
  options: Option<NoInfer<T>>[];
  value: T;
  onChange: (value: NoInfer<T>) => void;
};

/** iOS segmented control. Wraps to two rows only if the labels can't fit. */
function Segmented<T extends string>({ label, options, value, onChange }: Props<T>) {
  return (
    <div role="radiogroup" aria-label={label} className="flex w-full gap-1 rounded-[12px] bg-slate/[0.07] p-1">
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(o.value)}
            className={`min-h-[40px] flex-1 rounded-[9px] px-2 text-[15px] font-semibold leading-tight transition-colors ${
              active ? "bg-white text-slate shadow-[0_1px_3px_rgba(37,44,50,0.18)]" : "text-concrete"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

export default Segmented;
