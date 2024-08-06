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
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm mt-4 w-full">
      <div className="flex items-center gap-6 p-4 lg:p-6">
        <div className="rounded-full bg-slate-200 text-blue-400 w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 flex items-center justify-center text-xl md:text-2xl lg:text-3xl xl:text-4xl">
          {LetterFullName}
        </div>
        <div className="grid md:gap-1">
          <div className="text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-secondaryDarkBlue">
            {user?.depositor_name || user?.bidder_name}
          </div>
          {language == "fr" ? (
            user_role == "depositor" ? (
              <div className="text-muted-foreground text-sm md:text-base">Déposante</div>
            ) : (
              <div className="text-muted-foreground text-sm md:text-base">Soumissionnaire</div>
            )
          ) : (
            <div className="text-muted-foreground text-sm md:text-base">{user_role}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
