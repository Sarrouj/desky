import React from "react";

function NotFoundDataUser() {
  return (
    <div className="container mx-auto md:px-4 py-40 text-center ">
      <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-1 text-secondaryDarkBlue">Currently No Data Available</h2>
      <p className="text-gray-600 text-xs md:text-sm lg:text-base">
        There is no users to be verified, try other type of users
      </p>
    </div>
  );
}

export default NotFoundDataUser;
