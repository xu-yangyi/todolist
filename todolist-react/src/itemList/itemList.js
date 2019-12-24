import React, {useEffect, useState} from 'react'
import {DatePicker, Icon, List, Menu, message, Modal, Pagination, Radio} from 'antd';
import {Addition, Wrapper} from "./style"
import { Input } from 'antd';
import axios from 'axios'

const { TextArea } = Input;


const ItemList = (props)=>{
    const [rawItems,setRawItems] = useState([])                 //获取到的全部数据
    const [items,setItems] = useState([])                       //用于展示的数据
    const [curPage,setCurPage] = useState(1)                   //当前所在页码数
    const [pages,setPages] = useState()    //每一页8项，计算页码数
    const [currentCls,setCurrentCls] = useState('unfinished')  //显示已完成事项或未完成事项，默认未完成
    //下面是添加item的modal,暂存要提交的信息
    const [showAdd,setShowAdd] = useState(false)
    const [level,setLevel] = useState(1)
    const [expire,setExpire] = useState()
    const [content,setContent] = useState()


    async function createItem() {
        try{
            let res =  await axios.post('/items/',{ i_level:level, expire:expire.format("YYYY-MM-DD HH:mm"), content, status:'unfinished',i_tag:props.curTag.t_id})
            getInfo()
            setShowAdd(false)
            if(res.status<300){
                return message.success('添加事项成功！')
            }
            return message.error('添加事项失败！')
        }catch (e) {
            return message.error('添加事项失败！')
        }
    }
    async function deleteItem(i){
        try{
            let res = await axios.delete(`/items/${i}/`)
            if(res.status<300){
                getInfo()
                message.success("事项删除成功")
            }
        }catch (e) {
            setRawItems([])
        }
    }
    async function alterItem(data){
        try{
            let res = await axios.put(`/items/${data.i_id}/`,{...data,status:'finished'})
            if(res.status<300){
                getInfo()
                message.success("事项修改成功")
            }
        }catch (e) {
            setRawItems([])
        }
    }
    async function getInfo() {
        try{
            let res = await axios.get('/items/')
            if(res.status<300){
                setRawItems(res.data)
            }
        }catch (e) {
            setRawItems([])
        }
    }
    function getcls(item){
        if(currentCls==='unfinished'){
            return [<a key="delete" onClick={()=>deleteItem(item.i_id)}>删除</a>,<a key={"ok"} onClick={()=>alterItem(item)}>完成</a>]
        }
        return [<a key="delete" onClick={()=>deleteItem(item.i_id)}>删除</a>]
    }
    function filterItems(){
        if(!props.curTag){ return }
        let tem = rawItems.filter(t=>{
            return t.status === currentCls && t.i_tag === props.curTag.t_id;
            })
        setPages(Math.ceil(tem.length/8))
        setItems(tem.slice((curPage-1)*8,curPage*8))
    }
    function sortItems(order){
        if(!props.curTag){ return }
        let tem = rawItems.filter(t=>{
            return t.status === currentCls && t.i_tag === props.curTag.t_id
        })
        if(order==='level'){
            tem.sort((a,b)=>{
                if(a.i_level>b.i_level){ return -1 }
                return 1
            })
        }
        if(order==='time'){
            tem.sort((a,b)=>{
                if(a.expire.replace(/[- :]/g,'')>b.expire.replace(/[- :]/g,'')){ return 1}
                return -1
            })
        }
        setPages(Math.ceil(tem.length/8))
        setItems(tem.slice((curPage-1)*8,curPage*8))
    }


    useEffect(()=>{
        getInfo().then(filterItems())
    },[props.curTag])
    useEffect(()=>{
        filterItems()
    },[currentCls,rawItems,curPage])
    return (
        <Wrapper>
            {props.curTag && items?
                <>
                    <Menu
                        selectedKeys={[currentCls]}
                        mode="horizontal"
                        style={{display:'inline-block'}}
                    >
                        <Menu.Item key="unfinished" onClick={e=>setCurrentCls(e.key)}>
                            <Icon type="alert" />
                            待完成
                        </Menu.Item>
                        <Menu.Item key="finished" onClick={e=>setCurrentCls(e.key)}>
                            <Icon type="book" />
                            已完成
                        </Menu.Item>
                    </Menu>
                    <Addition>
                        <span onClick={()=>sortItems('level')}>
                            <Icon style={{color:'#BB361E'}} type="swap"　rotate={90}/> 按优先级
                        </span>
                        <span onClick={()=>sortItems("time")}>
                            <Icon style={{color:'#BB361E'}} type="swap" rotate={90}/> 按截止日期
                        </span>
                            <span onClick={()=>setShowAdd(true)} id={'add'}>
                            <Icon style={{color:'#BB361E'}} type="plus"/> 添加待办事项
                        </span>

                        <Modal
                            title={"待办事项信息"}
                            visible={showAdd}
                            onOk={createItem}
                            onCancel={()=>setShowAdd(false)}
                        >
                            <span>优先级：</span>
                            <Radio.Group onChange={v=>setLevel(v.target.value)} value={level}>
                                <Radio value={2}>紧急</Radio>
                                <Radio value={1}>中等</Radio>
                                <Radio value={0}>次要</Radio>
                            </Radio.Group><br/>

                            <span>所属标签：{props.curTag.name}</span><br/>

                            <span>截止日期：</span>
                            <DatePicker
                                showTime
                                size={"small"}
                                placeholder="Select Time"
                                onChange={v=>setExpire(v)}
                                format={"YYYY-MM-DD HH:mm"}
                            /><br/>

                            <span>事项内容:</span>
                            <TextArea
                                rows={4}
                                onChange={v=>setContent(v.target.value)}
                                maxLength={100}
                                placeholder={"事项内容，100字以内"}
                            />
                        </Modal>

                    </Addition>
                    <List
                        itemLayout="horizontal"
                        dataSource={items}
                        renderItem={item => (
                            <List.Item
                                actions={getcls(item)}
                                style={{paddingLeft:'1%'}}
                            >
                                {item.i_level===0?
                                    <Icon type="fire" style={{color:'#4FC843'}}/>
                                    :item.i_level===1?
                                        <Icon type="fire" style={{color:'#E2B423'}}/>
                                        :<Icon type="fire" style={{color:'red'}}/>}　
                                <span style={{fontWeight:"bold"}}>{`[${item.expire.split(" ")[0]}] ${item.content}`}</span>
                            </List.Item>)}
                    />
                    <Pagination
                        pageSize={8}
                        defaultCurrent={1}
                        total={pages*8}
                        onChange={(page)=>{setCurPage(page)}}
                        style={{position:'absolute',bottom:'5%',left:'30%'}}/>
                </>
                :null}
        </Wrapper>
    )
}

export default ItemList;