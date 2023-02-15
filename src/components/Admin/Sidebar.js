import{
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import {FaTachometerAlt, FaRegLaughWink, FaProductHunt } from 'react-icons/fa'
import {AiFillCopyrightCircle, AiOutlineUser, AiOutlineFileUnknown} from 'react-icons/ai'
import abc from '../../assets/abc.jpg'
import { Link } from "react-router-dom";

const Sidebar = ({collapsed, toggled, handleToggleSidebar}) => {
    return(
        <>
            <ProSidebar
                image={abc}
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                onToggle={handleToggleSidebar}
            >
                <SidebarHeader>
                    <div style={
                        {
                            padding: '24px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }
                    }>
                        MY_APP
                    </div>
                </SidebarHeader>
                
                <SidebarContent>
                    <Menu iconShape='circle'>
                        <MenuItem
                        icon={<FaTachometerAlt/>}
                        // suffix={<span className='badge red'>NEW</span>}
                        >
                            Dashboard
                            {/* <Link to= "/admins"/> */}
                            <Link to= "/"/>
                        </MenuItem>
                    </Menu>
                    <Menu iconShape='circle'>
                        <SubMenu
                        // suffix={<span className='badge yellow'>3</span>}
                        icon={<FaRegLaughWink/>}
                        title="Features"
                        >
                            <MenuItem icon={<AiOutlineUser/>}>Quản lý Users <Link to= "/admins/manage-users"/></MenuItem>
                            <MenuItem icon={<FaProductHunt/>}>Quản lý Products  <Link to= "/admins/manage-products"/></MenuItem>
                            <MenuItem icon={<AiOutlineFileUnknown/>}>Something else</MenuItem>
                        </SubMenu>

                    </Menu>
                </SidebarContent>
                <SidebarFooter style={{textAlign: 'center'}}>
                    <div className='sidebar-btn-wrapper'
                    style={{
                        padding:'20px 24px',
                    }}
                    >
                        <a href='https://www.facebook.com/peterkill.tuan/'
                        target="_blank"
                        className='sidebar-btn'
                        rel='noopener noreferrer'
                        
                        >
                            <AiFillCopyrightCircle/>
                            <span style={{whiteSpace: 'nowrap',   textOverflow: 'ellipsis', overflow: 'hidden'}}>
                                tuan184218
                            </span>
                        </a>
                    </div>

                </SidebarFooter>

            </ProSidebar>
        </>
    )
}

export default Sidebar;