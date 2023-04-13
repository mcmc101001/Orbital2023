import { getCurrentUser } from '@/lib/session';
import { User } from 'lucide-react';
import Image from 'next/image';
import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';

async function UserProfilePic() {
  const user = await getCurrentUser();
  return (
    <li className='mt-2 mb-2 flex flex-col items-center justify-center gap-y-4'>
      { user ? (
        <>
          <Image loading="lazy" src={user.image!} alt={user.name ?? 'profile image'} referrerPolicy='no-referrer' width={ 50 } height={ 50 }/>
          <LogoutButton />
        </>
      ) : (
        <>
          <User className="dark:text-slate-200 text-slate-800 h-12 w-12" />
          <LoginButton />
        </>
      )}
    </li>
  );
}

export default UserProfilePic;