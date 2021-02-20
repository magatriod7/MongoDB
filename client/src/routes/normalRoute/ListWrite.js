import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Col,
    Progress,
} from "reactstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import { editorConfiguration } from "../../components/editor/EditorConfig";
import Myinit from "../../components/editor/UploadAdapter";
//import { set } from "mongoose";
import { POST_UPLOADING_REQUEST } from "../../redux/types";
import dotenv from "dotenv";
dotenv.config();

const ListWrite = () => {

    let { categoryName } = useParams();
    const { isAuthenticated, user } = useSelector((state) => state.auth);  ////store에서 state를 가져온다. 즉, authenticated, user, userRole를 받아온다.
    const [form, setValues] = useState({ title: "", contents: "", fileUrl: "", creatorName: user.name });// inputstate를 저장할 useState
    const dispatch = useDispatch();//reducer dispatch
    const onSubmit = async (e) => {
        await e.preventDefault();
        const { title, contents, fileUrl, creatorName } = form;
        const category = categoryName
        const token = localStorage.getItem("token");
        const body = { title, contents, fileUrl, category, token, creatorName };
        console.log(body, "바디확인용")
        dispatch({
            type: POST_UPLOADING_REQUEST,
            payload: body,
        });
    };
    const onChange = (e) => { //리액트에서 input을 사용하기 위해서는 이와 같은 과정이 필요하다
        setValues({
            ...form,
            [e.target.name]: e.target.value,//각 인풋의 name을 value값으로 저장함
        });
    };

    const getDataFromCKEditor = (event, editor) => {//맨 처음 올린 사진만 보일 수 있도록 하는 세팅
        const data = editor.getData();//getdata(ckeditor 함수)를 통해 에디터에 올려진 데이터를 가져올 수 있다.
        console.log(`${data} 데이터 가져옴`);

        if (data && data.match("<img src=")) {//데이터가 존재하고 img src로 시작하는 것이 있다고 하면
            const whereImg_start = data.indexOf("<img src=");//어디부터 시작하는 지를 살펴보고
            console.log(`${whereImg_start} 시작값 확인`);
            let whereImg_end = "";
            let ext_name_find = "";
            let result_Img_Url = "";

            const ext_name = ["jpeg", "png", "jpg", "gif"];//확장자 이름을 정하고

            for (let i = 0; i < ext_name.length; i++) {
                if (data.match(ext_name[i])) {//확장자를 살펴보고
                    console.log(data.indexOf(`${ext_name[i]}`), "확장자 위치 살펴봄");
                    ext_name_find = ext_name[i];//맞는 확장자를 정해준다
                    whereImg_end = data.indexOf(`${ext_name[i]}`);
                }
            }
            console.log(`확장자 확인 ${ext_name_find}`);
            console.log(whereImg_end, "whereImg_end", "확장자 위치");

            if (ext_name_find === "jpeg") {
                result_Img_Url = data.substring(whereImg_start + 10, whereImg_end + 4);
            } else {
                result_Img_Url = data.substring(whereImg_start + 10, whereImg_end + 3);
            }
            //확장자를 제외한 값을 잘라준다.

            console.log(result_Img_Url, "이미지 경로");
            setValues({
                ...form,
                fileUrl: result_Img_Url,
                contents: data,
            });//CKeditor의 값 그대로 저장
        } else {
            setValues({
                ...form,
                fileUrl: process.env.REACT_APP_BASIC_IMAGE_URL,
                contents: data,
            });
        }
    };

    console.log(categoryName, "카테고리 네임 확인용")

    return (
        <div>
            {isAuthenticated ? (
                <Form onSubmit={onSubmit}>
                    <FormGroup className="mb-3">
                        <Label for="title">Title</Label>
                        <Input
                            type="text"
                            name="title"
                            id="title"
                            className="form-control"
                            onChange={onChange}
                        />
                    </FormGroup>
                    {/* CKeditor */}
                    <FormGroup className="mb-3">
                        <Label for="content">Content</Label>
                        <CKEditor
                            editor={ClassicEditor}
                            config={editorConfiguration}
                            onReady={Myinit}
                            onBlur={getDataFromCKEditor}
                        />
                        <Button
                            color="success"
                            block
                            className="mt-3 col-md-2 offset-md-10 mb-3"
                        >
                            제출하기
                        </Button>
                    </FormGroup>
                </Form>
            ) : (
                    <Col width={50} className="p-5 m-5">
                        <Progress animated color="info" value={100} />
                    </Col>
                )}
        </div>
    );
};

export default ListWrite;