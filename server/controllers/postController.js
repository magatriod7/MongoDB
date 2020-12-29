import express from "express";

// Model
import Post from "../models/post";
//몽구스 포스트 스키마 import
/* eslint-disable linebreak-style */
//import '../db';
import routes from '../routes';
//import Video from "../models/Video";

export const home = async(req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 });//위아래 순서 바꿈
    res.render("home", { pageTitle: 'Home', videos });
  } catch (error) {
    console.log(error);
    res.render("home",{ pageTitle: 'Home',videos: [] });
  }
};
//async == 기다림 try 와 catcj를 사용해서 에러를 잡을 수 있다.

export const search = async (req, res) => {
  const {
    query: { term: searchingBy }
  } = req;
  let videos = [];
  try {
    videos = await Video.find({ title: { $regex: searchingBy, $options: "i" } });
  } catch (error) {
    console.log(error);
  }
  res.render("search", { pageTitle: "Search", searchingBy, videos });
};

export const getVideoUpload = (req, res) => res.render("videoUpload", { pageTitle: "videoUpload" });

export const postVideoUpload = async(req, res) =>{
  const {
    body: { title, description },
    file: { path }
  } = req;
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description
  });
  console.log(newVideo);
  // To Do: Upload and save video
  // res.render("videoUpload", { pageTitle: "videoUpload" });
  res.redirect(routes.videoDetail(newVideo.id));
};
// multer을 통한 파일 업로드 

export const videoDetail = async(req, res) => {
  const {
    params:{ id }
  } = req;
  try {
    const video = await Video.findById(id);
    //몽구스 기능 model.findById
    //console.log(video);
    res.render("videoDetail", { pageTitle: video.title, video });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
    //해당 비디오가 없을 경우 다시 홈으로 보내줌
  }
};

export const getEditVideo = async (req, res) =>{
  const {
    params:{ id }
  } = req;
  try {
    const video = await Video.findById(id);
    res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const postEditVideo = async(req, res) =>{
  const {
    params: { id },
    body: { title, description }
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id },{ title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const deleteVideo = async(req, res) => {
  const {
    params: { id }
  } = req;
  try {
    await Video.findOneAndRemove({ _id: id });
  } catch (error){}
  res.redirect(routes.home);
};