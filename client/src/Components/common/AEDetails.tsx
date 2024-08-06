function AEDetails({ ae }: { ae: any }) {
  return (
    <div className="flex flex-col gap-2 text-secondaryDarkBlue text-xs md:text-sm lg:text-base">
      <p>
        <strong>User Name:</strong> {ae.bidder_name || ae.depositor_name}
      </p>
      <p>
        <strong>User Email:</strong> {ae.bidder_email || ae.depositor_email}
      </p>
      <p>
        <strong>User type:</strong> {ae.userType}
      </p>
      <p>
        <strong>AEC:</strong> {ae.aeInfo.AE_CIN}
      </p>
      <p>
        <strong>Phone Number:</strong> {ae.aeInfo.AE_phoneNumber}
      </p>
      <p>
        <strong>Activities:</strong>{" "}
        {ae.aeInfo.AE_DoA.map((activity: any) => JSON.parse(activity)).join(
          ", "
        )}
      </p>
      <p>
        <strong>Address:</strong> {ae.aeInfo.AE_address}
      </p>
      <p>
        <strong>Location:</strong> {ae.aeInfo.AE_location}
      </p>
    </div>
  );
}

export default AEDetails;
