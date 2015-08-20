import React, { Component, PropTypes } from 'react';

import classnames from 'classnames';

import './Game.scss';

class Game extends Component {
    getGameLink() {
        const { gameId } = this.props;
        return `http://www.boardgamegeek.com/game/${gameId}`;
    }
    renderImage() {
        const { image, thumbnail } = this.props;
        if(!image) {
            return;
        }
        return (
            <div className="bgg-game__image">
                <a href={this.getGameLink()} target="_blank"><img src={thumbnail} /></a>
            </div>
        );
    }
    renderPlayers() {
        const { minPlayers, maxPlayers } = this.props;
        if(!minPlayers || !maxPlayers) {
            return;
        }
        var playerCount;
        if(minPlayers !== maxPlayers) {
            playerCount = `${minPlayers} – ${maxPlayers}`;
        } else {
            playerCount = `${minPlayers}`;
        }
        return (
            <div className="bgg-game__secondary-detail bgg-game__players">
                <label>👥Players</label> {playerCount}
            </div>
        );
    }
    renderPlayingTime() {
        const { playingTime } = this.props;
        if(!playingTime) {
            return;
        }
        return (
            <div className="bgg-game__secondary-detail bgg-game__players">
                <label>🕗Time</label> {playingTime}
            </div>
        );

    }
    renderRating() {
        const { rating, averageRating } = this.props;
        if(!averageRating) {
            return;
        }
        var personalRating = rating > -1 ? `(${rating})` : ''
        return (
            <div className="bgg-game__secondary-detail bgg-game__players">
                <label>👍Rating</label> {Math.round(averageRating*100)/100} <small>{personalRating}</small>
            </div>
        );

    }
    render() {
        const { name, yearPublished } = this.props;
        const gameClasses = {
            'bgg-game': true,
            'bgg-collection__game': true
        };
        return (
            <div className={classnames(gameClasses)}>
                {this.renderImage()}
                <div className="bgg-game__details">
                    <div className="bgg-game__title">
                        <h4><a href={this.getGameLink()} target="_blank">{name}</a> <small>({yearPublished})</small></h4>
                    </div>
                    <div className="bgg-game__secondary-details">
                        {this.renderPlayers()}
                        {this.renderPlayingTime()}
                        {this.renderRating()}
                    </div>
                </div>
            </div>
        )
    }
}

Game.propTypes = {
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
}

export default Game;
