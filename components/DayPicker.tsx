import { ko } from 'date-fns/locale';
import { DayPicker } from 'react-day-picker';

import 'react-day-picker/dist/style.css';

interface CustomDayPickerProps {
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
}

function CustomDayPicker({ selected, onSelect }: CustomDayPickerProps) {
  return (
    <div className="relative">
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={onSelect}
        locale={ko}
        captionLayout="dropdown"
        fromYear={2000}
        toYear={new Date().getFullYear()}
        modifiersStyles={{
          selected: {
            backgroundColor: '#32A68A',
            color: 'white',
          },
          today: {
            color: '#32A68A',
            fontWeight: 'bold',
          },
        }}
      />
    </div>
  );
}

export default CustomDayPicker;
