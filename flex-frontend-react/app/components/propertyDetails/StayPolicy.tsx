import {
  AlarmSmokeIcon,
  CalendarCheck,
  Clock,
  Flower,
  PawPrint,
  Shield,
} from "lucide-react";

const StayPolicy = () => {
  return (
    <section className="bg-white rounded-lg shadow-md p-6 mb-8 flex flex-col gap-4">
      <h2 className="text-xl font-semibold mb-4">Stay Policies</h2>

      {/* Check-in & Check-out */}
      <div className="mb-4 bg-[#f5f6ef] p-5 rounded-lg flex flex-col gap-2">
        <div className="flex items-center gap-4 mb-2">
          <Clock className="w-4 h-4" />
          <h3 className="font-semibold text-sm text-gray-700">
            Check-in & Check-out
          </h3>
        </div>
        <div className="text-sm text-gray-600 space-y-1 flex md:flex-row w-full flex-col gap-4 items-center">
          <div className="bg-white p-4 flex-1 flex flex-col rounded-md">
            <p className="text-xs">Check-in Time</p>
            <p className="font-bold">3:00 PM</p>
          </div>
          <div className="bg-white p-4 flex-1 flex flex-col rounded-md">
            <p className="text-xs">Check-out Time</p>
            <p className="font-bold">10:00 AM</p>
          </div>
        </div>
      </div>

      {/* House Rules */}
      <div className="mb-4 bg-[#f5f6ef] p-4 rounded-lg flex flex-col gap-2">
        <div className="flex items-center gap-4 mb-2">
          <Shield className="w-4 h-4" />
          <h3 className="font-semibold text-sm text-gray-700">House Rules</h3>
        </div>
        <div className="text-sm text-gray-600 space-y-1 w-full grid gap-3 md:grid-cols-2 grid-cols-1">
          <div className="bg-white p-3 font-medium flex items-center gap-2 rounded-md ">
            <AlarmSmokeIcon className="w-4 h-4" />
            <p>No smoking</p>
          </div>
          <div className="bg-white p-3 font-medium  flex items-center gap-2 rounded-md ">
            <PawPrint className="w-4 h-4" />
            <p>No pets</p>
          </div>
          <div className="bg-white p-3 font-medium  flex items-center gap-2 rounded-md ">
            <Flower className="w-4 h-4" />
            <p>No parties or events</p>
          </div>
          <div className="bg-white p-3 font-medium  flex items-center gap-2 rounded-md ">
            <Shield className="w-4 h-4" />
            <p>Security deposit required</p>
          </div>
        </div>
      </div>

      {/* Cancellation Policy */}
      <div className="mb-4 bg-[#f5f6ef] p-5 rounded-lg flex flex-col gap-2">
        <div className="flex items-center gap-4 mb-2">
          <CalendarCheck className="w-4 h-4" />
          <h3 className="font-semibold text-sm text-gray-700">
            Cancellation Policy
          </h3>
        </div>
        <div className="bg-white flex flex-col gap-1 p-4 rounded-lg mb-2">
          <h3 className="font-medium">For stays less than 28 days</h3>
          <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
            <li>Full refund up to 14 days before check-in</li>
            <li>No refund for bookings less than 14 days before check-in</li>
          </ul>
        </div>
        <div className="bg-white flex flex-col gap-1 p-4 rounded-lg mb-2">
          <h3 className="font-medium">For stays of 28 days or more</h3>
          <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
            <li>Full refund up to 30 days before check-in</li>
            <li>No refund for bookings less than 30 days before check-in</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default StayPolicy;
