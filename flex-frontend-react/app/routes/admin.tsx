import DashboardLayout from "./layouts/dashboardLayout";

export default function Home() {
  return (
    <DashboardLayout>

    <div className="font-sans flex-1 borde p-10 pb-20 gap-16 xl:p-20 bg-[#FAFBFF] overflow-y-auto">
      <header className="mb-10">
        <h1 className="text-3xl sm:text-3xl font-bold mb-2">Welcome Admin</h1>
        <p className="text-sm sm:text-base text-gray-600">
          Manage and assess your properties' review performance here.
        </p>
      </header>
      
      <main className="flex flex-col gap-[32px]">
        <section className="">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col justify-center items-center p-10 px-20 bg-white shadow-2xl rounded-2xl">
              <h3 className="font-medium mb-2">Ratings</h3>
              <p className="font-bold text-3xl">143</p>
            </div>
            <div className="flex flex-col justify-center items-center p-10 px-20 bg-white shadow-2xl rounded-2xl">
              <h3 className="font-medium mb-2">Ratings</h3>
              <p className="font-bold text-3xl">143</p>
            </div>
            <div className="flex flex-col justify-center items-center p-10 px-20 bg-white shadow-2xl rounded-2xl">
              <h3 className="font-medium mb-2">Ratings</h3>
              <p className="font-bold text-3xl">143</p>
            </div>
            <div className="flex flex-col justify-center items-center p-10 px-20 bg-white shadow-2xl rounded-2xl">
              <h3 className="font-medium mb-2">Ratings</h3>
              <p className="font-bold text-3xl">143</p>
            </div>
          </div>
        </section>
      </main>
    </div>
    </DashboardLayout>
  );
}
