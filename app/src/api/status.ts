import axios from 'axios';

interface StatusResponse {
  status: string;
}

const getStatus = async () => {
  try {
    const res = await axios.get('/api/status');
    const statusResponse: StatusResponse = res.data;

    return statusResponse.status;
  } catch (err) {
    return 'not running';
  }
};

export default getStatus;
