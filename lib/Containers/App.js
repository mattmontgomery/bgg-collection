import React, { Component, PropTypes } from 'react/addons';
const { CSSTransitionGroup } = React.addons;
import { connect } from 'react-redux';
import { loadCollection, addCollectionFilter, removeCollectionFilter, fetchCollection, CollectionFilters } from '../Actions/Actions';
import Game from '../Components/Game';
import slug from 'slug';
import 'normalize.scss/normalize.scss';
import './App.scss';
import _ from 'lodash';
import { hamburger } from '../Constants/Icons';
import classnames from 'classnames';

/**
 * @TODO Separate filters into separate component
 * @TODO Find a way to display duplicate gameIds
 */

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hideControls: false
        };
    }
    toggleControls() {
        this.setState({
            hideControls: !this.state.hideControls
        });
    }
    render() {
        const { dispatch, defaultUser, status, visibleCollection } = this.props;
        const { hideControls } = this.state;
        let controlClasses = {
            'bgg-collection__controls': true,
            'bgg-collection__controls--hidden': hideControls
        };
        return (
            <div className="bgg-collection">
                <div className={classnames(controlClasses)}>
                    <div className="bgg-collection__controls-toggle" onClick={this.toggleControls.bind(this)}>{hamburger}</div>
                    <form onSubmit={
                        (event) => {
                            event.preventDefault();
                            let username = this.refs.username.getDOMNode().value;
                            if(username) {
                                dispatch(fetchCollection(username));
                            }
                        }
                    }>
                        <div className="bgg-collection__controls-name">
                            <input type="text" ref="username" defaultValue={this.props.defaultUser} />
                        </div>
                        <div className="bgg-collection__controls-submit">
                            <button>Fetch</button>
                        </div>
                        <div className="bgg-collection__filters">
                            <div className="bgg-collection__controls-filter bgg-collection__controls-filter--small">
                                <label>Players</label>
                                <input type="number" onChange={(event)=>{
                                    let value = (_.parseInt(event.target.value) || 0);
                                    if(_.isNaN(value)) { value = 0; }
                                    if(value) {
                                        dispatch(addCollectionFilter('players', value));
                                    } else {
                                        dispatch(removeCollectionFilter('players'));
                                    }
                                }} />
                            </div>
                            <div className="bgg-collection__controls-filter bgg-collection__controls-filter--small">
                                <label>Rating</label>
                                <input type="text" onChange={(event)=>{
                                    let value = (_.parseInt(event.target.value) || 0);
                                    if(_.isNaN(value)) { value = 0; }
                                    if(value) {
                                        dispatch(addCollectionFilter('rating', value));
                                    } else {
                                        dispatch(removeCollectionFilter('rating'));
                                    }
                                }} />
                            </div>
                            <div className="bgg-collection__controls-filter bgg-collection__controls-filter--small">
                                <label>Include expansions</label>
                                <input type="checkbox" defaultChecked={true} value="includeExpansions" onChange={(event)=>{
                                    if(event.target.checked) {
                                        dispatch(addCollectionFilter('includeExpansions', true));
                                    } else {
                                        dispatch(addCollectionFilter('includeExpansions', false));
                                    }
                                }} />
                            </div>
                            <div className="bgg-collection__controls-filter bgg-collection__controls-filter">
                                <label>Live search</label>
                                <input type="text" onChange={_.throttle((event)=>{
                                    if(event.target.value) {
                                        dispatch(addCollectionFilter('liveSearch', event.target.value));
                                    } else {
                                        dispatch(removeCollectionFilter('liveSearch', false));
                                    }
                                }, 50)} />
                            </div>
                        </div>
                    </form>
                </div>
                <div className="bgg-collection__game-list">
                    {visibleCollection.map((item, idx)=>{
                        return <Game {...item} key={`${item.collectionId}`} />
                    })}
                </div>
            </div>
        )
    }
}

App.propTypes = {
    collection: PropTypes.arrayOf(PropTypes.shape({
        objectId: PropTypes.number.isRequired,
        collectionId: PropTypes.number.isRequired,
        name: PropTypes.string,
        image: PropTypes.string,
        thumbnail: PropTypes.str,
        ratingAverage: PropTypes.number.isRequired
    }))
};
App.defaultProps = {
    defaultUser: 'moonty'
}
App.state = {
    hideControls: false
}
function filterVisibleCollection(collection, filters = []) {
    if(filters.length === 0) {
        filters.push({ filter: 'SHOW_ALL', value: null });
    }
    let collections = filters.map((filterObj)=>{
        let { value, filter } = filterObj;
        switch (filter) {
            case 'SHOW_ALL':
                return collection.filter((item)=>{
                    return item.status.own || item.status.preordered
                });
            case 'players':
                return collection.filter((item)=>{
                    return (value ? item.minPlayers <= value && item.maxPlayers >= value : true);
                });
            case 'includeExpansions':
                return collection.filter((item)=>{
                    return (value ? true : !item.isExpansion);
                });
            case 'rating':
                return collection.filter((item)=>{
                    return (value ? item.ratingAverage >= value : true);
                });
            case 'isExpansion':
                return collection.filter((item)=>{
                    return item.isExpansion === value
                });
            case 'liveSearch':
                return collection.filter((item)=>{
                    return item.name.toLowerCase().indexOf(value.toLowerCase()) > -1;
                });
            default:
                return collection;
        }
    });
    return _.partial.apply(null, [_.intersection].concat(collections))();
}

function select(state) {
    return {
        collection: state.collection,
        filters: state.filters,
        visibleCollection: filterVisibleCollection(state.collection, state.filterCollection),
        username: state.username,
        status: state.status
    }
}

export default connect(select)(App);
