function CompanyProfile(user: any) {
  const User = user.user;
  return (
    <div className="grid gap-6 py-3">
      <div
        className="rounded-lg border bg-card text-card-foreground shadow-sm"
        data-v0-t="card"
      >
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
            Company Info
          </h3>
        </div>
        <div className="flex flex-col gap-2 px-8 pb-8">
          <p>Company Name: {User.company.company_name}</p>
          <p>Type: {User.company.company_type}</p>
          <p>CR: {User.company.company_CR}</p>
          <p>Size: {User.company.company_size}</p>
          <p>Phone Number: {User.company.company_phoneNumber}</p>
          <p>Location: {User.company.company_location}</p>
          <p>Address: {User.company.company_address}</p>
          <p>Activities: {User.company.company_DoA.join(", ")}</p>
        </div>
      </div>
    </div>
  );
}

export default CompanyProfile;
