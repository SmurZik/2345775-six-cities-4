import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-action';
import { AuthorizationStatus } from '../constants/status';

function LoginHeader(): JSX.Element {
  const dispatch = useAppDispatch();
  const email = useAppSelector((state) => state.email);
  const favoriteOffers = useAppSelector((state) => state.favorites);
  const status = useAppSelector((state) => state.authorizationStatus);
  const handleSignOut = () => {
    dispatch(logoutAction());
  };
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to="/" className="header__logo-link">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {status === AuthorizationStatus.Auth && (
                <li className="header__nav-item user">
                  <Link to="/favorites" className="header__nav-link header__nav-link--profile">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">{email}</span>
                    <span className="header__favorite-count">{favoriteOffers.length}</span>
                  </Link>
                </li>
              )}
              <li className="header__nav-item">
                {status === AuthorizationStatus.Auth ? (
                  <a className="header__nav-link" onClick={handleSignOut}>
                    <span className="header__signout">Sign out</span>
                  </a>
                ) : (
                  <Link to="/login" className="header__nav-link">Login</Link>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default LoginHeader;
