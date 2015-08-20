import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadCollection, setCollectionFilter, fetchCollection, CollectionFilters } from '../Actions/Actions';
import Game from '../Components/Game';

import 'normalize.scss/normalize.scss';
import './App.scss';

class App extends Component {
    render() {
        const { dispatch, collection, defaultUser } = this.props;
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
                        <button onClick={
                            addCollection => {
                                console.log(this.refs);
                                let username = this.refs.username.getDOMNode().value;
                                if(username) {
                                    dispatch(fetchCollection(username));
                                }
                            }
                        }>Fetch</button>
                        </div>
                        </form>
                </div>
                <div className="bgg-collection__game-list">
                    {collection.map((item, idx)=>{
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
        username: state.username,
        state: state
    }
}

export default connect(select)(App);
