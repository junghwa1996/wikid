import instance from '../../lib/axios-client';

export default async function fetchUserData() {
  try {
    const response = await instance.get('/user/profile');
    console.log('User Data:', response.data);
  } catch (error) {
    console.error('Failed to fetch user data:', error);
  }
}
