import './ViewModalContent.scss';

import { SaveIcon, TrashIcon } from '@heroicons/react/outline';
import { Item } from '../../../../features/board/boardSlice';

interface ViewModalContentProps {
  item: Item;
  onSave: (value: { text: string; description: string }) => void;
  onDelete: () => void;
}

function ViewModalContent({ item, onSave, onDelete }: ViewModalContentProps) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let form = e.target as EventTarget & {
      text: HTMLInputElement;
      description: HTMLTextAreaElement;
    };
    let text = form.text.value?.trim();
    let description = form.description.value;

    // simple validation
    if (!text) {
      return alert('Please type a card Text!');
    }

    onSave({ text, description });
  }

  return (
    <div className="ViewModalContent">
      <form onSubmit={handleSubmit}>
        <div className="InputItem">
          <label htmlFor="modal-text-field" className="InputItem__label">
            Text
          </label>
          <input
            className="InputItem__input"
            id="modal-text-field"
            name="text"
            defaultValue={item.text}
            placeholder="Card text"
          ></input>
        </div>

        <div className="InputItem">
          <label htmlFor="modal-text-field" className="InputItem__label">
            Description
          </label>
          <textarea
            className="InputItem__input"
            id="modal-text-field"
            name="description"
            placeholder="Add a more detailed description…"
            defaultValue={item.description}
            rows={5}
          ></textarea>
        </div>

        <div className="ViewModalContent__footer">
          <button className="btn btn--success" type="submit">
            <SaveIcon className="btn__icon" />
            Save
          </button>
          <button className="btn " type="button" onClick={onDelete}>
            <TrashIcon className="btn__icon" />
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}

export default ViewModalContent;
