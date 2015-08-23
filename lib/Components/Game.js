import React, { Component, PropTypes } from 'react';

import classnames from 'classnames';
import Icons from '../Constants/Icons';
import './Game.scss';

class Game extends Component {
    getGameLink() {
        const { objectId } = this.props;
        return `http://www.boardgamegeek.com/game/${objectId}`;
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
        let playerCount;
        if(minPlayers !== maxPlayers) {
            playerCount = `${minPlayers} – ${maxPlayers}`;
        } else {
            playerCount = `${minPlayers}`;
        }
        return (
            <div className="bgg-game__secondary-detail bgg-game__players">
                <label>Players {Icons.person}</label><div>{playerCount}</div>
            </div>
        );
    }
    renderPlayingTime() {
        const { minPlayTime, maxPlayTime } = this.props;
        let playingTime = (minPlayTime === maxPlayTime ? minPlayTime : `${minPlayTime}–${maxPlayTime}`);
        if(!playingTime) {
            return;
        }
        return (
            <div className="bgg-game__secondary-detail bgg-game__players">
                <label>Time {Icons.clock}</label><div>{playingTime}</div>
            </div>
        );

    }
    renderRating() {
        const { rating, ratingAverage, ratingsBreakpoint } = this.props;
        if(!ratingAverage) {
            return;
        }
        let personalRating = (rating !== null ? `(${rating})` : '');
        let thumbIcon = ((rating !== null ? rating : ratingAverage) >= ratingsBreakpoint ? Icons.thumbsUp : Icons.thumbsDown);
        return (
            <div className="bgg-game__secondary-detail bgg-game__players">
                <label>Rating {thumbIcon}</label><div>{Math.round(ratingAverage*100)/100} <small>{personalRating}</small></div>
            </div>
        );
    }
    renderPlays() {
        const { numPlays } = this.props;
        return (
            <div className="bgg-game__secondary-detail bgg-game__plays">
                <label>Plays {Icons.die}</label><div>{numPlays}</div>
            </div>
        );
    }
    render() {
        const { name, yearPublished, isExpansion } = this.props;
        const gameClasses = {
            'bgg-game': true,
            'bgg-collection__game': true,
            'bgg-game--expansion': isExpansion
        };
        let expansionText = (isExpansion ? <label className="label-expansion">Expansion</label> : '');
        return (
            <div className={classnames(gameClasses)}>
                {this.renderImage()}
                <div className="bgg-game__details">
                    <div className="bgg-game__title">
                        <h4><a href={this.getGameLink()} target="_blank" dangerouslySetInnerHTML={{__html: name}}></a> <small>({yearPublished})</small></h4>
                        {expansionText}
                    </div>
                    <div className="bgg-game__secondary-details">
                        {this.renderPlayers()}
                        {this.renderPlayingTime()}
                        {this.renderRating()}
                        {this.renderPlays()}
                    </div>
                </div>
            </div>
        )
    }
}

Game.propTypes = {
    objectId: PropTypes.number.isRequired,
    name: PropTypes.string,
    image: PropTypes.string,
    thumbnail: PropTypes.string,
    minPlayers: PropTypes.number,
    maxPlayers: PropTypes.number,
    minPlayTime: PropTypes.number,
    maxPlayTime: PropTypes.number,
    isExpansion: PropTypes.bool,
    yearPublished: PropTypes.number,
    bggRating: PropTypes.number,
    ratingAverage: PropTypes.number,
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
Game.defaultProps = {
    ratingsBreakpoint: 6
}
export default Game;
