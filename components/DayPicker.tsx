import { ko } from 'date-fns/locale';
import { DayPicker } from 'react-day-picker';

import 'react-day-picker/dist/style.css';

interface CustomDayPickerProps {
  selected: Date | undefined;
  onSelect?: (date: Date | undefined) => void;
}

function CustomDayPicker({
  selected,
  onSelect = () => {},
}: CustomDayPickerProps) {
  return (
    <div className="relative">
      <DayPicker
        mode="single"
        required={true}
        selected={selected}
        onSelect={onSelect}
        locale={ko}
        captionLayout="dropdown"
        modifiersStyles={{
          selected: {
            color: '#32A68A',
            fontWeight: 'bold',
          },
        }}
      />
    </div>
  );
}

export default CustomDayPicker;
