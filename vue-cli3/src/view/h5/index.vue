 <template>
    <div>
        this is a demo
        <div class="home">
            <wx-open-launch-weapp
                id="launch-btn"
                :username="username"
                :path="path"
                @launch="handleLaunchFn"
                @error="handleErrorFn"
            >
                <script type="text/wxtag-template">
                    <style>
                        .ant-btn {
                            line-height: 1.499;
                            position: relative;
                            display: inline-block;
                            font-weight: 400;
                            white-space: nowrap;
                            text-align: center;
                            background-image: none;
                            border: 1px solid #d9d9d9;
                            -webkit-box-shadow: 0 2px 0 rgba(0,0,0,0.015);
                            box-shadow: 0 2px 0 rgba(0,0,0,0.015);
                            cursor: pointer;
                            -webkit-transition: all .3s cubic-bezier(.645, .045, .355, 1);
                            transition: all .3s cubic-bezier(.645, .045, .355, 1);
                            -webkit-user-select: none;
                            -moz-user-select: none;
                            -ms-user-select: none;
                            user-select: none;
                            -ms-touch-action: manipulation;
                            touch-action: manipulation;
                            height: 32px;
                            padding: 0 15px;
                            font-size: 14px;
                            border-radius: 4px;
                            color: rgba(0,0,0,0.65);
                            background-color: #fff;
                        }
                        .ant-btn-red {
                            color: #fff;
                            background-color: #FF5A44;
                            border-color: #FF5A44;
                            text-shadow: 0 -1px 0 rgba(0,0,0,0.12);
                            -webkit-box-shadow: 0 2px 0 rgba(0,0,0,0.045);
                            box-shadow: 0 2px 0 rgba(0,0,0,0.045);
                        }
                    </style>
                    <button class="ant-btn ant-btn-red">{{ btnText }}</button>
                </script>
            </wx-open-launch-weapp>
        </div>
    </div>
</template>

<script>
    import wx from 'weixin-js-sdk' // 引入weixin JSDK
    import {Toast, Dialog, Notify} from 'vant'
    // api 接口从后端获取微信jsdk授权信息
    import { getWechatJsConfig } from '../../../api/wechat'

    export default{
        data () {
            return {
                username: 'gh_xxxxxxxx', // gh_ 开头的原始小程序ID
                path: 'pages/index/index.html', // 一定要以 .html 结尾
                btnText: "我的小程序"
            }
        },
        methods: {
            ToMiniapp() {
                getWechatJsConfig({api: 'getLocation', 'url': window.location.href }).then(res => {
                    res['openTagList'] = ['wx-open-launch-weapp']  // 微信小程序标签名加入 openTagList
                    console.log(res)
                    wx.config(res);
                })
            },
            handleLaunchFn (e) {
                console.log(e)
            },
            handleErrorFn(e){
                console.log('fail', e.detail);
            }
        },
        mounted() {
            this.ToMiniapp()
        }
    }

</script>