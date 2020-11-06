import React, { ReactElement } from 'react';
import Modal, { Props as ModalProps } from 'react-modal';
import { Link } from 'react-router-dom';

import checkedIcon from '../../../assets/icons/success-check-icon.svg';

import './styles.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

function Win(props: ModalProps): ReactElement {
  return (
    <Modal style={customStyles} {...props}>
      <div className="win-modal">
        <div className="win-background">
          <img id="checked-icon" src={checkedIcon} alt="Ícone de check" />
          <h2>Vitória</h2>
          <p>
            Parabéns, você venceu, irá dormir mais inteligente do que ontem!
          </p>

          <div className="win-modal-buttons-container">
            <Link to="/start-match" className="play-again">
              &#x1F3AE; Jogar Novamente
            </Link>
            <Link to="/" className="go-to-home">
              &#x1F3E0; Voltar Para Home
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default Win;
