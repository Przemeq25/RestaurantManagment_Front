import logo from "./images/logo2.png";
import useMediaQuery from "react-responsive";

export default logo;

export const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 960 })
    return isDesktop ? children : null
}
export const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 960 })
    return isMobile ? children : null
}



