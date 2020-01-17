<template>
    <div id="app">
        <!-- <el-button type="success">成功按钮</el-button> -->
        <div>
            <el-row>
                <el-col align="right">
                    <el-form :model="searchData" inline label-width="80px">
                        <el-form-item>
                            <el-input
                                size="mini"
                                placeholder="请输入内容"
                                v-model="searchData.centent"
                                clearable
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="设备类型:">
                            <el-select size="mini" v-model="searchData.type" placeholder="请选择设备类型">
                                <el-option label="区域一" value="2"></el-option>
                                <el-option label="区域二" value="1"></el-option>
                                <!-- <el-option>
                                    <el-tree
                                        id="tree-option"
                                        ref="selectTree"
                                        :accordion="accordion"
                                        :data="options"
                                        :props="props"
                                        :node-key="props.value"
                                        @node-click="handleNodeClick"
                                    ></el-tree>
                                </el-option>-->
                            </el-select>
                            <!-- <template>
                                <el-select
                                    :value="valueTitle"
                                    :clearable="clearable"
                                    @clear="clearHandle"
                                >
                                    <el-option :value="valueTitle" :label="valueTitle">
                                        <el-tree
                                            id="tree-option"
                                            ref="selectTree"
                                            :accordion="accordion"
                                            :data="options"
                                            :props="props"
                                            :node-key="props.value"
                                            @node-click="handleNodeClick"
                                        ></el-tree>
                                    </el-option>
                                </el-select>
                            </template>-->
                        </el-form-item>
                        <el-form-item label="状态:">
                            <el-select size="mini" v-model="searchData.state" placeholder="请选择设备状态">
                                <el-option label="不限" value="2"></el-option>
                                <el-option label="启动" value="1"></el-option>
                                <el-option label="待机" value="3"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item>
                            <el-button size="mini" type="primary" @click="search">查 询</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </div>

        <!-- <div class="amap-wrapper">
            <el-amap class="amap-box" vid="map" :zoom="zoom" :center="center">
                <el-amap-marker
                    v-for="(item,index) in VAMaps"
                    :key="index"
                    :icon="item.icon"
                    :position="item.position"
                    :events="item.events"
                ></el-amap-marker>
                <el-amap-info-window
                    :position="info.position"
                    :content="info.content"
                    :visible="info.visible"
                    :events="info.events"
                    :autoMove="true"
                ></el-amap-info-window>
            </el-amap>
        </div>-->
        <!-- <el-dialog
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"
            :modal="false"
            top="25vh"
            class="amapDialog"
        >
            <el-row>
                <el-col class="borderstyle">
                    <div class="font_size">挖掘机 三一 250KW &nbsp;&nbsp;未工作</div>
                    <div>1231 &nbsp;京A.1231&nbsp; XUH20191015180123</div>
                </el-col>
            </el-row>
            <el-row>
                <el-col class="line_height">
                    <el-row>
                        <el-col :span="12">
                            <div>
                                <i class="el-icon-location"></i>当前机械位置
                            </div>
                        </el-col>
                        <el-col :span="12" align="right">
                            <div>10-15 18：15 &nbsp;</div>
                        </el-col>
                    </el-row>
                    <div>
                        <i class="el-icon-time"></i>今日工作8小时50分
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <div class="last_change">最近一周工作（小时）</div>
                    <div></div>
                </el-col>
            </el-row>
        </el-dialog> -->
    </div>
</template>

