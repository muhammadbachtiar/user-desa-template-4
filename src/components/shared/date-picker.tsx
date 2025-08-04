import { useEffect, useRef } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';
import { CalendarIcon } from 'flowbite-react';
import { FaX } from 'react-icons/fa6';
import Hook = flatpickr.Options.Hook;
import DateOption = flatpickr.Options.DateOption;

type PropsType = {
  id: string;
  mode?: "single" | "multiple" | "range" | "time";
  onChange?: Hook | Hook[];
  defaultDate?: DateOption;
  label?: string;
  placeholder?: string;
};

export default function DatePicker({
  id,
  mode,
  onChange,
  defaultDate,
  placeholder,
}: PropsType) {
  const flatpickrRef = useRef<flatpickr.Instance | null>(null);
    useEffect(() => {
    const flatPickr = flatpickr(`#${id}`, {
      mode,
      static: true,
      monthSelectorType: 'static',
      dateFormat: 'Y-m-d',
      defaultDate,
      onChange,
    });

    flatpickrRef.current = Array.isArray(flatPickr) ? flatPickr[0] : flatPickr;

    return () => {
      if (flatpickrRef.current) {
        flatpickrRef.current.destroy();
      }
    };
  }, [mode, onChange, id, defaultDate]);

  const handleClear = () => {
    if (flatpickrRef.current) {
      flatpickrRef.current.clear();
      if (onChange) {
        const emptyValue = "";
        if (Array.isArray(onChange)) {
          onChange.forEach((hook) => hook([], emptyValue, flatpickrRef.current!));
        } else {
          onChange([], emptyValue, flatpickrRef.current);
        }
      }
    }
  };

  return (
    <div>

      <div className="w-full relative">
        <input
          id={id}
          placeholder={placeholder}
          className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800"
        />

        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
          {
            flatpickrRef.current?.selectedDates && flatpickrRef.current.selectedDates.length > 0 && <button
            type="button"
            onClick={handleClear}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-sm font-medium"
            aria-label="Clear selected date"
          >
            <FaX className="size-4" />
          </button>
          }
          <span className="text-gray-500 pointer-events-none dark:text-gray-400">
            <CalendarIcon className="size-6" />
          </span>
        </div>
      </div>
    </div>
  );
}
