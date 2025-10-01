const BookingBox = () => {
  return (
    <aside className="bg-white rounded-lg shadow-md p-6 w-full sm:max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Book Your Stay</h2>
      <p className="text-sm text-gray-600 mb-4">Select dates to see prices</p>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
          <input type="date" className="w-full border rounded-md p-2 text-sm" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
          <input type="date" className="w-full border rounded-md p-2 text-sm" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
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
  );
};