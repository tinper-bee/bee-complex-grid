import React,{Component} from 'react';
import Button from 'bee-button';
import Icon from 'bee-icon';
import Menu from 'bee-menus';
import Dropdown from 'bee-dropdown';

const { Item } = Menu;
const defaultProps = {
    toolBtns:[] ,
    btnSize:'sm',
    btnBordered:true  
}
class ToolBar extends Component{
    constructor(props){
        super(props)
        
    }
    onDropDownMenuSelect = (dropItem,dropBtn)=>{
      const {children:dropBtnChildren=[]} = dropBtn;
      const currentKey = parseInt(dropItem.key);
      if(dropBtnChildren[currentKey]){
        dropBtnChildren[currentKey].onClick && dropBtnChildren[currentKey].onClick();
      }

    }
     
    getDropDownBtn =(dropBtn)=>{
        let menu,menuOpts=[];
        menuOpts = dropBtn.children.map((item,index)=>{
            return  <Item key={index}> {item.iconType && <Icon type={item.iconType}/>}{item.value}</Item>
        })
        menu = <Menu
                    onSelect={(key)=>this.onDropDownMenuSelect(key,dropBtn)}>
                       {menuOpts}
                </Menu>
        return <div className="dropdown-btn">
                <Dropdown
                    trigger={['hover']}
                    overlay={menu}
                    animation="slide-up"
                >
                    <Button
                        bordered={this.props.btnBordered}
                        size={this.props.btnSize}>
                        {dropBtn.value}
                        <Icon type="uf-anglearrowdown"/>
                    </Button>
                </Dropdown>
            </div>
    }
    getToolBtns=()=>{
        let rs = [];
        const {toolBtns,btnSize,btnBordered,contentAlign} = this.props;
        let className='grid-toolbar';
        if(contentAlign){
            className += ` ${contentAlign}` ; 
        }
        rs = toolBtns.map(item=>{
            let btn,className = item.className?item.className:'' ;
            if(item.iconType && !item.value){
                className += 'toolbar-btn-icon'
            }
            if(item.children){
                btn = this.getDropDownBtn(item);
            }else{
                btn = <Button size={btnSize} bordered={btnBordered} {...item} className={className} >
                        {item.iconType && <Icon type={item.iconType}/>}
                        {item.value}
                    </Button>
            }
            return btn;
        })
        if (rs.length==0)
            return ''
        else
            return (
                <div className={className}>
                   {rs}
                </div>
            )
    }
    render(){

        return this.getToolBtns()
    }
}
ToolBar.defaultProps = defaultProps 
export default ToolBar;