
import React, { Component } from 'react';
import ToolTip from 'bee-tooltip'

class RenderCell extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: true,
            enter: false,
            hasError:false
        }
    }

    click = () => {
        if (this.state.visible) {
            setTimeout(() => {
                let input = document.querySelector('.triangle-flag .u-form-control');
                if (input) input.focus()
            }, 0);
        }
        this.setState({
            visible: !this.state.visible
        })
    }

    onMouseEnter = () => {
        this.setState({
            enter: true
        })
    }

    onMouseLeave = () => {
        this.setState({
            visible: true,
            enter: false
        })
    }
    renderSpan=()=>{
        if(this.state.visible&&(!this.state.hasError)){
            let textAlign = this.props.textAlign;
            let placement = 'left';
            if(textAlign)placement=textAlign=='center'?'bottom':textAlign;
            return (
                <ToolTip inverse overlay={this.props.text} placement={placement}>
                    <span className={`u-edit-grid-cell ${this.state.enter?'enter':''}`} 
                    onMouseLeave={this.onMouseLeave} onMouseEnter={this.onMouseEnter} 
                    onClick={this.click}>{this.props.text}</span>
                </ToolTip> 
            )
        }else{
            return React.cloneElement(this.props.children,{
                ref:field=>this.field=field,
                onBlur:()=>{
                    this.setState({
                        visible:true,
                        enter:false,
                        hasError:this.field.state.error
                    })
                }
            })
        }
    }

    render () {
        return this.renderSpan();
    }
}
export default RenderCell;
