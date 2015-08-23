import React, { Component, PropTypes } from 'react/addons';
const { CSSTransitionGroup } = React.addons;
import classnames from 'classnames';
import { connect } from 'react-redux';
import _ from 'lodash';

import { loadCollection, addCollectionFilter, removeCollectionFilter, fetchCollection, CollectionFilters } from '../Actions/Actions';
import Game from '../Components/Game';
import Control from '../Components/Controls/Control';
import Icons, { hamburger, person } from '../Constants/Icons';

import 'normalize.scss/normalize.scss';
import './App.scss';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hideControls: false
        };
        this.handleFetch = _.throttle(this.handleFetch.bind(this), 1500);
    }
    toggleControls() {
        this.setState({
            hideControls: !this.state.hideControls
        });
    }
    handleFilter(filterName, filterValue, filterType) {
        const { dispatch } = this.props;
        if(!filterName) {
            return;
        }
        if(filterValue) {
            dispatch(addCollectionFilter(filterName, filterValue));
        } else {
            dispatch(removeCollectionFilter(filterName));
        }
    }
    handleFetch() {
        const username = this.refs.username.getDOMNode().value;
        const { dispatch } = this.props;
        dispatch(fetchCollection(username));
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
                    <form onSubmit={(ev)=>{
                            ev.preventDefault();
                            this.handleFetch();
                        }}>
                        <div className="bgg-collection__controls-name">
                            <input type="text" ref="username" defaultValue={this.props.defaultUser} />
                        </div>
                        <div className="bgg-collection__controls-submit">
                            <button>Fetch</button>
                        </div>
                        <div className="bgg-collection__filters">
                            <Control fieldName="liveSearch" fieldType="text" onChange={_.throttle(this.handleFilter.bind(this), 50)}>
                                <label>Text search</label>
                            </Control>
                            <Control fieldName="players" fieldType="number" onChange={this.handleFilter.bind(this)}>
                                <label>{person} Players</label>
                            </Control>
                            <Control fieldName="plays" fieldType="number" onChange={this.handleFilter.bind(this)}>
                                <label>{Icons.die} Plays</label>
                            </Control>
                            <Control fieldName="rating" fieldType="number" onChange={this.handleFilter.bind(this)}>
                                <label>Rating</label>
                            </Control>
                            <Control fieldName="neverPlayed" fieldType="checkbox" onChange={this.handleFilter.bind(this)}>
                                <label>Never played?</label>
                            </Control>
                            <Control fieldName="hideExpansions" fieldType="checkbox" onChange={this.handleFilter.bind(this)}>
                                <label>Hide expansions?</label>
                            </Control>
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
            case 'plays':
                return collection.filter((item)=>{
                    return (value > -1 ? item.numPlays >= value : true);
                });
            case 'hideExpansions':
                return collection.filter((item)=>{
                    return (value ? !item.isExpansion : true);
                });
            case 'rating':
                return collection.filter((item)=>{
                    return (value ? item.ratingAverage >= value : true);
                });
            case 'neverPlayed':
                return collection.filter((item)=>{
                    return item.numPlays === 0
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
