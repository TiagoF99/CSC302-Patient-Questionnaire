import { getQuestionnaire, postQuestionnaire } from './../src/api/questionnaire';
import axios, { AxiosResponse } from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('test questionnaire requests', function() {
	it('test get questionnaire called with correct params', async () => {
		const mockedGet = jest.spyOn(axios, "get").mockImplementation(() => Promise.resolve({data: []}));

		getQuestionnaire('dummy');

	 	expect(mockedGet).toBeCalledWith('/api/questionnaire/dummy');
		expect(axios.get).toHaveBeenCalledTimes(1);
	});

	it('test get questionnaire returns correct object', async () => {

		var questionnaire = {
			title: 'dummy title',
			description: 'dummy desc',
			id: '1',
			item: [
				{
					linkId: "11",
				    text: 'text item',
				    type: 'string'
				}
			]
		}

		const mockedGet = jest.spyOn(axios, "get").mockImplementation(() => Promise.resolve({data: questionnaire}));

		const data = await getQuestionnaire('dummy');

	 	expect(data).toEqual({
	 		"description": "dummy desc",
    	   	"id": "1",
    	   	"item": [
	         	{
	           		"linkId": "11",
	           		"text": "text item",
	           		"type": "string",
	         	},
       		],
       		"title": "dummy title",
	 	});
	});

	it('test get questionnaire error is correct with default value', async () => {

		const mockedGet = jest.spyOn(axios, "get").mockRejectedValue(new Error('error'));

		const data = await getQuestionnaire('dummy');

	 	expect(data).toEqual({
	 		"description": "",
    	    "id": "",
    	    "item": [],
    	    "title": "",
	 	});
	});

	it('test post questionnaire called with correct params', async () => {
		const mockedGet = jest.spyOn(axios, "post").mockImplementation(() => Promise.resolve({data: []}));

		postQuestionnaire("id", {});

	 	expect(mockedGet).toBeCalledWith('/api/questionnaire/id', {});
		expect(axios.post).toHaveBeenCalledTimes(1);
	});

	it('test post questionnaire returns correct result', async () => {
		var questionnaire = {
			title: 'dummy title',
			description: 'dummy desc',
			id: '1',
			item: [
				{
					linkId: "11",
				    text: 'text item',
				    type: 'string'
				}
			]
		}

		const mockedGet = jest.spyOn(axios, "post").mockImplementation(() => Promise.resolve({data: questionnaire}));
		const res = await postQuestionnaire("id", {});
		
	 	expect(mockedGet).toBeCalledWith('/api/questionnaire/id', {});
		expect(axios.post).toHaveBeenCalledTimes(2);

		expect(res.data.title).toEqual('dummy title');
		expect(res.data.id).toEqual('1');
	});
})