<script>
export default {
    name: "app",
    props: {
        /* 配置项 */
        props: {
            type: Object,
            default: () => {
                return {
                    value: "id", // ID字段名
                    label: "title", // 显示名称
                    children: "children" // 子级字段名
                };
            }
        },
        /* 选项列表数据(树形结构的对象数组) */
        options: {
            type: Array,
            default: () => {
                return [
                    {
                        value: "zhinan",
                        label: "指南",
                        children: [
                            {
                                value: "shejiyuanze",
                                label: "设计原则",
                                children: [
                                    {
                                        value: "yizhi",
                                        label: "一致"
                                    },
                                    {
                                        value: "fankui",
                                        label: "反馈"
                                    },
                                    {
                                        value: "xiaolv",
                                        label: "效率"
                                    },
                                    {
                                        value: "kekong",
                                        label: "可控"
                                    }
                                ]
                            },
                            {
                                value: "daohang",
                                label: "导航",
                                children: [
                                    {
                                        value: "cexiangdaohang",
                                        label: "侧向导航"
                                    },
                                    {
                                        value: "dingbudaohang",
                                        label: "顶部导航"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        value: "zujian",
                        label: "组件",
                        children: [
                            {
                                value: "basic",
                                label: "Basic",
                                children: [
                                    {
                                        value: "layout",
                                        label: "Layout 布局"
                                    },
                                    {
                                        value: "color",
                                        label: "Color 色彩"
                                    },
                                    {
                                        value: "typography",
                                        label: "Typography 字体"
                                    },
                                    {
                                        value: "icon",
                                        label: "Icon 图标"
                                    },
                                    {
                                        value: "button",
                                        label: "Button 按钮"
                                    }
                                ]
                            },
                            {
                                value: "form",
                                label: "Form",
                                children: [
                                    {
                                        value: "radio",
                                        label: "Radio 单选框"
                                    },
                                    {
                                        value: "checkbox",
                                        label: "Checkbox 多选框"
                                    },
                                    {
                                        value: "input",
                                        label: "Input 输入框"
                                    },
                                    {
                                        value: "input-number",
                                        label: "InputNumber 计数器"
                                    },
                                    {
                                        value: "select",
                                        label: "Select 选择器"
                                    },
                                    {
                                        value: "cascader",
                                        label: "Cascader 级联选择器"
                                    },
                                    {
                                        value: "switch",
                                        label: "Switch 开关"
                                    },
                                    {
                                        value: "slider",
                                        label: "Slider 滑块"
                                    },
                                    {
                                        value: "time-picker",
                                        label: "TimePicker 时间选择器"
                                    },
                                    {
                                        value: "date-picker",
                                        label: "DatePicker 日期选择器"
                                    },
                                    {
                                        value: "datetime-picker",
                                        label: "DateTimePicker 日期时间选择器"
                                    },
                                    {
                                        value: "upload",
                                        label: "Upload 上传"
                                    },
                                    {
                                        value: "rate",
                                        label: "Rate 评分"
                                    },
                                    {
                                        value: "form",
                                        label: "Form 表单"
                                    }
                                ]
                            },
                            {
                                value: "data",
                                label: "Data",
                                children: [
                                    {
                                        value: "table",
                                        label: "Table 表格"
                                    },
                                    {
                                        value: "tag",
                                        label: "Tag 标签"
                                    },
                                    {
                                        value: "progress",
                                        label: "Progress 进度条"
                                    },
                                    {
                                        value: "tree",
                                        label: "Tree 树形控件"
                                    },
                                    {
                                        value: "pagination",
                                        label: "Pagination 分页"
                                    },
                                    {
                                        value: "badge",
                                        label: "Badge 标记"
                                    }
                                ]
                            },
                            {
                                value: "notice",
                                label: "Notice",
                                children: [
                                    {
                                        value: "alert",
                                        label: "Alert 警告"
                                    },
                                    {
                                        value: "loading",
                                        label: "Loading 加载"
                                    },
                                    {
                                        value: "message",
                                        label: "Message 消息提示"
                                    },
                                    {
                                        value: "message-box",
                                        label: "MessageBox 弹框"
                                    },
                                    {
                                        value: "notification",
                                        label: "Notification 通知"
                                    }
                                ]
                            },
                            {
                                value: "navigation",
                                label: "Navigation",
                                children: [
                                    {
                                        value: "menu",
                                        label: "NavMenu 导航菜单"
                                    },
                                    {
                                        value: "tabs",
                                        label: "Tabs 标签页"
                                    },
                                    {
                                        value: "breadcrumb",
                                        label: "Breadcrumb 面包屑"
                                    },
                                    {
                                        value: "dropdown",
                                        label: "Dropdown 下拉菜单"
                                    },
                                    {
                                        value: "steps",
                                        label: "Steps 步骤条"
                                    }
                                ]
                            },
                            {
                                value: "others",
                                label: "Others",
                                children: [
                                    {
                                        value: "dialog",
                                        label: "Dialog 对话框"
                                    },
                                    {
                                        value: "tooltip",
                                        label: "Tooltip 文字提示"
                                    },
                                    {
                                        value: "popover",
                                        label: "Popover 弹出框"
                                    },
                                    {
                                        value: "card",
                                        label: "Card 卡片"
                                    },
                                    {
                                        value: "carousel",
                                        label: "Carousel 走马灯"
                                    },
                                    {
                                        value: "collapse",
                                        label: "Collapse 折叠面板"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        value: "ziyuan",
                        label: "资源",
                        children: [
                            {
                                value: "axure",
                                label: "Axure Components"
                            },
                            {
                                value: "sketch",
                                label: "Sketch Templates"
                            },
                            {
                                value: "jiaohu",
                                label: "组件交互文档"
                            }
                        ]
                    }
                ];
            }
        },
        /* 初始值 */
        value: {
            type: Number,
            default: () => {
                return 2;
            }
        },
        /* 可清空选项 */
        clearable: {
            type: Boolean,
            default: () => {
                return true;
            }
        },
        /* 自动收起 */
        accordion: {
            type: Boolean,
            default: () => {
                return false;
            }
        }
    },
    components: {
        // HelloWorld
    },
    data() {
        return {
            zoom: 8,
            center: [118.4, 43.27],
            searchData: {
                state: "2"
            },
            dialogData: {},
            VAMaps: [],
            info: {
                position: [0, 0],
                content: "",
                events: {
                    close() {}
                },
                visible: false,
                valueId: this.value, // 初始值
                valueTitle: "123"
            }
        };
    },
    mounted() {
        // this.search();
    },
    methods: {
        // selectTree组件方法
        // 初始化值
        initHandle() {
            if (this.valueId) {
                this.valueTitle = this.$refs.selectTree.getNode(
                    this.valueId
                ).data[this.props.label]; // 初始化显示
                this.$refs.selectTree.setCurrentKey(this.valueId); // 设置默认选中
                this.defaultExpandedKey = [this.valueId]; // 设置默认展开
            }
            this.$nextTick(() => {
                let scrollWrap = document.querySelectorAll(
                    ".el-scrollbar .el-select-dropdown__wrap"
                )[0];
                let scrollBar = document.querySelectorAll(
                    ".el-scrollbar .el-scrollbar__bar"
                );
                scrollWrap.style.cssText =
                    "margin: 0px; max-height: none; overflow: hidden;";
                scrollBar.forEach(ele => (ele.style.width = 0));
            });
        },
        // 切换选项
        handleNodeClick(node) {
            this.valueTitle = node[this.props.label];
            this.valueId = node[this.props.value];
            this.$emit("getValue", this.valueId);
            this.defaultExpandedKey = [];
        },
        // 清除选中
        clearHandle() {
            this.valueTitle = "";
            this.valueId = null;
            this.defaultExpandedKey = [];
            this.clearSelected();
            this.$emit("getValue", null);
        },
        /* 清空选中样式 */
        clearSelected() {
            let allNode = document.querySelectorAll(
                "#tree-option .el-tree-node"
            );
            allNode.forEach(element => element.classList.remove("is-current"));
        },

        search() {
            // this.$axios.post("",{

            // }).then(res=>{
            //   console.log(res)
            this.VAMaps = [
                {
                    position: [118.491127, 43.273415],
                    icon: "/img/401位置.png",
                    content: ""
                },
                {
                    position: [118.105112, 43.266447],
                    content: ""
                },
                {
                    position: [118.043668, 43.595955],
                    content: ""
                },
                {
                    position: [118.007874, 43.633596],
                    content: ""
                },
                {
                    position: [118.454873, 43.896427],
                    content: ""
                },
                {
                    position: [118.544677, 43.03887],
                    content: ""
                }
            ];
            this.VAMaps.forEach((item, index) => {
                item.events = {
                    click: () => {
                        this.switchWindow(index);
                    }
                };
                item.visible = true;
            });
            // }).catch(err=>{
            //   this.$message({
            //     type:"warning",
            //     message:err.data.msg
            //   })
            // })
        },
        switchWindow(tab) {
            // this.$axios.post("",{

            // }).then(res=>{
            //     console.log(res)
            // }).catch(err=>{
            //     this.$message({
            //     type:"warning",
            //     message:err.data.msg
            //     })
            // })
            console.log(this.VAMaps[tab].position);
            let test = this.VAMaps[tab].position; //${test}模板语法
            this.VAMaps.forEach(item => {
                // item.content="";
                this.$set(item, "content", "");
            });
            this.VAMaps[tab].content = `
      <div style="background:white; width:25vw; padding:15px; border-radius:10px;"
      ><div class="borderstyle"><div class="font_size"
      >挖掘机 三一 250KW &nbsp;&nbsp;未工作</div
      ><div>1231 &nbsp;京A.1231&nbsp; XUH20191015180123</div
      ></div><div class="line_height"><div style="display:flex;justify-content: space-between;">
              <div><i class="el-icon-location"></i>当前机械位置</div>
              <div style="align:right"><div>10-15 18：15 &nbsp;</div
              ></div></div><div><i class="el-icon-time"></i
              >今日工作8小时50分</div
              ></div><div class="last_change"><div
              >最近一周工作（小时）</div
              ><table border="1px solid #666" cellpadding="0" cellspacing="0" width="100%">
      <tr align="center"><td colspan="7">10月</td></tr>
      <tr align="center">
        <td>10</td>
        <td>11</td>
        <td>12</td>
        <td>13</td>
        <td>14</td>
        <td>15</td>
        <td>16</td>
      </tr>
      <tr align="center">
        <td>8</td>
        <td>8</td>
        <td>8</td>
        <td>8</td>
        <td>8</td>
        <td>8</td>
        <td>8</td>
      </tr>
    </table>`;
            // this.info = this.VAMaps[tab];
            this.info.visible = false;
            this.$nextTick(() => {
                this.info.content = this.VAMaps[tab].content;
                this.info.position = this.VAMaps[tab].position;
                this.$set(this.info, "visible", true);
            });
            console.log(this.info);
        },
        handleClose() {
            this.dialogVisible = false;
        }
    },
    watch: {
        value() {
            this.valueId = this.value;
            this.initHandle();
        }
    }
};
</script>

<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* text-align: center; */
    /* color: #2c3e50; */
    /* margin-top: 60px; */
}
.amap-wrapper {
    width: 100%;
    height: 90vh;
}
.amapDialog .el-dialog {
    border-radius: 10px;
}
.amapDialog .el-dialog__header {
    padding-top: 0;
}
.borderstyle {
    border-bottom: 1px solid #c2c3c5;
    padding-bottom: 20px;
}
.font_size {
    font-size: 20px;
    line-height: 2;
}
.line_height {
    line-height: 2.5;
    border-bottom: 1px solid #c2c3c5;
}
.last_change {
    line-height: 2;
}
</style>
<style scoped>
.el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
    height: auto;
    max-height: 274px;
    padding: 0;
    overflow: hidden;
    overflow-y: auto;
}
.el-select-dropdown__item.selected {
    font-weight: normal;
}
ul li >>> .el-tree .el-tree-node__content {
    height: auto;
    padding: 0 20px;
}
.el-tree-node__label {
    font-weight: normal;
}
.el-tree >>> .is-current .el-tree-node__label {
    color: #409eff;
    font-weight: 700;
}
.el-tree >>> .is-current .el-tree-node__children .el-tree-node__label {
    color: #606266;
    font-weight: normal;
}
</style>

