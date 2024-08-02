import React from "react";

function ProfileCard({
  LetterFullName,
  user_role,
  user,
  language,
}: {
  LetterFullName: any;
  user_role: any;
  user: any;
  language: any;
}) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm mt-4">
      <div className="flex items-center gap-6 p-6">
        <div className="rounded-full bg-slate-200 text-primary w-24 h-24 flex items-center justify-center text-4xl">
          {LetterFullName}
        </div>
        <div className="grid gap-1">
          <div className="text-2xl font-bold text-secondaryDarkBlue">
            {user?.depositor_name || user?.bidder_name}
          </div>
          <div className="text-muted-foreground">
            {user?.depositor_email || user?.bidder_email}
          </div>
          {language == "fr" ? (
            user_role == "depositor" ? (
              <div className="text-muted-foreground">déposante</div>
            ) : (
              <div className="text-muted-foreground">soumissionnaire</div>
            )
          ) : (
            <div className="text-muted-foreground">{user_role}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
