import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import img1 from "../../Asset/img1.jpg";
import logo from "../../Asset/logo-bk.png";
import { MdFeaturedPlayList } from "react-icons/md";
import { FcConferenceCall } from "react-icons/fc";
import { FcBusiness } from "react-icons/fc";
import { FcQuestions } from "react-icons/fc";
import { FcCurrencyExchange } from "react-icons/fc";
import "./Sidebar.scss"
import { NavLink } from 'react-router-dom';
const SideBar = (props) => {
    const { state } = props;
    return (
        <Sidebar collapsed={state} image={img1} width='300px' collapsedWidth='80px'>
            <Menu>
                <MenuItem className='text-center'
                    component={<NavLink to="/"></NavLink>}>
                    <img src={logo} alt="Logo" className="logo-image" />
                    DUY BKU </MenuItem>
                <MenuItem icon={<FcCurrencyExchange size={24} />} >  Dashboard </MenuItem>
                <SubMenu label="Tính Năng" icon={<MdFeaturedPlayList size={24} />} >
                    <MenuItem component={<NavLink to="manager-user"></NavLink>} icon={<FcConferenceCall size={24} />}>Quản Lí User</MenuItem>
                    <MenuItem component={<NavLink to="manager-quiz"></NavLink>} icon={<FcBusiness size={24} />}> Quản Lí Bài Quiz </MenuItem>
                    <MenuItem component={<NavLink to="manager-question"></NavLink>} icon={<FcQuestions size={24} />}> Quản Lí Câu Hỏi </MenuItem>
                </SubMenu>

            </Menu>
        </Sidebar>
    )
};
export default SideBar