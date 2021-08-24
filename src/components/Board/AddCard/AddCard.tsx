import './AddCard.scss';

function AddCard() {
  return (
    <div className="AddCard">
      <form>
        <textarea className="AddCard__textarea" rows={4}></textarea>
        <button className="btn btn--success">Save</button>
      </form>
    </div>
  );
}

export default AddCard;
