import { NavLink } from 'react-router-dom';
import'./Footer.css'
function Footer()
{
    return(
        <footer>
            <div className="sections">
                <div>
                    <img src="/logo.svg" alt=""/>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                </div>
                <div>
                    <h2>company</h2>
                    <ul>
                        <li>
                            <NavLink to={'/'}>home</NavLink>
                        </li>
                        <li>
                            <NavLink to={'/about'}>about us</NavLink>
                        </li>
                        <li>
                            <NavLink to={'/contact'}>contact</NavLink>
                        </li>
                        
                    </ul>
                </div>
                <div>
                    <h2>get in touch </h2>
                    <p>+0-000-000-000</p>
                    <p>greatstackdev@gmail.com</p>
                </div>
            </div>
        </footer>
    )
}
export default Footer;