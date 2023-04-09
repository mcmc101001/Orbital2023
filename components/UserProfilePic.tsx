import { getCurrentUser } from '@/lib/session';
import { User } from 'lucide-react';
import Image from 'next/image';
import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';

async function UserProfilePic() {
  const user = await getCurrentUser();
  return (
    <li className='mt-auto mb-2 flex flex-col items-center justify-center gap-y-4'>
      { user ? (
        <>
          <Image src={user.image!} alt={user.name ?? 'profile image'} width={ 50 } height={ 50 }/>
          <LogoutButton />
        </>
      ) : (
        <>
          <User className="text-slate-200 h-12 w-12" />
          <LoginButton />
        </>
      )}
    </li>
  );
}

export default UserProfilePic;