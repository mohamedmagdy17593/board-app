import './Board.scss';

import { PlusIcon } from '@heroicons/react/solid';
import BoardCard from './BoardCard/BoardCard';
import { addItem, selectTodos } from '../../features/board/board';
import { useState } from 'react';
import AddCard from './AddCard/AddCard';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

function Board() {
  let todos = useAppSelector(selectTodos);
  let dispatch = useAppDispatch();

  let [isAdd, setIsAdd] = useState(false);

  console.log({ todos });

  function closeAddCard() {
    setIsAdd(false);
  }

  return (
    <div className="Board">
      <div className="Board__header">To Do</div>

      <div className="Board__content">
        <div className="Board__cards__wrapper">
          {todos.map((item) => {
            return <BoardCard key={item.id} item={item} />;
          })}
        </div>

        <div className="Board__actions">
          {isAdd ? (
            <AddCard
              close={closeAddCard}
              onAdd={(value) => {
                dispatch(addItem(value));
                closeAddCard();
              }}
            />
          ) : (
            <button className="btn btn--block" onClick={() => setIsAdd(true)}>
              <PlusIcon className="btn__icon" />
              Add a card
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Board;
