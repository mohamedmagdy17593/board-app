import './AddCard.scss';

import { useEffect, useState } from 'react';
import { useCallback, useRef } from 'react';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';
import { XIcon, SaveIcon } from '@heroicons/react/outline';

interface AddCardProps {
  close: () => void;
  onAdd: (value: string) => void;
}

function AddCard({ close, onAdd }: AddCardProps) {
  let addCardRef = useRef<HTMLDivElement>(null);
  let actionsRef = useRef<HTMLDivElement>(null);
  let textAreaRef = useRef<HTMLTextAreaElement>(null);
  let [text, setText] = useState('');

  useEffect(() => {
    textAreaRef.current?.scrollIntoView();
    textAreaRef.current?.focus();
  }, []);

  useOnClickOutside(
    addCardRef,
    useCallback(() => {
      close();
    }, [close]),
  );

  function handleAdd() {
    let textValue = text.trim();
    if (textValue) {
      onAdd(textValue);
    }
  }

  return (
    <div ref={addCardRef} className="AddCard">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAdd();
        }}
      >
        <textarea
          ref={textAreaRef}
          name="text"
          className="AddCard__textarea"
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleAdd();
            }
          }}
        ></textarea>
        <div ref={actionsRef} className="AddCard__actions">
          <button className="btn btn--success" type="submit">
            <SaveIcon className="btn__icon" />
            Save
          </button>
          <button
            aria-label="close"
            className="btn btn--icon"
            type="button"
            onClick={close}
          >
            <XIcon className="btn__icon" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCard;
