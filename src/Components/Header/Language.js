import NavDropdown from 'react-bootstrap/NavDropdown';
const Language = () => {

    return (
        <>
            <NavDropdown title="Việt Nam" id="basic-nav-dropdown">
                <NavDropdown.Item >Việt Nam</NavDropdown.Item>
                <NavDropdown.Item >EngLish</NavDropdown.Item>
            </NavDropdown>
        </>
    )
};

export default Language;