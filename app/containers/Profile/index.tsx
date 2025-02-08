// have to build a user profile page.
// The page should have the following sections:
// - User information (name, email, phone, address)
// - User's profile delete button

import { Avatar, AvatarFallback, AvatarImage } from '@components/base/ui/avatar';
import { Button } from '@components/base/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@components/base/ui/card';
import { FbUser } from '@containers/Auth/types';
import AuthContext from '@contexts/AuthContext';
import { Trash } from 'lucide-react';
import { useContext, useEffect } from 'react';
import { useDeleteUserMutation } from '@store/services/userApi';

const UserProfile = () => {
  const { user, currentUser, triggerUnAuthenticate } = useContext(AuthContext);
  const [deleteUser, result] = useDeleteUserMutation();

  const handleDeleteClick = async () => {
    await deleteUser(currentUser?._id);
  };

  const handleLogout = () => {
    triggerUnAuthenticate();
  };

  useEffect(() => {
    if (result.isSuccess) {
      handleLogout();
    }
  }, [result.isSuccess]);

  const { displayName: name, email, photoURL: avatarUrl } = user as FbUser;
  return (
    <div className="flex flex-1 justify-center items-center h-full">
      <Card className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto p-4 shadow-lg rounded-2xl">
        <CardHeader className="flex flex-col items-center text-center">
          <Avatar className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32">
            <AvatarImage src={avatarUrl} alt={name} />
            <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <CardTitle className="mt-4 text-lg sm:text-xl md:text-2xl font-semibold">{name}</CardTitle>
          <p className="text-sm sm:text-base text-gray-500">{email}</p>
        </CardHeader>
        <CardContent className="text-center px-4 sm:px-6 md:px-8">
          <div className="flex flex-col gap-2 justify-center">
            <Button variant="outline" className="flex items-center gap-2 text-sm sm:text-base" onClick={handleLogout}>
              Logout
            </Button>
            <Button
              variant="destructive"
              className="flex items-center gap-2 text-sm sm:text-base"
              onClick={handleDeleteClick}
              disabled={result.isLoading || !currentUser?._id}
            >
              <Trash size={16} /> Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
