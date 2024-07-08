import React from "react";

const DashboardCard = ({
  Logo,
  Content,
  Value,
}: {
  Logo: any;
  Content: any;
  Value: any;
}) => {
  return (
    <div className="bg-white shadow rounded-lg border p-3 sm:p-6 flex  text-center xl:p-6 h-full w-3/12 gap-5">
      <div className="flex items-center gap-3">
        <div className="bg-gray-100 p-3 rounded-md">
          <Logo size={30} className="text-primary" />
        </div>
        <div className="text-start">
          <h1 className="text-3xl font-bold">{Value}</h1>
          <h3 className="font-semibold text-neutralGray">{Content}</h3>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
