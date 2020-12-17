import mongoose from "mongoose";

// Create Schema
const CategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    default: "미분류",
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
  ],
});

const Category = mongoose.model("category", CategorySchema);
//카테고리라는 몽구스 모델을 외부로 export함
export default Category;