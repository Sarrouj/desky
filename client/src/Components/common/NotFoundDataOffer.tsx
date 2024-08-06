import React from "react";

function NotFoundDataOffer({Content} : {Content : any}) {
  return (
    <div className="container mx-auto mt-20 px-2 md:px-4 py-36 text-center ">
      <h2 className="text-lg md:text-xl lg:text-2xl font-bold mb-1 text-secondaryDarkBlue">{Content('Title')}</h2>
      <p className="text-gray-600 text-xs sm:text-sm lg:text-base">{Content('Description')}</p>
    </div>
  );
}

export default NotFoundDataOffer;
