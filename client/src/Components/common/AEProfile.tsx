function AEProfile(user: any) {
  const User = user.user;
  
  return (
    <div className="grid gap-6 py-3">
      <div
        className="rounded-lg border bg-card text-card-foreground shadow-sm"
        data-v0-t="card"
      >
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
            Auto Entrepreneur Info
          </h3>
        </div>
        <div className="flex flex-col gap-2 px-8 pb-8">
          <p>
            {" "}
            Card:{" "}
            <a
              target="_blank"
              href={`http://localhost:3001/uploads/${User.ae.AE_CIN}`}
              className=" mt-2 underline text-primary hover:text-orange-600"
            >
              {User.ae.AE_CIN}
            </a>
          </p>
          <p> Phone Number: +212 {User.ae.AE_phoneNumber}</p>
          <p> Location: {User.ae.AE_location}</p>
          <p> Address: {User.ae.AE_address}</p>
          <p> Activities: {JSON.parse(User.ae.AE_DoA).join(' , ')}</p>
        </div>
      </div>
    </div>
  );
}

export default AEProfile;
