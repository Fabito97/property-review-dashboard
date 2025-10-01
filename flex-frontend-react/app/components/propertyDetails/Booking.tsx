const BookingBox = () => {
  return (
    <div>

    <aside className="rounded-lg shadow-md w-full sm:max-w-md mx-auto overflow-hidden">
      <div className="bg-green-700 p-4 text-white">
        <h2 className="text-xl font-semibold mb-2">Book Your Stay</h2>
        <p className="text-sm text-gray-200 mb-4">Select dates to see prices</p>
      </div>

      <form className="space-y-4 bg-white p-6 ">       
        <div className="flex justify-between gap-2">          
          <input type="date" className="w-full border rounded-md p-2 text-sm w-[90%]" />
          <input type="number" min={1} defaultValue={1} className="w-full border rounded-md p-2 text-sm" />
        </div>

        <button type="submit" className="w-full bg-black text-white py-2 rounded-md font-medium">
          Check Availability
        </button>

        <button type="button" className="w-full border border-gray-300 py-2 rounded-md font-medium text-gray-700">
          Send Booking Inquiry
        </button>

        <p className="text-xs text-gray-500 text-center mt-2">Not a booking confirmation</p>
      </form>
    </aside>
    </div>
  );
};

export default BookingBox;