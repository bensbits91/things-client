import axios from 'axios'; // todo: should this be axiosInstance?

export async function GET(req, res) {
  // console.log('bb ~ route.js ~ req.query:', req.query);
  // console.log('bb ~ route.js ~ req.params:', req.params);
  // const { userId } = req.query || req.params;
  const url = new URL(req.url);
  const userId = url.searchParams.get('userId');
  // console.log('bb ~ route.js ~ userId:', userId);
  try { // todo: get stuff from process.env
    const tokenResponse = await axios.post('https://*******.us.auth0.com/oauth/token', {
      client_id: '*******',
      client_secret: '*******',
      audience: 'https://things/api',
      grant_type: 'client_credentials'
    });

    const token = tokenResponse.data.access_token;

    const userResponse = await axios.get(`https://*******.us.auth0.com/api/v2/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return NextResponse.json(userResponse.data.user_metadata);
  } catch (error) {
    console.error('Error fetching user metadata:', error);
    return NextResponse.json(
      { error: 'Error fetching user metadata', details: error.message },
      { status: error.response?.status || 500 }
    );  }
}