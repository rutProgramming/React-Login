import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Context } from '../App';
import { Button, Typography } from '@mui/material';
import { RouterProvider } from 'react-router';
import { router } from '../router';
import {  UserIdContext } from './WelcomePage';
import ProfileUpdateForm from './ProfileUpdateForm';
import { StyleHeader } from './style';
function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {

  return {
    sx: {
      bgcolor: stringToColor(name),
    },

    children: `${name.split(' ')[0][0]}`,
  };
}

export default () => {
  const [user] = React.useContext(Context);
  const userID = React.useContext<number>(UserIdContext);
  const [isUpdateModalOpen, setUpdateModalOpen] = React.useState(false);

  const handleOpenUpdateModal = () => setUpdateModalOpen(true);
  const handleCloseUpdateModal = () => setUpdateModalOpen(false);

  return (
    <>

        <div style={StyleHeader}>

          {!user.firstName ? (
            <>hello, {userID}</>
          ) : (
            <Stack direction="row" spacing={2}>
              <Avatar {...stringAvatar(user.firstName || 'Unknown User')} />
              <Typography variant="h6">{user.firstName || 'Unknown User'}</Typography>

            </Stack>
          )}
          <Button color="primary" onClick={handleOpenUpdateModal}>Update</Button>
          </div>
        {isUpdateModalOpen && (
          <ProfileUpdateForm onClose={handleCloseUpdateModal} />
        )}
            <RouterProvider router={router} />
    </>
  );
}
