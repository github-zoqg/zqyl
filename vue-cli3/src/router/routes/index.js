import Router from "vue-router";
import Vue from "vue"
import Component from "../moudle/index"

Vue.use(Router);

export default new Router({
    mode:'history',
    routes:[
        {path:"/",name:"ELE", component:Component.ele},
        {path:"/amap/amap.htm",name:"GDamap", component:Component.GDamap},
        {path:"/select_tree/index.htm",name:"selectTree", component:Component.selectTree},
        
        {path:"/header.htm",name:"header", component:Component.header}
    ]
})

