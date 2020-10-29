import React from 'react';
import { Link } from 'react-router-dom';

import backIcon from '../../assets/icons/back.svg';

import './styles.css';

interface IPageHeaderProps {
  title: string;
  description?: string;
}

const PageHeader: React.FC<IPageHeaderProps> = ({
  title,
  description,
  children,
}) => (
  <header className="page-header">
    <div className="top-bar-container">
      <Link to="/">
        <img src={backIcon} alt="Voltar" />
      </Link>
      <div id="logo">Arquimat</div>
    </div>

    <div className="header-content">
      <strong>{title}</strong>
      {description && <p>{description}</p>}
      {children}
    </div>
  </header>
);

export default PageHeader;
