
import "./index.css";
import {UserCard} from "../UserCard"

export const Header = ({user}) => {

  return (
    <header>
      <h2>Gym App: exercises library</h2>
      {user ? <UserCard></UserCard> : <></>}
    </header>
  );
};
