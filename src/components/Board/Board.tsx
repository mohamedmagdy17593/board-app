import './Board.scss';

import { PlusIcon } from '@heroicons/react/solid';
import BoardCard from './BoardCard/BoardCard';
import { addItem, selectBoard } from '../../features/board/boardSlice';
import { useState } from 'react';
import AddCard from './AddCard/AddCard';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Droppable } from 'react-beautiful-dnd';
import { useRef } from 'react';
import { useEffect } from 'react';
import { BoardType } from '../../types';

interface BoardProps {
  name: string;
  boardType: BoardType;
  canAdd?: boolean;
}

function Board({ name, boardType, canAdd = false }: BoardProps) {
  let board = useAppSelector(selectBoard(boardType));

  console.log({ board });

  return (
    <div className="Board">
      <div className="Board__header">{name}</div>

      <div className="Board__content">
        <Droppable droppableId={boardType}>
          {(droppableProvided, droppableSnapshot) => (
            <div
              ref={droppableProvided.innerRef}
              className="Board__cards__wrapper"
            >
              {board.map((item, index) => {
                return (
                  <BoardCard
                    key={item.id}
                    item={item}
                    itemIndex={index}
                    boardType={boardType}
                  />
                );
              })}
              {droppableProvided.placeholder}
            </div>
          )}
        </Droppable>

        <div className="Board__actions">
          {canAdd && <AddAction boardType={boardType} />}
        </div>
      </div>
    </div>
  );
}

interface AddActionProps {
  boardType: BoardType;
}

function AddAction({ boardType }: AddActionProps) {
  let dispatch = useAppDispatch();

  let mounted = useRef(false);
  let addButtonRef = useRef<HTMLButtonElement>(null);

  let [isAdd, setIsAdd] = useState(false);

  useEffect(() => {
    if (mounted.current && !isAdd) {
      addButtonRef.current?.focus();
    }
  }, [isAdd]);

  // should run last
  useEffect(() => {
    mounted.current = true;
  }, []);

  function closeAddCard() {
    setIsAdd(false);
  }

  if (isAdd) {
    return (
      <AddCard
        close={closeAddCard}
        onAdd={(value) => {
          dispatch(addItem({ boardType, text: value }));
          closeAddCard();
        }}
      />
    );
  }

  return (
    <button
      ref={addButtonRef}
      className="btn btn--block"
      onClick={() => setIsAdd(true)}
    >
      <PlusIcon className="btn__icon" />
      Add a card
    </button>
  );
}

export default Board;
