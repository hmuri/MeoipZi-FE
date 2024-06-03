import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axios';

import profileEdit from '../../images/profileEdit.png';
import userimg from '../../images/user.png';

interface User {
  name: string;
  image: string;
  height: number | null;
  weight: number | null;
  heightSecret: boolean;
  weightSecret: boolean;
}

const ProfileInfo: React.FC = () => {
  const [user, setUser] = useState<User>({
    name: '',
    image: userimg,
    height: null,
    weight: null,
    heightSecret: true,
    weightSecret: true,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(`${process.env.REACT_APP_API_BASE_URL}/profiles/info`);
        const userData = response.data;
        const { nickname, imgUrl, height, weight, heightSecret, weightSecret } = userData;
        setUser({
          name: nickname || '',
          image: imgUrl || userimg,
          height: heightSecret ? null : height,
          weight: weightSecret ? null : weight,
          heightSecret,
          weightSecret,
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

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
  `;

  const ProfileButton = styled.button`
    background-color: #ECECEC;
    color: white;  
    width: 71px;
    height: 18px;
    font-size: 3px;
    margin: 0px;
  `;

  const BottomRectangle = styled.div`
    width: 375px;
    height: 1px;
    background-color: #ECECEC;
    margin-top: 150px;
  `;

  const Hold = styled.div`
    position: fixed;
    display: flex;
    flex-direction: column;
  `;

  const Back = styled.div`
    margin-top: 0px;
    background-color: white;
    height: 60px;
  `;

  const goToProfilePage = () => {
    navigate('/profile');
  };

  const UserInfoContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 11px;
    color: #777;
    width: 13vh;
  `;

  return (
    <Hold>
      <InfoStyle>
        <img src={user.image}
             alt="User"
             style={{ width: '70px', height: '70px', borderRadius: '100%', marginRight: '30px' }} />
        <NameStyle>
          <div style={{ fontWeight: 'bold', fontSize: '15px', color: '#333', marginBottom: '10px' }}>{user.name}</div>
          <UserInfoContainer>
            {!user.heightSecret && user.height !== null && (
              <div>{user.height} cm /</div>
            )}
            {!user.weightSecret && user.weight !== null && (
              <div>{user.weight} kg</div>
            )}
          </UserInfoContainer>
        </NameStyle>
        <img src={profileEdit}
             alt="프로필 편집"
             style={{ height: '17px', marginLeft: '80px', marginTop: '60px' }}
             onClick={goToProfilePage} />
        <ProfileButton> </ProfileButton>
      </InfoStyle>
      <BottomRectangle />
      <Back />
    </Hold>
  );
};

export default ProfileInfo;
