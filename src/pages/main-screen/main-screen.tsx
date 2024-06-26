import OfferList from '../../components/offer-list/offer-list';
import Map from '../../components/map/map';
import { useAppSelector } from '../../hooks';
import CityList from '../../components/city-list/city-list';
import FilterForm from '../../components/filter-form/filter-form';
import LoginHeader from '../../components/login-header/login-header';
import { getCity, getHasError, getOffers } from '../../store/offer-process/selectors';
import EmptyOffers from '../../components/empty-offers/empty-offers';

function MainScreen(): JSX.Element {
  const city = useAppSelector(getCity);
  const offers = useAppSelector(getOffers);
  const cityOffers = offers.filter((offer) => offer.city.name === city);
  const hasError = useAppSelector(getHasError);

  return (
    <div className="page page--gray page--main">
      <LoginHeader />
      <main className={`page__main page__main--index ${hasError ? 'page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CityList chosenCity={city} />
          </section>
        </div>
        {hasError ? (
          <EmptyOffers />
        ) : (
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{cityOffers.length} places to stay in {city}</b>
                <FilterForm />
                <OfferList offers={cityOffers} listType={'default'} />
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map points={cityOffers.map((of) => of.location)} city={cityOffers[0].city} />
                </section>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
export default MainScreen;
