import { Link, Outlet, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { auth } from "../firebase";

const Wrapper = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 4fr;
  height: 100%;
  padding: 0;
  width: 100%;
  max-width: 860px;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  position: absolute;
  left: 0px;
  
  width: 200px;
  height: 100%;
  padding-left: 30px;
  background-color: #111;
  box-shadow: 10px 10px 20px 0px rgba(0, 0, 0, 0.5);

  &:first-child {
    padding-top: 100px;
  }
  
`;


const MenuLink = styled(Link)`
  color: white;
  text-decoration: none;
  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
  }
`;


const MenuItem = styled.div`
  cursor: pointer;
  height: 50px;
  border-radius: 50%;
  list-style: none;
  text-decoration: none;
  &:hover {
    font-weight: bolder;
  }
`;

export default function Layout() {
  const navigate = useNavigate();
  const onLogOut = async () => {
    const ok = confirm("Are you sure you want to log out?");
    if (ok) {
      await auth.signOut();
      navigate("/login");
    }
  };
  return (
    <Wrapper>
      <Menu>
        <MenuLink to="/">
          <MenuItem>
            HOME
          </MenuItem>
        </MenuLink>
        <MenuLink to="/profile">
          <MenuItem>
            PROFILE
          </MenuItem>
        </MenuLink >
        <MenuItem onClick={onLogOut} className="log-out">
          LOG OUT
        </MenuItem>
      </Menu>
      <Outlet />
    </Wrapper>
  );
}