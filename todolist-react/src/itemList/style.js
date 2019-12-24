import styled from 'styled-components'

export const Wrapper = styled.div`
    display:relative;
    width:80%;
    height:100%;
    .ant-menu-horizontal > .ant-menu-item:hover, .ant-menu-horizontal > .ant-menu-submenu:hover, .ant-menu-horizontal > .ant-menu-item-active, .ant-menu-horizontal > .ant-menu-submenu-active, .ant-menu-horizontal > .ant-menu-item-open, .ant-menu-horizontal > .ant-menu-submenu-open, .ant-menu-horizontal > .ant-menu-item-selected, .ant-menu-horizontal > .ant-menu-submenu-selected{
        color:#E5543B;
        border-bottom:2px solid #F36046;
    }
`
export const Addition = styled.span`
    padding-left:5%;
    font-size:0.5em;
    span{
        display:inline-block;
        margin-left:3%;
        cursor:pointer;
    }
    span:hover{
        text-decoration:underline;
    }
    #add{
        margin-left:30%;
    }
`
