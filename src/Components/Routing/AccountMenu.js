import { Avatar, Menu } from 'grommet';
import {
  Home, Login, Logout, User, UserSettings,
} from 'grommet-icons';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserAuthContext } from '../../auth/UserAuthProvider';
import { signOut } from '../../auth/firebase';

function AccountMenu() {
  const [user] = useContext(UserAuthContext);

  const history = useHistory();

  const goTo = (whereTo) => {
    history.push(whereTo);
  };

  const items = [
    {
      label: 'Home',
      icon: <Home />,
      gap: 'small',
      onClick: () => goTo('/'),
    },
  ];
  if (user) {
    items.push(
      {
        label: 'Profile',
        icon: <User />,
        gap: 'small',
        onClick: () => goTo('/profile'),
      },
      {
        label: 'Sign Out',
        icon: <Logout />,
        gap: 'small',
        onClick: signOut,
      },
    );
  } else {
    items.push(
      {
        label: 'Sign In',
        icon: <Login />,
        gap: 'small',
        onClick: () => goTo('/sign-in'),
      },
      {
        label: 'Sign Up',
        icon: <Login />,
        gap: 'small',
        onClick: () => goTo('/sign-up'),
      },
      {
        label: 'Forgot Password?',
        icon: <UserSettings />,
        gap: 'small',
        onClick: () => goTo('/password-reset'),
      },
    );
  }

  return (
    <Menu
      plain
      dropProps={{
        align: { top: 'bottom', left: 'left' },
        elevation: 'xxlarge',
      }}
      items={items}
    >
      {() => (user ? (
        <Avatar src={user.photoURL} title={user.displayName} />
      ) : (
        <Avatar background="default">
          <User color="secondary" />
        </Avatar>
      ))}
    </Menu>
  );
}

export default AccountMenu;
