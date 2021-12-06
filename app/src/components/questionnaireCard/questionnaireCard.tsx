import * as React from 'react';
import questionnaireCard from './questionnaireCard.module.css';

const QuestionnaireCard = ({ title, desc, date, id, version }) => {
  return (
    <div className={questionnaireCard.card}>
      <strong>
        {title || 'No title provided'} {version || ''}
      </strong>{' '}
      <br />
      {desc || 'No description provided'} <br />
      {date ? date.substring(0, Math.min(10, date.length)) : 'No date provided'} <br />
      id: {id}
    </div>
  );
};

export default QuestionnaireCard;
