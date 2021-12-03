
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import ToolTip from 'bee-tooltip'
import { Tooltip } from '@tinper/next-ui'
const prefix = 'wui'

class RenderCell extends Component {
    constructor(props){
        super(props)
        this.state={
            visible:true,
            enter:false,
            hasError:false
        }
    }

    click=()=>{
        if(this.state.visible){
            setTimeout(() => {
                let input = document.querySelector('.triangle-flag .u-form-control');
                if(input)input.focus()
                let field = ReactDOM.findDOMNode(this.field);
                let fieldInput = field.querySelector('.u-form-control')
                if(fieldInput)fieldInput.focus&&fieldInput.focus()
            }, 0);
        }
        this.setState({
            visible:!this.state.visible
        })
    }

    onMouseEnter=()=>{
        this.setState({
            enter:true
        })
    }

    onMouseLeave=()=>{
        this.setState({
            visible:true,
            enter:false
        })
    }
    renderSpan=()=>{
        if(this.state.visible&&(!this.state.hasError)){
            let { textAlign,overlay,text } = this.props;
            let placement = 'left';
            if(textAlign)placement=textAlign=='center'?'bottom':textAlign;
            return (
                <Tooltip inverse overlay={overlay} placement={placement}>
                    <span className={`${prefix}-edit-grid-cell ${this.state.enter?'enter':''}`} 
                    onMouseLeave={this.onMouseLeave} onMouseEnter={this.onMouseEnter} 
                    onClick={this.click}>{text}</span>
                </Tooltip> 
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

    render() {
        return this.renderSpan();
    }
}
export default RenderCell;