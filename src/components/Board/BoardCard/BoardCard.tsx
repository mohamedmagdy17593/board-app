import './BoardCard.scss';

import { PencilAltIcon } from '@heroicons/react/solid';

function BoardCard({}) {
  return (
    <div className="BoardCard">
      <span>Lorem ipsum dolor sit</span>
      <button className="btn btn--icon BoardCard__btn">
        <PencilAltIcon className="btn__icon" />
      </button>
    </div>
  );
}

export default BoardCard;
