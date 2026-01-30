import Loader from "@/components/WeekTimeSheetPage/Loader/Loader";
import WeekTimeSheetRow from "@/components/WeekTimeSheetPage/WeekTimeSheetRow/WeekTimeSheetRow";
import { weekTimeSheetData } from "@/utils/staticData";

const WeekTimeSheetPage = () => {
  return (
    <div className="w-full p-4 md:p-6 bg-white rounded-lg shadow-sm mb-4">
      <div className="w-full grid grid-cols-1 sm:grid-cols-[1fr_188px] items-center gap-4">
        <span className="text-gray-900 font-bold text-xl md:text-2xl">
          This week's timesheet
        </span>
        <div className="w-full sm:w-auto sm:flex-1 sm:max-w-md">
          <Loader />
        </div>
      </div>
      <div className='w-full py-6'>
            <span className='text-sm text-gray-400'>21 - 26 January, 2026</span>
      </div>
      <div className="w-full flex flex-col gap-6">
        {weekTimeSheetData.map((row) => (
          <WeekTimeSheetRow 
            key={row.date}
            date={row.date} 
            tasks={row.tasks} 
          />
        ))}
      </div>
      
    </div>
  );
};

export default WeekTimeSheetPage;
