import './BoardCard.scss';

import { PencilAltIcon } from '@heroicons/react/solid';
import { editItem, Item } from '../../../features/board/board';
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import { useAppDispatch } from '../../../app/hooks';

interface BoardCardProps {
  item: Item;
}

function BoardCard({ item }: BoardCardProps) {
  let [isEdit, setIsEdit] = useState(false);
  let dispatch = useAppDispatch();

  function handleClickOnCard() {
    alert('show modal');
  }

  return (
    <div
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
                  id: item.id,
                  text: value,
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
