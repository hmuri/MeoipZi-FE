import React from 'react';
import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Layout from './components/Layout';
import MainLayout from '../src/components/mainpageUI/MainLayout'
import BrandCom from './pages/BrandCom';
import WritePost from './pages/WritePost';
import ShopCom from './pages/ShopCom';
import FreeCom from './pages/FreeCom';

import MainPage from './pages/MainPage';
import TimerScroll from './components/mainpageUI/TimerScroll';
import VintageNews from './pages/VintageNews';
import Loading from './pages/Loading';
import Footer from './components/Footer';
import ComLayout from './components/CommunityLayout';
import MyPage from './pages/MyPage_like';
import LikeImage from './components/MyPageUI/LikeImage';
import LikeShort from './components/MyPageUI/LikeShort';
import MyPage_post from './pages/MyPage_post_feed';
import MyPage_like from './pages/MyPage_like';
import PostScrap from './components/MyPageUI/PostScrap';
import PostComment from './components/MyPageUI/PostComment';
import PostFeed from './components/MyPageUI/PostFeed';
import MyPage_post_feed from './pages/MyPage_post_feed';
import MyPage_post_scrap from './pages/MyPage_post_scrap';
import MyPage_post_comment from './pages/MyPage_post_comment';


function App() {
  const currentPath = "/BrandCommunity";
  return (
    <div className="App">
      <header className="App-header">
        {/*
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
  */}

<BrowserRouter>
    
      <Routes>
      <Route index element={<MainPage />} />
          <Route path="/MainPage" element={<MainPage />} />
          <Route path="/" element={<TimerScroll />} />
          <Route path="/banner/:id" element={<VintageNews />} />
          <Route path ="/mypage/likes" element={<MyPage_like/>} />
          <Route path="/BrandCommunity" element={<ComLayout currentPath="/BrandCommunity"><BrandCom/></ComLayout>} />
          <Route path="/ShopCommunity" element={<ComLayout currentPath="/ShopCommunity"><ShopCom/></ComLayout>} />
          <Route path="/FreeCommunity" element={<ComLayout currentPath="/FreeCommunity"><FreeCom/></ComLayout>} />
          <Route path={`${currentPath}/WritePost`} element={<WritePost />} />
          <Route path="/mypage/posts/feeds" element={<MyPage_post_feed />}/>
          <Route path="/mypage/posts/scraps" element={<MyPage_post_scrap />}/>
          <Route path="/mypage/posts/comments" element={<MyPage_post_comment />}/>
      
      </Routes>
    </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
