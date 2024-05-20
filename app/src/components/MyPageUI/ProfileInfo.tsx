import React, { useState } from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom'; // Import useHistory from react-router-dom


import profileEdit from '../../images/profileEdit.png';
import test from '../../images/test.png';



// Define types for user data
interface User {
  name: string;
  image: string;
}

// Profile component
const ProfileInfo: React.FC = () => {
  // Manage user state
  const [user, setUser] = useState<User>({
    name: '', // Initially empty
    image: test // You can replace this with the actual path to the user's image
  });

  // Access history object
  const navigate = useNavigate();

  const InfoStyle = styled.div`
    margin-top: 60px;
    position: fixed;
    display: flex;
    flex-direction: row;
    background-color: white;
    z-index: 100;
    height: 90px;
  `;
  const NameStyle = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    margin: 10px;
  `
  const ProfileButton = styled.button`
    background-color: #ECECEC
    color: white;  
    width: 71px;
    height: 18px;
    fontSize: 3px;
    margin:0px;

  `;

  const BottomRectangle = styled.div`
    width: 375px;
    height: 1px;
    background-color: #ECECEC;
    margin-top: 150px; /* Push the rectangle to the bottom */
`;

const Hold = styled.div`
    position: fixed;
    display: flex;
    flex-direction: column;
`;

  // Function to set username when user logs in
  const handleLogin = () => {
    // Simulating user login and setting username
    setUser({
      name: '하롱다링', // Placeholder until login is implemented
      image: test
    });
  };

  // Function to navigate to profile page
  const goToProfilePage = () => {
    navigate('/profiles'); // Navigate to '/profile' route
  };


  return (
    <Hold>
        <InfoStyle>
        {/* User information */}
        <img src = {user.image}
                alt="User"
                style={{width:'70px', height:'70px', borderRadius:'100%', marginRight:'40px'}}/>
            <NameStyle>
                <div style={{fontWeight:'bold', fontSize:'15px', color:'#333', marginBottom:'10px'}}>{user.name}</div>    
            </NameStyle>
        {/* Button to navigate to profile page */}
        <img src = {profileEdit} 
            alt = "프로필 편집"
            style={{height:'17px', marginLeft:'80px', marginTop:'60px'}}
            onClick={goToProfilePage}/>
      {/* Button to simulate user login */}
      <ProfileButton onClick={handleLogin}>Login</ProfileButton>
    </InfoStyle>
    <BottomRectangle/>

</Hold>
    
  );
}

export default ProfileInfo;
