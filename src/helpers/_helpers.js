import logo from "../images/logo2.png";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export default logo;

export const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery('(min-width:960px)')
    return isDesktop ? children : null
}
export const Mobile = ({ children }) => {
    const isMobile = useMediaQuery('(max-width:960px)')
    return isMobile ? children : null
}



