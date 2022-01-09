import React from 'react';

import './styles.css';

/**
 * Used https://codepen.io/stefanjs98/pen/ambVgK
 */
export default function GooogleButton({ onClick }) {
  return (
    <div
      role="button"
      className="google-btn"
      onClick={onClick}
      onKeyDown={onClick}
      tabIndex={0}
    >
      <div className="google-icon-wrapper">
        <img
          className="google-icon"
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          alt="Google"
        />
      </div>
      <p className="btn-text"><b>Sign in with google</b></p>
    </div>
  );
}
