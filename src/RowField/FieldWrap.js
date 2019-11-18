import React, { Component } from 'react';
import Icon from 'bee-icon';
import Tooltip from 'bee-tooltip';

class FieldWrap extends Component {
    render () {
        let { error, message, required, children, flag } = this.props;
        return (
            <div className="triangle-flag">
                {required ? (
                    <div className="triangle-redline"> </div>
                ) : null}

                {children}

                {error ? (
                    <div className="triangle-icon">
                        <Tooltip
                            className="inline-edit-tooltip"
                            placement="bottom"
                            overlay={<div><Icon type="uf-exc-t-o" />{message}</div>}
                        >
                            <Icon type="uf-exc-t-o" />
                        </Tooltip>
                    </div>
                ) : null}
                {flag ? (
                    <div className="triangle_border_nw" style={{ "left": required ? "4px" : "0px" }}> </div>
                ) : null}
            </div>
        );
    }
}

export default FieldWrap;