import React, { Component, PropTypes } from 'react/addons';
let { CSSTransitionGroup } = React.addons;
import { connect } from 'react-redux';
import { loadCollection, setCollectionFilter, fetchCollection, CollectionFilters } from '../Actions/Actions';
import Game from '../Components/Game';
import slug from 'slug';
import 'normalize.scss/normalize.scss';
import './App.scss';
import _ from 'lodash';

/**
 * @TODO Separate filters into separate component
 */

class App extends Component {
    render() {
        const { dispatch, collection, defaultUser, status, filteredCollection } = this.props;
        let useCollection = (filteredCollection ? filteredCollection : collection);
        console.log(useCollection);
        return (
            <div className="bgg-collection">
                <div className="bgg-collection__controls">
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
                        <div className="bgg-collection__controls-filter bgg-collection__controls-filter--small">
                            Minimum players <input type="text" ref="filter_minPlayers" onChange={(event)=>{
                                var value = event.target.value;
                                var parsedValue = _.parseInt(value);
                                if(!value) {
                                    value = 0;
                                }
                                if(_.isNaN(parsedValue)) {
                                    return;
                                }
                                dispatch(setCollectionFilter(collection, 'minPlayers', value, 'atLeast'));
                            }} />
                        </div>
                        <div className="bgg-collection__controls-status">
                            {this.props.status}
                        </div>
                    </form>
                </div>
                <div className="bgg-collection__game-list">
                    {useCollection.map((item, idx)=>{
                        return <Game {...item} key={idx} />
                    })}
                </div>
            </div>
        )
    }
}

App.propTypes = {
    collection: PropTypes.arrayOf(PropTypes.shape({
        gameId: PropTypes.number.isRequired,
        name: PropTypes.string,
        image: PropTypes.string,
        thumbnail: PropTypes.string,
        minPlayers: PropTypes.number,
        maxPlayers: PropTypes.number,
        playingTime: PropTypes.number,
        isExpansion: PropTypes.bool,
        yearPublished: PropTypes.number,
        bggRating: PropTypes.number,
        averageRating: PropTypes.number,
        rank: PropTypes.number,
        numPlays: PropTypes.number,
        rating: PropTypes.number,
        owned: PropTypes.bool,
        preOrdered: PropTypes.bool,
        forTrade: PropTypes.bool,
        previousOwned: PropTypes.bool,
        want: PropTypes.bool,
        wantToPlay: PropTypes.bool,
        wantToBuy: PropTypes.bool,
        wishList: PropTypes.bool,
        userComment: PropTypes.string
    }))
};
App.defaultProps = {
    defaultUser: 'moonty'
}
function select(state) {
    return {
        collection: state.collection,
        rawCollection: state.rawCollection,
        filteredCollection: state.filteredCollection,
        username: state.username,
        state: state,
        status: state.status
    }
}

export default connect(select)(App);
