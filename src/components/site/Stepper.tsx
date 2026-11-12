import { Minus, Plus } from "lucide-react";

type Props = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  max?: number;
};

/** iOS-style stepper with 44px touch targets. */
const Stepper = ({ label, value, onChange, max = 20 }: Props) => (
  <span className="inline-flex flex-shrink-0 items-center rounded-full bg-fog">
    <button
      type="button"
      onClick={() => onChange(Math.max(0, value - 1))}
      disabled={value === 0}
      aria-label={`Remove one: ${label}`}
      className="flex h-11 w-11 items-center justify-center rounded-full text-slate disabled:text-concrete/40"
    >
      <Minus className="h-4 w-4" strokeWidth={2.5} />
    </button>
    <span className="price w-6 text-center text-[17px]" aria-live="polite">
      {value}
    </span>
    <button
      type="button"
      onClick={() => onChange(Math.min(max, value + 1))}
      disabled={value >= max}
      aria-label={`Add one: ${label}`}
      className="flex h-11 w-11 items-center justify-center rounded-full text-slate disabled:text-concrete/40"
    >
      <Plus className="h-4 w-4" strokeWidth={2.5} />
    </button>
  </span>
);

export default Stepper;
