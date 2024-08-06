function CompanyDetails({ company }: { company: any }) {
  return (
    <div className="flex flex-col gap-2 text-secondaryDarkBlue text-xs md:text-sm lg:text-base">
      <p>
        <strong>User Name:</strong>{" "}
        {company.bidder_name || company.depositor_name}
      </p>
      <p>
        <strong>User type:</strong> {company.userType}
      </p>
      <p>
        <strong>User Email:</strong>{" "}
        {company.bidder_email || company.depositor_email}
      </p>
      <p>
        <strong>CR:</strong> {company.companyInfo.company_CR}
      </p>
      <p>
        <strong>Company Name:</strong> {company.companyInfo.company_name}
      </p>
      <p>
        <strong>Company Type:</strong> {company.companyInfo.company_type}
      </p>
      <p>
        <strong>Company Size:</strong> {company.companyInfo.company_size}
      </p>
      <p>
        <strong>Company Phone Number:</strong>{" "}
        {company.companyInfo.company_phoneNumber}
      </p>
      <p>
        <strong>Activities:</strong>{" "}
        {company.companyInfo.company_DoA.join(", ")}
      </p>
      <p>
        <strong>Company Address:</strong> {company.companyInfo.company_address}
      </p>
      <p>
        <strong>Company Location :</strong>{" "}
        {company.companyInfo.company_location}
      </p>
    </div>
  );
}

export default CompanyDetails;
