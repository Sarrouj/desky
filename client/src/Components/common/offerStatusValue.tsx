import React from 'react'

const OfferStatusValue = ({data, Content} : {data : any, Content: any}) => {
  return (
    <>
      <>
      {data === "pending" ? (
        <>{Content("OfferStatus.Pending")}</>
      ) : data === "open" ? (
        <>{Content("OfferStatus.Open")}</>
      ) : data === "inProgress" ? (
        <>{Content("OfferStatus.inProgress")} <br />{Content("OfferStatus.inProgressDesc2")}</>
      ) : data === "closed" ? (
        <>{Content("OfferStatus.Closed")} <br />{Content("OfferStatus.ClosedDesc2")}</>
      ) : data === "rejected" ? (
        <>{Content("OfferStatus.Rejected")}</>
      ) : null}
    </>
    </>
  )
}

export default OfferStatusValue
