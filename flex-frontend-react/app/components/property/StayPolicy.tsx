const StayPolicy = () => {
  return (
    <section className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Stay Policies</h2>

      {/* Check-in & Check-out */}
      <div className="mb-4">
        <h3 className="font-medium text-gray-700 mb-2">Check-in & Check-out</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>Check-in: After 3:00 PM</li>
          <li>Check-out: Before 10:00 AM</li>
        </ul>
      </div>

      {/* House Rules */}
      <div className="mb-4">
        <h3 className="font-medium text-gray-700 mb-2">House Rules</h3>
        <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
          <li>No smoking</li>
          <li>No pets</li>
          <li>No parties or events</li>
          <li>Security deposit required</li>
        </ul>
      </div>

      {/* Cancellation Policy */}
      <div>
        <h3 className="font-medium text-gray-700 mb-2">Cancellation Policy</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li><strong>Stays &lt; 28 days:</strong> Full refund up to 14 days before check-in</li>
          <li>No refund for bookings less than 14 days before check-in</li>
          <li><strong>Stays ≥ 28 days:</strong> Full refund up to 30 days before check-in</li>
          <li>No refund for bookings less than 30 days before check-in</li>
        </ul>
      </div>
    </section>
  );
};

export  default StayPolicy;