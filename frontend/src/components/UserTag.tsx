// import styles from "src/components/UserTag.module.svg";

import type { User } from "src/api/users";

export interface UserTagProps {
  user?: User;
}

export function UserTag({ user }: UserTagProps) {
  return (
    <div>
      <div>
        {!user ? (
          <p>Not assigned</p>
        ) : (
          <>
            <img
              src={user.profilePictureURL ? user.profilePictureURL : "/userDefault.svg"}
              alt="user profile" // this is req
            />
            <span> {user.name}</span>
          </>
        )}
      </div>
    </div>
  );
}
