// submit.js

export const SubmitButton = ({handleClick}) => {

    return (
      <div className="submit-btn-container">
        <button type="submit" className="submit-button" onClick={handleClick}>
          Submit
        </button>
      </div>
    );
}
