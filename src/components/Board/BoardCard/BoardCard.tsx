import './BoardCard.scss';

import { PencilAltIcon } from '@heroicons/react/solid';
import { TrashIcon } from '@heroicons/react/outline';
import { editItem, Item, deleteItem } from '../../../features/board/boardSlice';
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { Draggable } from 'react-beautiful-dnd';
import { BoardType } from '../../../types';
import Modal from '../../Modal/Modal';
import ViewModalContent from './ViewModalContent/ViewModalContent';

interface BoardCardProps {
  item: Item;
  itemIndex: number;
  boardType: BoardType;
}

function BoardCard({ item, itemIndex, boardType }: BoardCardProps) {
  let dispatch = useAppDispatch();

  let [isEdit, setIsEdit] = useState(false);
  let [showModal, setShowModal] = useState(false);

  function handleClickOnCard() {
    setShowModal(true);
  }

  return (
    <>
      <Draggable draggableId={item.id} index={itemIndex}>
        {(draggableProvided) => (
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
              <div className="BoardCard__wrapper">
                <button
                  aria-label="edit card"
                  className="btn btn--icon BoardCard__btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEdit(true);
                  }}
                >
                  <PencilAltIcon className="btn__icon" />
                </button>
                <button
                  aria-label="delete card"
                  className="btn btn--icon BoardCard__btn BoardCard__btn--danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(
                      deleteItem({
                        boardType,
                        itemId: item.id,
                      }),
                    );
                  }}
                >
                  <TrashIcon className="btn__icon" />
                </button>
              </div>
            )}
          </div>
        )}
      </Draggable>

      <Modal show={showModal} close={() => setShowModal(false)}>
        <ViewModalContent
          item={item}
          onSave={(value) => {
            setShowModal(false);
            dispatch(
              editItem({
                boardType,
                item: {
                  id: item.id,
                  ...value,
                },
              }),
            );
          }}
          onDelete={() => {
            setShowModal(false);
            dispatch(
              deleteItem({
                boardType,
                itemId: item.id,
              }),
            );
          }}
        />
      </Modal>
    </>
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
