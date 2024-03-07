import BottomBar from "@/components/BottomBar";
import LeftSideBar from "@/components/LeftSideBar";
import Navbar from "@/components/Navbar";
import PostFeed from "@/components/PostFeed";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <BottomBar/>
      <LeftSideBar/>
      <PostFeed/>
    </div>
  );
}
