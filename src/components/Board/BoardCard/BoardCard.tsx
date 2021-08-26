import './BoardCard.scss';

import { PencilAltIcon } from '@heroicons/react/solid';
import { editItem, Item } from '../../../features/board/boardSlice';
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { Draggable } from 'react-beautiful-dnd';
import { BoardType } from '../../../types';

interface BoardCardProps {
  item: Item;
  itemIndex: number;
  boardType: BoardType;
}

function BoardCard({ item, itemIndex, boardType }: BoardCardProps) {
  let [isEdit, setIsEdit] = useState(false);
  let dispatch = useAppDispatch();

  function handleClickOnCard() {
    alert('show modal');
  }

  return (
    <Draggable draggableId={item.id} index={itemIndex}>
      {(draggableProvided, draggableSnapshot) => (
        <div
          ref={draggableProvided.innerRef}
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
          className="BoardCard"
          role="button"
          tabIndex={1}
          onClick={isEdit ? undefined : handleClickOnCard}
        >
          {isEdit ? (
            <BoardCardContentEditableDiv
              text={item.text}
              close={() => setIsEdit(false)}
              onEdit={(value) => {
                if (value) {
                  dispatch(
                    editItem({
                      boardType,
                      item: {
                        id: item.id,
                        text: value,
                      },
                    }),
                  );
                  setIsEdit(false);
                }
              }}
            />
          ) : (
            <div className="BoardCard__text">{item.text}</div>
          )}

          {!isEdit && (
            <button
              className="btn btn--icon BoardCard__btn"
              onClick={(e) => {
                e.stopPropagation();
                setIsEdit(true);
              }}
            >
              <PencilAltIcon className="btn__icon" />
            </button>
          )}
        </div>
      )}
    </Draggable>
  );
}

interface BoardCardContentEditableDivProps {
  text: string;
  close: () => void;
  onEdit: (value: string) => void;
}

function BoardCardContentEditableDiv({
  text,
  close,
  onEdit,
}: BoardCardContentEditableDivProps) {
  let contentEditableRef = useRef<HTMLDivElement>(null);
  let [value, setValue] = useState(text);

  useEffect(() => {
    contentEditableRef.current?.focus();
    document.execCommand('selectAll', false);
  }, []);

  function handleEdit() {
    let textValue = value?.trim();
    if (textValue) {
      onEdit(textValue);
    }
  }

  return (
    <div
      ref={contentEditableRef}
      className="BoardCard__text"
      contentEditable
      suppressContentEditableWarning
      onBlur={(e) => {
        close();
      }}
      onKeyPress={(e) => {}}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleEdit();
        } else if (e.key === 'Escape') {
          close();
        }
      }}
      onInput={(e) => {
        setValue(e.currentTarget.textContent ?? '');
      }}
    >
      {text}
    </div>
  );
}

export default BoardCard;
