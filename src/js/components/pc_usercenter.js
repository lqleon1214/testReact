import React from 'react'
import {Row, Col} from 'antd'
import {Menu, Icon, Tabs, message, Form, Input, Button, Checkbox, Modal, Card,notification,Upload,BackTop} from 'antd'

const FormItem = Form.Item
const SubMenu = Menu.SubMenu
const TabPane = Tabs.TabPane
const MenuItemGroup = Menu.ItemGroup
import {Router, Route, Link, browserHistory} from 'react-router'
import PCHeader from './pc_header'
import PCFooter from './pc_footer'

export default class PCUserCenter extends React.Component{
    constructor(){
        super()
        this.state = {
            previewImage: '',
            previewVisible: false,
            usercollection:"",
            usercomments:""
        }
    }
    componentDidMount() {
        var myFetchOptions = {
            method: 'GET'
        }
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=" + localStorage.userid, myFetchOptions)
            .then(response=>response.json())
            .then(json=>{
                this.setState({usercollection:json});
            })
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=" + localStorage.userid, myFetchOptions)
            .then(response=>response.json())
            .then(json=>{
                this.setState({usercomments:json});
            })
    }
    handleCancel(){
        this.setState({
            previewVisible: false
        })
    }
    render(){
        const props = {
            action: 'http://newsapi.gugujiankong.com/handler.ashx',
            headers: {
                "Access-Control-Allow-Origin":"*"
            },
            listType: 'picture-card',
            defaultFileList:[
                {
                    uid:-1,
                    name:'xxx.png',
                    state: 'done',
                    url:'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
                    thumbUrl:'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png'
                }
            ],
            onPreview: (file)=>{
                console.log(file)
                this.setState({previewImage:file.url || file.thumbUrl,previewVisible:true})
            }
        }

        const {usercollection,usercomments} = this.state
        const usercollectionList = usercollection.length
            ? usercollection.map((uc,index)=>(
                <Card key={index} title={uc.uniquekey} extra={<a target="_blank" href={`/#/details/${uc.uniquekey}`}>查看</a>}>
                    <p>{uc.Title}</p>
                </Card>
            ))
            : "您还没有收藏任何的新闻，快去收藏一些新闻吧。"
        const usercommentsList = usercomments.length
            ? usercomments.map((comment,index)=>(
                <Card key={index} title={`于 ${comment.datetime} 评论了文章 ${comment.uniquekey}`} extra={<a target="_blank" href={`/#/details/${comment.uniquekey}`}>查看</a>}>
                    <p>{comment.Comments}</p>
                </Card>
            ))
            : "您还没有发表过任何评论。"
        return(
            <div>
                <PCHeader/>
                <Row>
                    <Col span={2}/>
                    <Col span={20}>
                        <Tabs>
                            <TabPane tab="我的收藏列表" key="1">
                                <div className="comment">
                                    <Row>
                                        <Col span={24}>
                                            {usercollectionList}
                                        </Col>
                                    </Row>
                                </div>
                                <BackTop/>
                            </TabPane>
                            <TabPane tab="我的评论列表" key="2">
                                <div className="comment">
                                    <Row>
                                        <Col span={24}>
                                            {usercommentsList}
                                        </Col>
                                    </Row>
                                </div>
                                <BackTop/>
                            </TabPane>
                            <TabPane tab="头像设置" key="3">
                                <div class="clearfix">
                                    <Upload {...props}>
                                        <Icon type="plus"/>
                                        <div className="ant-upload-text">上传照片</div>
                                    </Upload>
                                    <Modal visible ={this.state.previewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
                                        <img style={{ width: '100%' }} alt="预览" src={this.state.previewImage}/>
                                    </Modal>
                                </div>
                            </TabPane>
                        </Tabs>
                    </Col>
                    <Col span={2}/>
                </Row>
                <PCFooter/>
            </div>
        )

    }
}