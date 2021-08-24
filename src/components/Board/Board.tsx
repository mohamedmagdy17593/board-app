import './Board.scss';

import { PlusIcon } from '@heroicons/react/solid';
import BoardCard from './BoardCard/BoardCard';
import { useSelector, useStore } from 'react-redux';
import { selectTodos } from '../../features/board/board';
import { useState } from 'react';
import AddCard from './AddCard/AddCard';

function Board() {
  let todos = useSelector(selectTodos);

  let [isAdd, setIsAdd] = useState(false);

  console.log({ todos });

  return (
    <div className="Board">
      <div className="Board__header">To Do</div>

      <div className="Board__cards__wrapper">
        <BoardCard />
      </div>

      {isAdd ? (
        <AddCard />
      ) : (
        <div className="Board__actions">
          <button className="btn btn--block" onClick={() => setIsAdd(true)}>
            <PlusIcon className="btn__icon" />
            Add a card
          </button>
        </div>
      )}
    </div>
  );
}

export default Board;
