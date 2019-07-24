import React from "react";
import Loadable from "react-loadable";

import DefaultLayout from "./containers/DefaultLayout";


//phr
import MomDiary from "./views/PersonalHealthRecord/MomDiary/MomDiary";
import AddmomDiary from "./views/PersonalHealthRecord/MomDiary/AddmomDiary";
import EditMomDiary from './views/PersonalHealthRecord/MomDiary/EditmomDiary';
import Diary from './views/PersonalHealthRecord/MomDiary/Diary'
import ViewpregnancyRecord from './views/PersonalHealthRecord/PregnancyRecord/ViewpregnancyRecord';
import AddpregnancyRecord from './views/PersonalHealthRecord/PregnancyRecord/AddpregnancyRecord';
import ViewServiceBooking from './views/MyBookings/ServiceBookings/ViewServicebooking'
import AddPregnancyVitals from './views/PersonalHealthRecord/PregnancyVitals/PregnancyVitalsForm/AddPregnancyvitals';
import AddMedicalrecord from "./views/PersonalHealthRecord/GeneralMedicalRecord/AddMedicalrecord";
import ViewMedicalrecord from './views/PersonalHealthRecord/GeneralMedicalRecord/ViewMedicalrecord';
import PhrTab from './views/PersonalHealthRecord/PhrTab';
import AddChildrecord from './views/PersonalHealthRecord/ChildRecord/AddChildrecord';
import Profile from './views/Account/Profile';
import AccountSetting from './views/Account/AccountSetting'
import ViewSharemyrecord from './views/PersonalHealthRecord/ShareMyRecord/ViewSharemyrecord';
import AddnewDocument from './views/PersonalHealthRecord/PregnancyRecord/AddnewDocument';
import ViewChildrecord  from './views/PersonalHealthRecord/ChildRecord/ViewChildrecord';
import PostTableView from './views/Blog/Post/PostTableView'
import AddBlogPost from './views/Blog/Post/AddBlogPost'
import EditBlogPost from './views/Blog/Post/EditBlogpost'
import PostTab from './views/Blog/Post/PostTab'
import ViewBlog from './views/Blog/Post/ViewBlog'
import Ovulation from './views/HealthTools/Ovulation Calculator/Ovulation'
import KickCounter from './views/HealthTools/KickCounter/KickCounter'
import Babygrowth from './views/HealthTools/BabyGrowthCalculator/Babygrowth'
import ViewPregnancyVitalsThyroid from "./views/PersonalHealthRecord/PregnancyVitals/PregnancyVitalsView/ViewPregnancyVitals"
import EditThyroidVital from "./views/PersonalHealthRecord/PregnancyVitals/PregnancyVitalsForm/EditThyroidVital"
import EditBloodSugarVital from "./views/PersonalHealthRecord/PregnancyVitals/PregnancyVitalsForm/EditBloodSugarVital"
import EditBloodPressureVital from "./views/PersonalHealthRecord/PregnancyVitals/PregnancyVitalsForm/EditBloodPressureVital"
import AboutMe from './views/Blog/Post/AboutMe'
// import ViewSharemyrecord  from './views/PersonalHealthRecord/ShareMyRecord/ViewSharemyrecord';


function Loading() {
  return <div>Loading...</div>;
}

const Dashboard = Loadable({
  loader: () => import("./views/Dashboard"),
  loading: Loading
});

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: "/", name: "Home", component: DefaultLayout, exact: true },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  //phr
  {path:'/personalhealthrecord/:tabId?', name:'Personal Health Record', component:PhrTab },
  //MomDiary
  { path: "/momdiary", name: "Mom's Diary", component: MomDiary },
  { path: "/addmomdiary", name: "Add New Diary", component: AddmomDiary },
  {path:'/editmomdiary/:id', name:"Edit Diary", component:EditMomDiary},
  {path:'/diary/:id', name:"Dairy" , component : Diary},
  //pregnancyvitals
  {path:'/pregnancyvitals', name:'Pregnancy Vitals', component:ViewPregnancyVitalsThyroid},
  {path:'/addpregnancyVitals', name:' Add Pregnancy Vitals', component:AddPregnancyVitals},
  {path:'/addgeneralmedicalrecord', name:'Add Medical Record', component:AddMedicalrecord},
  {path:'/generalmedicalrecord', name:'View Medical Record', component:ViewMedicalrecord},
  {path:'/childrecord', name:'Child Record', component:ViewChildrecord},
  {path:'/addchildrecord', name:'Add Child Record', component:AddChildrecord},
  {path:'/accountsetting', name:'Account Setting', component:AccountSetting},
  {path:'/pregnancyrecord', name:"Pregnancy  Record",  component:ViewpregnancyRecord},
  {path:'/addpregnancyrecord', name:'Add New Pregnancy Record',  component:AddpregnancyRecord},
  {path:'/profile', name:'My Profile', component:Profile},
  {path:'/servicebooking', name:' Service Bookings', component:ViewServiceBooking},
  {path:'/sharemyrecord', name:'Share My Record', component:ViewSharemyrecord},
  {path:'/addnewdocument', name:'Add new Document', component:AddnewDocument},
  //Blog PostTableView
  {path:'/post', name:'PostTableView', component:PostTableView},
  {path:'/addblogpost', name:'Add New  PostTableView', component:AddBlogPost},
  {path:'/editblogpost/:id', name:'Edit PostTableView', component:EditBlogPost},
  {path:'/blog/:id', name:"Blog", component:PostTab},
  {path:'/viewblog', name:"View Blog", component:ViewBlog},
  {path:'/aboutme', name:"About Me" , component:AboutMe},
  {path:'/editblog/:id', name:"Edit Blog", component:EditBlogPost},
  //Health Tools
  {path:'/ovulationcalculator', name:'Ovulation Calculator', component:Ovulation},
  {path :'/kickcounter', name:'Kick Counter', component:KickCounter},
  {path:'/babygrowthcalculator', name:'Baby Grwoth Calculator', component:Babygrowth},

  {path: '/edit-thyroid-vital/:id', name: 'Edit Thyroid Pregnancy Vital', component: EditThyroidVital},
  {path: '/edit-blood-sugar-vital/:id', name: 'Edit Thyroid Sugar Vital', component: EditBloodSugarVital},
  {path: '/edit-blood-pressure-vital/:id', name: 'Edit Blood Pressure Pregnancy Vital', component: EditBloodPressureVital},
];

export default routes;
