import React, {useEffect, useState} from 'react'
import {Menu, Icon, Radio, Modal, Input,message} from 'antd';
import { Wrapper } from "./style"
import axios from "axios"


const TagMenu = (props)=>{
    const [tags,setTags] = useState()       //所有标签
    const [showAdd,setShowAdd] = useState(false)
    const [showDelete,setShowDelete] = useState(false)
    const [name,setName] = useState()
    const [t_level,setT_level] = useState(1)
    const [deleting,setDeleting] = useState()

    async function createTag() {
        try{
            let res =  await axios.post('/tags/',{ t_level:t_level, name})
            getInfo()
            setShowAdd(false)
            if(res.status<300){
                return message.success('添加标签成功！')
            }
            return message.error('添加标签失败！')
        }catch (e) {
            return message.error('添加标签失败！')
        }
        }
    async function deleteTag(){
        try{
            let res = await axios.delete(`/tags/${deleting.t_id}/`)
            setShowDelete(false)
            setDeleting()
            getInfo()
            if(res.status<300){
                return message.success('删除标签成功！')
            }
            return message.error('删除标签失败！')
        }catch (e) {
            return message.error('删除标签失败！')
        }

    }
    function delPrepare(t){
        setDeleting(t)
        setShowDelete(true)
    }
    async function getInfo() {
        try{
            let res = await axios.get('/tags')
            if(res.status<300){
                setTags(res.data)
            }
        }catch (e) {
            setTags([])
        }
    }
    useEffect(()=>{
        getInfo()
    },[])

    return (
        <Wrapper>
            <div style={{height:'90%'}}>
                <Menu
                    theme="light"
                >
                    {tags?
                        tags.filter((a,b)=>{
                            if(a.t_level>b.t_level){
                                return 1
                            }
                            return -1
                        }).map((v,index)=>(
                            <Menu.Item
                                key={`${index}`}
                                onClick={()=>{props.setCurTag(v)}}
                            >
                                <Icon type="tag" /><span>{v.name}</span>
                                <span style={{float:"right",display:'inline-block'}} onClick={(e)=>{e.stopPropagation();delPrepare(v)}}>x</span>
                            </Menu.Item>
                        ))
                        :null}
                    <Modal
                        title={"删除标签"}
                        visible={showDelete}
                        onCancel={()=>setShowDelete(false)}
                        onOk={()=>deleteTag()}
                    >
                        <p>确认要删除标签：{deleting?deleting.name:''} 及该标签下所有事项吗？</p>
                    </Modal>
                </Menu>
            </div>
            <span
                onClick={()=>setShowAdd(true)}
                id={'add'}
                style={{position:'absolute',bottom:'1%',right:'6%',fontSize:'0.7em',cursor:'pointer'}}
            >
                        <Icon style={{color:'#BB361E'}} type="plus"/> 添加标签
            </span>
            <Modal
                title="添加事项标签"
                visible={showAdd}
                onOk={createTag}
                onCancel={()=>setShowAdd(false)}
            >
                <span>标签名：</span><Input onChange={v=>setName(v.target.value)}/>

                <span>优先级：</span>
                <Radio.Group onChange={v=>setT_level(v.target.value)} value={t_level}>
                    <Radio value={2}>紧急</Radio>
                    <Radio value={1}>中等</Radio>
                    <Radio value={0}>次要</Radio>
                </Radio.Group><br/>
            </Modal>
        </Wrapper>
        )
}

export default TagMenu;