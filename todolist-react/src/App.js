import React,{ useState,useEffect } from 'react';
import axios from 'axios'
import ItemList from "./itemList/itemList"
import TagMenu from "./tagMenu/tagMenu"
import Header from "./header/header"
import {Wrapper} from "./style"


const data = [
    {
        title: 'Ant Design Title 1',
    },
    {
        title: 'Ant Design Title 2',
    },
    {
        title: 'Ant Design Title 3',
    },
    {
        title: 'Ant Design Title 4',
    },
    {
        title: 'Ant Design Title 1',
    },
    {
        title: 'Ant Design Title 2',
    },
    {
        title: 'Ant Design Title 3',
    },
    {
        title: 'Ant Design Title 4',
    },
];

function App() {
    const [curTag,setCurTag] = useState( )  //当前显示的标签

    return (
        <Wrapper>
            <Header/>
            <div style={{display:'flex',height:'92%'}}>
                <TagMenu
                    curTag={curTag}
                    setCurTag={setCurTag}
                />
                {/*分割线*/}
                <div style={{height:'100%',width:'0.3em',backgroundColor:'#F6F4F3'}}/>
                <ItemList
                    curTag={curTag}
                    setCurTag={setCurTag}
                />
            </div>
        </Wrapper>
    );
}

export default App;
