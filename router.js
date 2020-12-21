// Global()
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";

// Users

const USERS = "/users";
const USER_DETAIL = "/:id";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";

//Award
const AWARD = "/awards";


//Board
const BOARD = "/board";
const NOTICE_BOARD = "/notice";
const FREE_BOARD = "/free";
const QUESTION_BOARD = "/question";
const PICTURE_BOARD = "/picture";

//Competition
const COMPETITION = "/competition";

//exhibition
const EXHIBITION = "/exhibition";

//maze
const MAZE = "/maze";
const INTRODUCE_MAZE = "/introduce";
const RULE_MAZE = "/rule";

//Member

const MEMBER = "/member";
const LIST_MEMBER = "/memberlist";
const STUDY_MEMBER = "/memberstudy";
const DOWNLOAD_MEMBER = "/memberdownload";
const BOARD_MEMBER = "/memberboard";

// Videos

const VIDEOS = "/videos";
const UPLOAD = "/upload";
const VIDEO_DETAIL = "/:id";
const EDIT_VIDEO = "/:id/edit";
const DELETE_VIDEO = "/:id/delete";

const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,

  
  users: USERS,
  userDetail: id => {
    if (id) {
      return `/users/${id}`;
    } else {
      return USER_DETAIL;
    }
  },
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,

  awards: AWARD,

  board: BOARD,
  noticeBoard: NOTICE_BOARD,
  freeBoard: FREE_BOARD,
  questionBoard: QUESTION_BOARD,
  pictureBoard: PICTURE_BOARD,
  
  competition: COMPETITION,
  exhibition: EXHIBITION,

  maze: MAZE,
  introduceMaze: INTRODUCE_MAZE,
  ruleMaze: RULE_MAZE,

  member: MEMBER,
  listMember: LIST_MEMBER,
  studyMember: STUDY_MEMBER,
  downloadMember: DOWNLOAD_MEMBER,
  boardMember: BOARD_MEMBER,    

  videos: VIDEOS,
  upload: UPLOAD,
  videoDetail: VIDEO_DETAIL,
  editVideo: EDIT_VIDEO,
  deleteVideo: DELETE_VIDEO
};

export default routes;