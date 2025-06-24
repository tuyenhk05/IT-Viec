import Layoutt from "../components/Layout";
import AllJob from "../pages/AllJob/index";
import JobList from "../pages/AllJob/joblist";
import Jobitem from "../pages/AllJob/jobitem";
import SearchJob from "../pages/SearchJob";
import Home from "../pages/Home";
import Team from "../pages/team/index";
import Contact from "../pages/contact/index";
import CompanyHome from "../pages/Company/CompanyHome";
import Company from "../pages/Company/index";
import CompanyItem from "../pages/Company/CompanyItem";
import Comunity from "../pages/Comunity/index";
import ComunityAll from "../pages/Comunity/ComunityAll";
import ComunityItem from "../pages/Comunity/ComunityItem";
import Login from "../pages/Login/index";
import Register from "../pages/Register/index";
import CVUpload from "../pages/UpLoadCv/index";
import Manager from "../pages/Manager/index";
import User from "../pages/Manager/User";
//import Home from "../pages/Home";
import Profile from '../pages/Manager/poforlio';
import Recruitment from '../pages/Manager/Recruitment/Recruitment';
import EditRecrui from "../pages/Manager/Recruitment/Edit_Recruit";
import Recruit from "../pages/Manager/Recruitment/index";
import Add_Recruitment from "../pages/Manager/Recruitment/Add_Recruitment";
import Aplicant from "../pages/Manager/Aplicant/index";
import Home_aplicant from "../pages/Manager/Aplicant/Home_aplicant";
import AplicantDetail from "../pages/Manager/Aplicant/AplicantDetail";
//import Login from "../pages/Login";
//import Sigup from "../pages/Sigup";

export const routes = [
    {
        path: "/",
        element: <Layoutt />,
        children: [
            {
                path: "joblist",
                element: <JobList />,
                children: [
                    {
                        index: true,
                        element: <AllJob />
                    },
                    {
                        path: ":jobId",
                        element: <Jobitem />
                    }
                ]

            },
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "search",
                element: < SearchJob />
            }, {
                path: "team",
                element: <Team />
            },
            {
                path: "contact",
                element: <Contact />
            },
            {
                path: "company",
                element: <CompanyHome />,
                children: [
                    {
                        index: true,
                        element: <Company />
                    },
                    {
                        path: ":companyId",
                        element: <CompanyItem />
                    }
                ]


            },
            {
                path: "comunity",
                element: <Comunity />,
                children: [
                    {
                        index: true,
                        element: <ComunityAll />
                    },
                    {
                        path: ":comunityId",
                        element: <ComunityItem />
                    }
                ]


            },
            {
                path: "uploadcv",
                element: <CVUpload />,
                children: [
                    {
                        index: true,
                        element: <CVUpload />
                    },
                    {
                        path: ":jobId",
                        element: <CVUpload />
                    }
                ]
            },
            {
                path: "manager",
                element: <Manager />,
                children: [
                    {
                        index: true,
                        element:<User/>
                    },
                    {
                       
                    }
                    // Add more manager routes here if needed
                ]
            },
            {
                path: "profile",
                element: <Profile />
            },
            {
                path: "recruitment",
                element: <Recruit />,
                children: [
                    {
                        index: true,
                        element: <Recruitment />
                    },
                    {
                        path: ":recruitmentId",
                        element: <EditRecrui />
                    },
                    {
                        path: "add",
                        element: <Add_Recruitment />
                    }
                    // Add more recruitment routes here if needed
                ]
            },
            {
                path: "aplicant",
                element: <Aplicant />,
                children: [
                    {
                        index: true,
                        element: <Home_aplicant />
                    },
                    {
                        path: ":aplicantId",
                        element: <AplicantDetail />

                    }
                ]
            }
                    
            //    path: "login",
            //    element: <Login />,


            //}, {
            //    path: "register",
            //    element: <Sigup />,
            //}


        ]
    },


    {
        path: "*",
        element: <h1>404 not found</h1>
    },
    {
        path: "login",
        element: <Login />,
    },
    {
        path: "register",
        element: <Register />,
    }
]