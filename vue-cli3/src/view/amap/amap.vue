
<template>
    <el-select
        :value="valueTitle"
        size="mini"
        :clearable="clearable"
        @clear="clearHandle"
        class="select_tree"
    >
        <el-option :value="valueTitle" :label="valueTitle">
            <el-tree
                id="tree-option"
                ref="selectTree"
                :accordion="accordion"
                :data="optionData"
                :props="props"
                show-checkbox
                :node-key="props.value"
                :default-expanded-keys="defaultExpandedKey"
                @check-change="handleCheckChange"
            ></el-tree>
        </el-option>
    </el-select>
</template>
<script>
export default {
    name: "el-tree-select",
    props: {
        /* 配置项 */
        props: {
            type: Object,
            default: () => {
                return {
                    value: "id", // ID字段名
                    label: "name", // 显示名称
                    children: "children" // 子级字段名
                };
            }
        },
        /* 选项列表数据(树形结构的对象数组) */
        options: { type: Array, default: () => [] },

        /* 初始值 */
        value: {
            type: Number,
            default: () => {
                return null;
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
    data() {
        return {
            valueId: this.value, // 初始值
            valueTitle: "",
            defaultExpandedKey: [],
            // 选项列表（必选）
            list: [
                { id: 1, parentId: 0, name: "一级菜单A", rank: 1 },
                { id: 2, parentId: 0, name: "一级菜单B", rank: 1 },
                { id: 3, parentId: 0, name: "一级菜单C", rank: 1 },
                { id: 4, parentId: 1, name: "二级菜单A-A", rank: 2 },
                { id: 5, parentId: 1, name: "二级菜单A-B", rank: 2 },
                { id: 6, parentId: 2, name: "二级菜单B-A", rank: 2 },
                { id: 42, parentId: 2, name: "二级菜单B-C", rank: 2 },
                { id: 43, parentId: 2, name: "二级菜单B-B", rank: 2 },
                { id: 7, parentId: 4, name: "三级菜单A-A-A", rank: 3 },
                { id: 15, parentId: 0, name: "一级菜单C", rank: 1 },
                { id: 16, parentId: 0, name: "一级菜单C", rank: 1 },
                { id: 17, parentId: 0, name: "一级菜单C", rank: 1 },
                { id: 18, parentId: 0, name: "一级菜单C", rank: 1 },
                { id: 19, parentId: 0, name: "一级菜单C", rank: 1 },
                { id: 20, parentId: 0, name: "一级菜单C", rank: 1 },
                { id: 21, parentId: 0, name: "一级菜单C", rank: 1 },
                { id: 22, parentId: 0, name: "一级菜单C", rank: 1 },
                { id: 23, parentId: 0, name: "一级菜单C", rank: 1 },
                { id: 24, parentId: 0, name: "一级菜单C", rank: 1 },
                { id: 25, parentId: 0, name: "一级菜单C", rank: 1 },
                { id: 26, parentId: 0, name: "一级菜单C", rank: 1 },
                { id: 27, parentId: 0, name: "一级菜单C", rank: 1 },
                { id: 28, parentId: 0, name: "一级菜单C", rank: 1 },
                { id: 29, parentId: 0, name: "一级菜单C", rank: 1 },
                { id: 30, parentId: 0, name: "一级菜单C", rank: 1 },
                { id: 31, parentId: 0, name: "一级菜单C", rank: 1 },
                { id: 32, parentId: 0, name: "一级菜单C", rank: 1 },
                { id: 33, parentId: 0, name: "一级菜单C", rank: 1 },
                { id: 34, parentId: 0, name: "一级菜单C", rank: 1 },
                { id: 35, parentId: 0, name: "一级菜单C", rank: 1 },
                { id: 36, parentId: 0, name: "一级菜单C", rank: 1 },
                { id: 37, parentId: 0, name: "一级菜单C", rank: 1 },
                { id: 38, parentId: 0, name: "一级菜单C", rank: 1 },
                { id: 39, parentId: 0, name: "一级菜单C", rank: 1 },
                { id: 40, parentId: 0, name: "一级菜单end", rank: 1 },
                { id: 45, parentId: 0, name: "一级菜单D", rank: 1 }
            ],
            idArr: []
        };
    },
    computed: {
        /* 转树形数据 */
        optionData() {
            let cloneData = JSON.parse(JSON.stringify(this.list)); // 对源数据深度克隆
            return cloneData.filter(father => {
                // 循环所有项，并添加children属性
                let branchArr = cloneData.filter(
                    child => father.id == child.parentId
                ); // 返回每一项的子级数组
                branchArr.length > 0 ? (father.children = branchArr) : ""; //给父级添加一个children属性，并赋值
                return father.parentId == 0; //返回第一层
            });
        }
    },
    mounted() {
        this.initHandle();
        console.log(this.$axios)
    },
    methods: {
        //获取当前选中节点对象
        handleCheckChange(val, checked, indeterminate) {
            let test = data => {
                if (data["children"]) {
                    data.children.forEach(item => {
                        test(item);
                    });
                } else {
                    return data;
                }
            };
            console.log(val, checked, indeterminate);
            if (val["children"]) {
                for (let i = 0; i < val.children.length; i++) {
                    if (val.children[i]["children"]) {
                        console.log(val.children[i]);
                        for (
                            let j = 0;
                            j < val.children[i].children.length;
                            j++
                        ) {
                            console.log(
                                val.children[i].children[j][this.props.label]
                            );
                            this.idArr.push(val);
                            this.valueTitle +=
                                val.children[i].children[j][this.props.label];
                            this.valueId =
                                val.children[i].children[j][this.props.value];
                            this.$emit("getValue", this.valueId);
                            this.defaultExpandedKey = [];
                            // if(val.children[i]["children"][j]["children"]){
                            //      for(let k=0;k<val.children[i].children[j].children.length;k++){
                            //         this.valueTitle = val.children[i].children[j].children[k][this.props.label]
                            //         this.valueId = val.children[i].children[j].children[k][this.props.value]
                            //      }
                            // }else{
                            //   this.valueTitle = val.children[i].children[j].children[k][this.props.label]
                            //   this.valueId = val.children[i].children[j].children[k][this.props.value]
                            // }
                        }
                    } else {
                        alert(44444);
                        this.idArr.push(val);
                        console.log(this.valueTitle);
                        //debugger
                        this.valueTitle +=
                            val.children[i][this.props.label] + "/";
                        console.log(i);
                        console.log(this.valueTitle);
                        this.valueId = val.children[i][this.props.value];
                    }
                }
            } else if (val["children"] == undefined) {
                alert("进入undefined");
            } else {
                alert("第一");
                this.idArr.push(val);
                this.valueTitle += val[this.props.label] + "/";
                this.valueId = val[this.props.value];
                this.$emit("getValue", this.valueId);
                this.defaultExpandedKey = [];
                console.log(this.idArr);
            }

            console.log(Array.from(new Set(this.idArr)));

            if (checked == false) {
                //var str = "abcdaabbssaaa";
                var reg = new RegExp(val.name + "/", "g");
                var newValueTitle = this.valueTitle.replace(reg, "");
                this.valueTitle = newValueTitle;
            }
            console.log(this.valueTitle);
        },
        //多选
        checkBoxEvent(val) {
            console.log(val);

            // if(val["children"]){
            //     alert("存在")
            //     for(let i=0;i<val.children.length;i++){
            //       if(val.children[i]["children"]){
            //         alert("进入children")
            //         console.log(val.children[i])
            //           for(let j=0;j<val.children[i].children.length;j++){
            //             console.log(val.children[i].children[j][this.props.label])
            //               this.idArr.push(val);
            //               this.valueTitle = val.children[i].children[j][this.props.label]
            //               this.valueId = val.children[i].children[j][this.props.value]
            //               this.$emit('getValue',this.valueId)
            //               this.defaultExpandedKey = []
            //               // if(val.children[i]["children"][j]["children"]){
            //               //      for(let k=0;k<val.children[i].children[j].children.length;k++){
            //               //         this.valueTitle = val.children[i].children[j].children[k][this.props.label]
            //               //         this.valueId = val.children[i].children[j].children[k][this.props.value]
            //               //      }
            //               // }else{
            //               //   this.valueTitle = val.children[i].children[j].children[k][this.props.label]
            //               //   this.valueId = val.children[i].children[j].children[k][this.props.value]
            //               // }
            //               return
            //           }
            //       }else{
            //           this.idArr.push(val);
            //           this.valueTitle += val.children[i][this.props.label]+ "/"
            //           this.valueId = val.children[i][this.props.value]
            //           this.$emit('getValue',this.valueId)
            //           this.defaultExpandedKey = []
            //       }
            //     }
            // }else{
            //   this.idArr.push(val);
            //   this.valueTitle += val[this.props.label]+ "/"
            //   this.valueId = val[this.props.value]
            //   this.$emit('getValue',this.valueId)
            //   this.defaultExpandedKey = []
            //   console.log(this.idArr)
            // }
        },
        // 初始化值
        initHandle() {
            this.$axios.post("/app/mock/32/taskGroup/info/taskGroup/info", {
                    taskId: 1
                })
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                });

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
            console.log(this.valueTitle);
            if (this.valueTitle.indexOf(node.name) == "-1") {
                this.valueTitle += node[this.props.label] + "/";
                this.valueId = node[this.props.value];
                this.$emit("getValue", this.valueId);
                this.defaultExpandedKey = [];
            } else {
                //删除
                var reg = new RegExp(node.name + "/", "g");
                var newValueTitle = this.valueTitle.replace(reg, "");
                console.log(newValueTitle);
                this.valueTitle = newValueTitle;
            }
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
            this.$refs.selectTree.setCheckedKeys([]);
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
.select_tree {
    width: 1000px;
}
</style>