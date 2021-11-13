import getStatus from './../src/api/status';
import axios, { AxiosResponse } from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('test get status', function() {
	it('test get status called with correct params', async () => {
		const mockedGet = jest.spyOn(axios, "get").mockImplementation(() => Promise.resolve({data: []}));

		getStatus();

	 	expect(mockedGet).toBeCalledWith('/api/status');
		expect(axios.get).toHaveBeenCalledTimes(1);
	});

	it('test get status returns correct object', async () => {
		const status = {
			status: "running"
		}
		const mockedGet = jest.spyOn(axios, "get").mockImplementation(() => Promise.resolve({data: status}));

		const data = await getStatus();

	 	expect(data).toEqual("running");
	});

	it('test get status error is correct with default value', async () => {

		const mockedGet = jest.spyOn(axios, "get").mockRejectedValue(new Error('error'));

		const data = await getStatus();

	 	expect(data).toEqual("not running");
	});
})