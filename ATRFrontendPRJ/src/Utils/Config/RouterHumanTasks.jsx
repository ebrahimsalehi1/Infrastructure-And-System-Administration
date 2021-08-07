import {SUB_SYSTEM_CONTEXT} from "./constants";
import Setting from "../../Components/Basic/Setting";
import Process1HT1 from "../../Components/Process/Process1/HT1";
import Role from '../../Components/Basic/RoleManagement';
import RoleManagement from '../../Components/Basic/RoleManagement/index';
import ApplicationManagement from '../../Components/Basic/Application/index';
import Zone from '../../Components/Basic/Zone';
import MenuManagement from '../../Components/Basic/MenuManagement';

const RouterHumanTasks = [
    //********************************** basic routes; begin ********************************
    {
        id: 0, //آیدی فرم پایه کمتر از 100
        title: "تنظیمات",
        name: "تنظیمات",
        path: SUB_SYSTEM_CONTEXT + "/basic/Setting",
        component: Setting
    },
    {
        id: 1,
        title: "فرم مدیریت حوزه های کسب و کار",
        name: "فرم مدیریت حوزه های کسب و کار",
        path: SUB_SYSTEM_CONTEXT + "/basic/Zone",
        component: Zone
    },
    {
        id: 2,
        title: "مدیریت زیر سیستم ها",
        name: "مدیریت زیر سیستم ها",
        path: SUB_SYSTEM_CONTEXT + "/basic/ApplicationManagement",
        component: ApplicationManagement
    },
    {
        id: 3,
        title: "فرم نقش",
        name: "فرم نقش",
        path: SUB_SYSTEM_CONTEXT + "/basic/Application",
        component: Role
    },
    {
        id: 4,
        title: "فرم مدیریت انتساب نقش",
        name: "فرم مدیریت انتساب نقش",
        path: SUB_SYSTEM_CONTEXT + "/basic/RoleManagement",
        component: RoleManagement
    },
    {
        id: 5,
        title: "فرم مدیریت منوها",
        name: "فرم مدیریت منوها",
        path: SUB_SYSTEM_CONTEXT + "/basic/MenuManagement",
        component: MenuManagement
    },
    //*********************************** basic routes; end *********************************
    //******************************** humanTask routes; begin ******************************
    // {
    //     id: 100, //آیدی فرم فرایندی بین 100 و 1000
    //     title: "Human Task 1 عنوان فارسی",
    //     name: "Human Task 1 عنوان فارسی",
    //     path: SUB_SYSTEM_CONTEXT + "/pages/processName/humanTaskName",
    //     component: HumanTask1Component
    // },
    {
        id: 100,
        title: "فرم فرایندی 1",
        name: "فرم فرایندی 1",
        path: SUB_SYSTEM_CONTEXT + "/pages/Process1/HT1/:flowId/:taskId",
        component: Process1HT1
    }
    //********************************* humanTask routes; end *******************************
];

export default RouterHumanTasks;