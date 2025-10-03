import React from "react";

const InfoModal = ({ show, onClose, title, details }) => {
  if (!show) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <p>
              <label className="form-labal">BIO :</label>
              {details.bio}
            </p>
            {details.movies.length > 0 && (
              <>
                <strong>Movies:</strong>
                <ul>
                  {details.movies.map((movie, index) => (
                    <li key={index}>{movie}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
