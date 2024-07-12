import React from "react";

const StatusTooltipContent = ({
  data,
  Content,
}: {
  data: any;
  Content: any;
}) => {
  return (
    <>
      {data.offer_state === "pending" ? (
        <>{Content("OfferStatus.PendingDesc")}</>
      ) : data.offer_state === "open" ? (
        <>{Content("OfferStatus.OpenDesc")}</>
      ) : data.offer_state === "inProgress" ? (
        <>{Content("OfferStatus.inProgressDesc1")} <br />{Content("OfferStatus.inProgressDesc2")}</>
      ) : data.offer_state === "closed" ? (
        <>{Content("OfferStatus.ClosedDesc1")} <br />{Content("OfferStatus.ClosedDesc2")}</>
      ) : data.offer_state === "rejected" ? (
        <>{Content("OfferStatus.RejectedDesc")}</>
      ) : null}
    </>
  );
};

export default StatusTooltipContent;
