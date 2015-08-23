import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import _ from 'lodash';

class Control extends Component {
    getValueFromEvent(ev) {
        let value = event.target.value;
        switch(this.props.fieldType) {
            case 'number':
                value = parseFloat(event.target.value) || 0;
                value = _.isNaN(value) ? 0 : value;
                return value;
            case 'checkbox':
                return !!event.target.checked;
            default:
                return value;

        }
    }
    handleChange(ev) {
        const fieldValue = this.getValueFromEvent(ev);
        const { fieldName, fieldType } = this.props;

        return this.props.onChange(fieldName, fieldValue, fieldType);
    }
    render() {
        const { fieldType, label } = this.props;
        const classes = {
            'bgg-collection__controls-filter': true,
            'bgg-collection__controls-filter--small': fieldType === 'number'
        };
        return (
            <div className={classnames(classes)}>
                {this.props.children}
                <input type={fieldType} onChange={this.handleChange.bind(this)} />
            </div>
        );
    }
}
Control.PropTypes = {
    controlType: PropTypes.string,
    fieldType: PropTypes.string,
    fieldName: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired
};
Control.defaultProps = {
    controlType: 'filter',
    fieldType: 'text',
    fieldName: '',
    label: '',
    onChange: ()=>{}
};

export default Control;
