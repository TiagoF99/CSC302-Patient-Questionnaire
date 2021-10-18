import axios from 'axios';

export interface questionnaireType {
  title: string,
  description: string,
  id: string,
  item: Array<itemType>
}

interface answerOptionType {
    [key: string]: string
}

export interface itemType {
  linkId: string,
  text: string,
  type: string,
  required?: boolean,
  prefix?: string,
  answerOption?: Array<answerOptionType>,
  item?: Array<itemType>
}

export interface groupItemType {
  linkId: string,
  text: string,
  type: string,
  required?: boolean,
  prefix?: string,
  item: Array<itemType>
}

const getQuestionnaire = async (id: string) => {
  try {
    const res = await axios.get('/api/questionnaire/' + id);
    const questionnaireResponse: questionnaireType = res.data;

    return questionnaireResponse;
  } catch (err) {
  	const empty: questionnaireType = {
		title: '',
		description: '',
		id: '',
		item: Array()
	};
	return empty
  }
};

export default getQuestionnaire;

