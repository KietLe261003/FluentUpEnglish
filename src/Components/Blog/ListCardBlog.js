import React, { useEffect, useState } from "react";
import CardBlog from "./CardBlog";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, onSnapshot, query, where} from "firebase/firestore";
import { db } from "../../firebase";

function ListCardBlog() {
    const navigate = useNavigate();
    const opModal = () => {
        navigate("/Blog/CreateBlog");
    }
    const [blogs,setBlogs]=useState([]);
    
    const [counter, setCounter] = useState(1);
    useEffect(() => {
        const interval = setInterval(() => {
            setCounter(item => item >= 2 ? 0 : item + 1);
        }, 3000);
        //const q = query(collection(db, "blogs"), where("title", "!=", ""));
        // const unsubscribe = onSnapshot(collection(db,"blogs"), (querySnapshot) => {
        //     const bl = [];
        //     querySnapshot.forEach( async (it) => {
        //         bl.push(it.data());
        //     });
        //     console.log(bl);
        //     bl.sort((a,b)=>b.datePost - a.datePost);
        //     setBlogs(bl);
        // });
        const unSub = async () =>{
            const c=[];
            const q= query(collection(db,"blogs"));
            const data= await getDocs(q);
            data.forEach((index)=>{
                c.push(index.data());
            })
            console.log(c);
            setBlogs(c);
        }
        return ()=>{
            unSub();
            //unsubscribe();
            clearInterval(interval);
        }
    }, [counter])
    return (
        <div>
            <button onClick={opModal} class="rounded-xl float-right border-2 border-blue-500 px-3 py-3 text-base mb-3 font-medium text-blue-500 transition duration-200 hover:bg-red-600/5 active:bg-red-700/5">
                Thêm bài viết
            </button>
            {
                blogs.length>0 && 
                blogs.map((item,index)=>(
                    <CardBlog key={index}
                    id={item.id}
                    hastag={item.hastag}
                    datePost={item.datePost}
                        title={item.title} auth={item.auth} content={item.content} like={item.like} coment={item.comment.length} />
                ))
            }

        </div>
    );
}

export default ListCardBlog;
