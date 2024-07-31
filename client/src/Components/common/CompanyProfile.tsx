function CompanyProfile({ user, content }: { user: any; content: any }) {
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
          <p>
            {content("CompanyName")}: {user.company.company_name}
          </p>
          <p>Type: {user.company.company_type}</p>
          <p>CR: {user.company.company_CR}</p>
          <p>Size: {user.company.company_size}</p>
          <p>Phone Number: {user.company.company_phoneNumber}</p>
          <p>Location: {user.company.company_location}</p>
          <p>Address: {user.company.company_address}</p>
          <p>Activities: {user.company.company_DoA.join(", ")}</p>
        </div>
      </div>
    </div>
  );
}

export default CompanyProfile;
