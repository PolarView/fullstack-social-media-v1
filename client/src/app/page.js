import Posts from "@/components/Posts";
import CreatePost from "@/components/CreatePost";
import Navbar from "@/components/Navbar/Navbar";
export default function Home() {
  return (
    <main className="flex z-0 flex-col items-center ">
      <Navbar />
      <CreatePost />
      <Posts />
    </main>
  );
}
