import axios from 'axios';

export interface QuestionnaireType {
  title: string;
  description: string;
  id: string;
  item: Array<ItemType>;
}

interface AnswerOptionType {
  [key: string]: string;
}

export interface ItemType {
  linkId: string;
  text: string;
  type: string;
  required?: boolean;
  prefix?: string;
  answerOption?: Array<AnswerOptionType>;
  item?: Array<ItemType>;
  enableWhen?: Array<{[key: string]: any}>;
  enableBehaviour?: string;
}

export interface GroupItemType {
  linkId: string;
  text: string;
  type: string;
  required?: boolean;
  prefix?: string;
  item: Array<ItemType>;
}

const getQuestionnaire = async (id: string) => {
  try {
    const res = await axios.get(`/api/questionnaire/${id}`);
    const questionnaireResponse: QuestionnaireType = res.data;

    return questionnaireResponse;
  } catch (err) {
    const empty: QuestionnaireType = {
      title: '',
      description: '',
      id: '',
      item: [],
    };
    return empty;
  }
};

export default getQuestionnaire;
