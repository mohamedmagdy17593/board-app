import './BoardCard.scss';

import { PencilAltIcon } from '@heroicons/react/solid';
import { Item } from '../../../features/board/board';

interface BoardCardProps {
  item: Item;
}

function BoardCard({ item }: BoardCardProps) {
  return (
    <div className="BoardCard">
      <span>{item.text}</span>
      <button className="btn btn--icon BoardCard__btn">
        <PencilAltIcon className="btn__icon" />
      </button>
    </div>
  );
}

export default BoardCard;
