import {
  collection,
  addDoc,
  updateDoc,
  getDocs,
  getDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/config/firebase-config";

export const getPostList = async () => {
  try {
    const postList: Post[] = [];
    const querySnapshot = await getDocs(collection(db, "post"));
    querySnapshot.forEach((doc) => {
      const docData = doc.data();
      const post = {
        id: doc.id,
        title: docData.title,
        githubURL: docData.githubURL,
        description: docData.description,
        stackList: docData.stackList,
        treeList: JSON.parse(docData.treeList),
        writer: docData.writer,
      };
      postList.push(post);
    });
    return postList;
  } catch (e) {
    console.error("fail to get post list : ", e);
  }
};

export const getPostDetail = async (postId: string) => {
  try {
    const docData = await getDoc(doc(db, "post", postId));

    const { githubURL, stackList, description, treeList, writer, title } =
      docData.data() as Post;
    const postDetail = {
      id: docData.id,
      title,
      githubURL,
      description,
      stackList,
      treeList: JSON.parse(treeList as unknown as string),
      writer: writer,
    };
    return postDetail as unknown as Post;
  } catch (e) {
    console.error("fail to get post list : ", e);
  }
};

export const createPost = async (newPost: CreatePost) => {
  try {
    const treeListStr = JSON.stringify(newPost.treeList);
    const changeFormFormat = { ...newPost, treeList: treeListStr };

    const docRef = await addDoc(collection(db, "post"), changeFormFormat);
    return docRef.id;
  } catch (e) {
    console.error("fail to create post : ", e);
  }
};

export const editPost = async (editedPost: Post) => {
  try {
    const treeListStr = JSON.stringify(editedPost.treeList);
    const changeFormFormat = { ...editedPost, treeList: treeListStr };

    await updateDoc(doc(db, "post", editedPost.id), changeFormFormat);
  } catch (e) {
    console.error("fail to update post : ", e);
  }
};

export const deletePost = async (postId: string) => {
  try {
    await deleteDoc(doc(db, "post", postId));
  } catch (e) {
    console.error("fail to create post : ", e);
  }
};
