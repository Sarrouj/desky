function AEProfile({ user, content }: { user: any; content: any }) {
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
            {content("Card")}:
            <a
              target="_blank"
              href={`${process.env.NEXT_PUBLIC_BackendURL}/uploads/${user.ae.AE_CIN}`}
              className=" mt-2 underline text-primary hover:text-orange-600"
            >
              {user.ae.AE_CIN}
            </a>
          </p>
          <p>
            {" "}
            {content("PhoneNumber")}: +212 {user.ae.AE_phoneNumber}
          </p>
          <p>
            {" "}
            {content("Location")}: {user.ae.AE_location}
          </p>
          <p>
            {" "}
            {content("Address")}: {user.ae.AE_address}
          </p>
          <p>
            {" "}
            {content("Activities")}: {JSON.parse(user.ae.AE_DoA).join(" , ")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AEProfile;
